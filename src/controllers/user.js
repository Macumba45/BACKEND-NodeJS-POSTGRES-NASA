const db = require('../models');
const User = db.user;
const Rover = db.rover;


const getUserId = async (id) => {

    const user = await User.findByPk(id)
    return user
}

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({
            where:
                { email: email }
        })
        return user
    } catch (error) {
        console.log("este es el error " + error.message);

    }

}

const updateUserFavList = async ({ userId, roverId }) => {

    let user = await User.findByPk(userId, {
        attributes: { exclude: ['password', 'salt'] },
        include: {
            model: db.rover,
            as: 'favorites'
        }
    });
    // console.log('PREV', user)
    let currentFavList = user.favorites.map(item => item.id) || [];

    const existed = currentFavList.includes(roverId);

    let isAdded = false;
    if (!existed) {
        const rover = await Rover.findByPk(roverId);
        if (!rover) {
            throw new Error('Rover not found');
        }
        user.addFavorites(rover)
        isAdded = true;
    } else {
        const newList = currentFavList.filter(item => item !== roverId)
        user.setFavorites(newList)
    }

    return { user, isAdded };
}


module.exports = { updateUserFavList, getUserByEmail, getUserId }