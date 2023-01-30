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


const createApod = async ({ id, title, explanation, url, date }) => {
    const exists = await Apod.findAll({
        where: {
            title,
            explanation,
            url,
            date
        }
    })

    const arrApodCreation = []
    const apodFind = await Apod.findAll()

    try {
        for (const item of exists) {
            const exists = apodFind.findAll({
                where: {
                    id,
                    title,
                    explanation,
                    url,
                    date
                }
            })
            if (!exists) {
                arrApodCreation.push(item)
            }
        }
        const apodPrueba = await Apod.create({ id, title, explanation, url, date });
        return apodPrueba.save()

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