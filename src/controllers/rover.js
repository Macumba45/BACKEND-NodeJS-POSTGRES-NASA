import Rover from "../models/rover.js";

const getRoverList = async () => {

    try {
        const roverList = await Rover.findAll();
        return roverList

    } catch (error) {
        console.log(error);
    }

}

const getRoverId = async (id) => {

    const roverId = await Rover.findByPk(id)
    return roverId
}


const createRover = async ({ id, img_src, earth_date }) => {
    const exists = await Rover.findAll({
        where:
        {
            id,
            img_src,
            earth_date
        }
    })
    const arrRoverCreation = []
    const roverFind = await Rover.findAll({ where: { id, img_src, earth_date } })

    try {
        for (const item of exists) {
            const exists = roverFind.findAll({ where: { id, } })
            if (!exists) {
                arrRoverCreation.push(item)
            }
        }
        const createRover = await Rover.create({ id, img_src, earth_date });
        console.log(createRover)
        return createRover.save()

    } catch (error) {
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
    console.log(id)

    await Rover.destroy({ where: { id } });
    return true
}

export { getRoverList, getRoverId, createRover, updateRover, deleteRover }