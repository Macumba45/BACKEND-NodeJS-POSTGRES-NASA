const db = require('../models');
const Rover = db.rover

const getRoverList = async () => {

    try {
        const roverList = await Rover.findAll();
        return roverList

    } catch (error) {
        console.log(error.message);
    }

}

const getRoverId = async (id) => {

    const roverId = await Rover.findByPk(id)
    return roverId
}

const createRover = async ({ img_src, earth_date, nasaId }) => {

    const arrRoverCreation = []
    const roverFind = await Rover.findAll({ where: { nasaId: nasaId } })
    const exists = await Rover.findAll({ where: { nasaId: nasaId } })
    try {
        for (const item of exists) {
            const exists = roverFind.find()
            if (!exists) {
                arrRoverCreation.push(item)
            }
        }
        const createRover = await Rover.create({ img_src, earth_date, nasaId });
        return createRover

    } catch (error) {
        console.log(error)
        console.log("DOCUMENTO YA ESTA CREADO")
    }
}

const updateRover = async (id, data) => {

    const roverUpdate = await Rover.update(data, {
        where: { id }
    });
    return roverUpdate
}

const deleteRover = async (id) => {

    await Rover.destroy({ where: { id } });
    return true
}

module.exports = { getRoverList, getRoverId, createRover, updateRover, deleteRover }