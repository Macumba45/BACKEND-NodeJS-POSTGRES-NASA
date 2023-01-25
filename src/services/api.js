import fetch from 'node-fetch';
import Apod from '../models/apod.js';
import Rover from '../models/rover.js';

async function apiCallApod() {

    const response = await fetch('https://api.nasa.gov/planetary/apod?start_date=2023-01-01&api_key=' + process.env.API_KEY);
    const apods = await response.json()

    const newList = apods.map(apod => ({ title: apod.title, date: apod.date, explanation: apod.explanation, url: apod.url }));

    const arrApodCreation = []

    const apodFind = await Apod.find()

    for (const item of newList) {
        const exists = apodFind.find((existItem) => existItem.date === item.date)
        if (!exists) {
            arrApodCreation.push(item)
        }
    }

    if (arrApodCreation.length > 0) {
        await Apod.insertMany(arrApodCreation)
    }

    return [...apodFind, ...arrApodCreation]


}

async function apiCallRovers() {

    const response = await fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=' + process.env.API_KEY)
    const rovers = await response.json()
    const roverPhoto = rovers.photos
    const newList = roverPhoto.map(rover => ({ idNasa: rover.id, camera: rover.camera, img_src: rover.img_src, earth_date: rover.earth_date }));

    const arrRoverCreation = []
    const roverFind = await Rover.find()

    for (const item of newList) {
        const exists = roverFind.find((existItem) => existItem.idNasa === item.idNasa);
        if (!exists) {
            arrRoverCreation.push(item)
        }
    }

    if (arrRoverCreation.length > 0) {
        await Rover.insertMany(arrRoverCreation)
    }

    return roverFind.concat(...arrRoverCreation)
    //return [...roverFind, ...arrRoverCreation]
}

export { apiCallApod, apiCallRovers }

