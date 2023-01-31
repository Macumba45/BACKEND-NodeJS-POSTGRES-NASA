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

const getRoverNasaId = async () => {
    const findNasaId = await Rover.findAll()
    return findNasaId
}

// const createRover = async ({ img_src, earth_date, nasaId }) => {

//     const arrRoverCreation = []
//     const exists = await Rover.findAll({ where: { nasaId: nasaId } })
//     console.log(exists)
//     try {
//         for (const item of exists) {
//             const exists = roverFind.find()
//             if (!exists) {
//                 arrRoverCreation.push(item)
//             }
//         }
//         const createRover = await Rover.create({ img_src, earth_date, nasaId });
//         return createRover

//     } catch (error) {
//         console.log(error)
//         console.log("DOCUMENTO YA ESTA CREADO")
//     }
// }

const createRover = async ({ img_src, earth_date, camera, nasaId }) => {
    try {
        const exists = await Rover.findOne({ where: { nasaId: nasaId } });
        if (!exists) {
            const createRover = await Rover.create({ img_src, earth_date, camera, nasaId });
            return createRover;
        }
    } catch (error) {
        console.error(error);
    }
};

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