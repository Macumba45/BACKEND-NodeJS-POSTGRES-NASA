const db = require('../models');
const User = db.user;
const Rover = db.rover;
const Apod = db.apod;


const getUserId = async (id) => {

    const user = await User.findByPk(id)
    return user
}

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ where: { email: email } })
        return user
    } catch (error) {
        console.log("este es el error " + error.message);
    }
}

const updateUserFavListRover = async ({ userId, roverId }) => {

    let user = await User.findByPk(userId, {
        attributes: { exclude: ['password', 'salt'] },
        include: {
            model: db.rover,
            as: 'roverFavorites'
        }
    });
    // console.log('PREV', user)
    let currentFavList = user.roverFavorites.map(item => item.id) || [];

    const existed = currentFavList.includes(roverId);

    let isAdded = false;
    if (!existed) {
        const rover = await Rover.findByPk(roverId);
        if (!rover) {
            throw new Error('Rover not found');
        }
        user.addRoverFavorites(rover)
        isAdded = true;
    } else {
        const newList = currentFavList.filter(item => item !== roverId)
        user.setRoverFavorites(newList)
    }

    return { user, isAdded };
}

const updateUserFavListApod = async ({ userId, apodId }) => {

    let user = await User.findByPk(userId, {
        attributes: { exclude: ['password', 'salt'] },
        include: {
            model: db.apod,
            as: 'apodFavorites'
        }
    });
    let currentFavList = user.apodFavorites.map(item => item.id) || [];

    const existed = currentFavList.includes(apodId);

    let isAdded = false;
    if (!existed) {
        const apod = await Apod.findByPk(apodId);
        // console.log(apod)
        if (!apod) {
            throw new Error('Apod not found');
        }
        user.addApodFavorites(apod)
        isAdded = true;
    } else {
        const newList = currentFavList.filter(item => item !== apodId)
        user.setApodFavorites(newList)
    }

    return { user, isAdded };
}


module.exports = { updateUserFavListRover, getUserByEmail, getUserId, updateUserFavListApod }