const db = require("../models/index.js");
const Apod = db.apod

const getApodList = async () => {
    try {
        const apodList = await Apod.findAll();
        return apodList

    } catch (error) {
        console.log(error);
    }
}

const getApodId = async (id) => {

    const apodId = await Apod.findByPk(id)
    return apodId
}


const createApod = async ({ title, explanation, url, date }) => {

    try {

        const exists = await Apod.findOne({ where: { title: title } })
        if (!exists) {
            const createApod = await Apod.create({ title, explanation, url, date })
            return createApod
        }

    } catch (error) {
        console.log("DOCUMENTO YA ESTA CREADO")

    }

}

const updateApod = async (id, data) => {

    const apodUpdate = await Apod.update(data, {
        where: { id }
    });
    return apodUpdate
}

const deleteApod = async (id) => {
    await Apod.destroy({
        where: { id }
    })
    return true
}

module.exports = { getApodList, getApodId, createApod, updateApod, deleteApod }