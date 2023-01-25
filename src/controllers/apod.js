import Apod from "../models/apod.js";

const getApodList = async () => {
    try {
        const apodList = await Apod.find();
        return apodList

    } catch (error) {

        console.log(error);

    }

}

const getApodId = async (id) => {

    const apodId = await Apod.findById(id)
    return apodId
}


const createApod = async ({ title, explanation, url, date }) => {
    const exists = await Apod.find({ title, explanation, url, date })

    const arrApodCreation = []
    const apodFind = await Apod.find()

    try {
        for (const item of exists) {
            const exists = apodFind.find({ title, explanation, url, date })
            if (!exists) {
                arrApodCreation.push(item)
            }
        }
        const apodPrueba = new Apod({ title, explanation, url, date });
        return apodPrueba.save()

    } catch (error) {
        console.log("DOCUMENTO YA ESTA CREADO")

    }

}



const updateApod = async (id, data) => {

    const apodUpdate = await getApodId(id);
    await apodUpdate.updateOne(data)
    return data
}

const deleteApod = async ({ id }) => {
    await Apod.findOneAndRemove({ id })
    return true
}

export { getApodList, getApodId, createApod, updateApod, deleteApod }