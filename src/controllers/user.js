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

const updateUserFavList = async ({ userID, id }) => {

    try {

        const user = await getUserId(userID);
        const currentFavList = user.favList;
        console.log(currentFavList)
        let newFavsList = currentFavList
        const existed = currentFavList.includes({ id })
        const roverDB = await Rover.findOne(id)

        if (existed) {
            newFavsList = currentFavList.filter(item => item !== id)
            console.log("Este documento ha sido eliminado")
        } else if (roverDB) {
            newFavsList.push(id)
            console.log("Este documento ha sido insertado")
        }

        await User.update(userID, { favList: newFavsList })

        let userUpdate = await getUserId(id)
        userUpdate = JSON.parse(JSON.stringify(userUpdate))
        // console.log(userUpdate)

        const { password, salt, ...userUpdate_ } = userUpdate;

        return userUpdate_

    } catch (error) {
        console.log(error.message)
    }

}


module.exports = { updateUserFavList, getUserByEmail, getUserId }