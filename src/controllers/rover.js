import Rover from "../models/rover.js";

const getRoverList = async () => {

    try {
        const roverList = await Rover.find();
        return roverList

    } catch (error) {
        console.log(error);
    }

}

const getRoverId = async (id) => {

    const roverId = await Rover.findById(id)
    return roverId
}


const createRover = async ({ idNasa, camera: name, full_name, img_src, earth_date }) => {
    const exists = await Rover.find({ idNasa, camera: name, full_name, img_src, earth_date })
    const arrRoverCreation = []
    const roverFind = await Rover.find()

    try {
        for (const item of exists) {
            const exists = roverFind.find({ idNasa, camera: name, full_name, img_src, earth_date })
            if (!exists) {
                arrRoverCreation.push(item)
            }
        }
        const createRover = new Rover({ idNasa, camera: name, full_name, img_src, earth_date });
        return createRover.save()

    } catch (error) {
        console.log("DOCUMENTO YA ESTA CREADO")

    }

}


const updateRover = async (id, data) => {

    const roverUpdate = await getApodId(id);
    await roverUpdate.updateOne(data)
    return data
}

const deleteRover = async ({ id }) => {
    await Rover.findOneAndRemove({ id })
    return true
}

export { getRoverList, getRoverId, createRover, updateRover, deleteRover }