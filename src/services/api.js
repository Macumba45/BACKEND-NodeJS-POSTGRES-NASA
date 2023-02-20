// import fetch from "node-fetch";
const fetch = require("node-fetch");
const db = require('../models/index.js');
const Apod = db.apod
const Rover = db.rover


async function apiCallApod() {
    const response = await fetch("https://api.nasa.gov/planetary/apod?start_date=2023-01-01&api_key=" + process.env.API_KEY);
    const data = await response.json();
    const newList = data.map((apod) => ({
        title: apod.title,
        date: apod.date,
        explanation: apod.explanation,
        url: apod.url,
    }));
    // Ordenar el array por fecha en orden ascendente
    newList.sort((a, b) => new Date(b.date) - new Date(a.date));

    const apods = await Apod.findAll();
    const itemsToCreate = [];

    for (let element of newList) {
        const existed = apods.find((rover) => rover.nasaId == element.nasaId);
        if (!existed) {
            itemsToCreate.push(element);
        }
    }

    if (itemsToCreate.length > 0) {
        await Apod.bulkCreate(itemsToCreate);
    }
}

async function apiCallRovers() {
    const response = await fetch("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=2&api_key=" + process.env.API_KEY);
    // "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=1&api_key=" + process.env.API_KEY
    const data = await response.json();
    const newList = data.photos.map((item) => ({
        nasaId: item.id,
        img_src: item.img_src,
        earth_date: item.earth_date,
        camera: {
            name: item.camera.name,
            full_name: item.camera.full_name
        },
    }));
    const rovers = await Rover.findAll();
    const itemsToCreate = [];

    for (let element of newList) {
        const existed = rovers.find((rover) => rover.nasaId == element.nasaId);
        if (!existed) {
            itemsToCreate.push(element);
        }
    }

    if (itemsToCreate.length > 0) {
        await Rover.bulkCreate(itemsToCreate);
    }
}

module.exports = { apiCallApod, apiCallRovers };
