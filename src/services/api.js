// import fetch from "node-fetch";
const fetch = require("node-fetch");
const db = require('../models/index.js');
const Apod = db.apod
const Rover = db.rover


async function apiCallApod() {
    const response = await fetch("https://api.nasa.gov/planetary/apod?start_date=2023-01-01&api_key=" + process.env.API_KEY);
    const apods = await response.json();

    // Crear una lista de objetos con los datos deseados
    const newList = apods.map((apod) => ({
        title: apod.title,
        date: apod.date,
        explanation: apod.explanation,
        url: apod.url,
    }));

    // Ordenar el array por fecha en orden ascendente
    newList.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Crear una lista de objetos para insertar en la base de datos
    const listToInsert = newList.map((element) => ({
        title: element.title,
        date: element.date,
        explanation: element.explanation,
        url: element.url,
    }));

    // Realizar la inserción en la base de datos
    await Apod.bulkCreate(listToInsert, {
        fields: ['title', 'date', 'explanation', 'url'],
        updateOnDuplicate: ['title', 'explanation', 'url'],
    });
}


async function apiCallRovers() {
    const response = await fetch(
        // "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=1&api_key=" + process.env.API_KEY
        "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=2&api_key=" + process.env.API_KEY
    );

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
