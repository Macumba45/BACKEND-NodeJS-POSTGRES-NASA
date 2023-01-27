import fetch from 'node-fetch';
import Apod from '../models/apod.js';
import Rover from '../models/rover.js';

async function apiCallApod() {

    const response = await fetch('https://api.nasa.gov/planetary/apod?start_date=2023-01-01&api_key=' + process.env.API_KEY);
    const apods = await response.json()
    const newList = apods.map(apod => ({ title: apod.title, date: apod.date, explanation: apod.explanation, url: apod.url }));
    for (let i = 0; i < newList.length; i++) {
        let element = newList[i];
        element = {
            title: element.title,
            date: element.date,
            explanation: element.explanation,
            url: element.url
        }

        await Apod.findOrCreate({
            where: { date: element.date }, defaults: {
                title: element.title,
                date: element.date,
                explanation: element.explanation,
                url: element.url
            }
        })

    }

}

async function apiCallRovers() {

    const response = await fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=' + process.env.API_KEY)
    const rovers = await response.json()
    const roverPhoto = rovers.photos
    const newList = roverPhoto.map(rover => ({ id: rover.id, camera: rover.camera, img_src: rover.img_src, earth_date: rover.earth_date }));

    for (let i = 0; i < newList.length; i++) {
        let element = newList[i];
        element = {
            id: element.id,
            camera: element.camera,
            img_src: element.img_src,
            earth_date: element.earth_date,
        }

        await Rover.findOrCreate({
            where: { id: element.id }, defaults: {
                id: element.id,
                camera: element.camera,
                img_src: element.img_src,
                earth_date: element.earth_date,
            }
        })

    }

}

export { apiCallApod, apiCallRovers }

