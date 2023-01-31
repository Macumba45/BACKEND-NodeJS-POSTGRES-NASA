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