import User from "../models/user.js";
import Rover from "../models/rover.js";
// import Apod from "../models/apod.js";

const getUserId = async (id) => {

    const user = await User.findByPk(id)
    return user
}

const getUserByEmail = async (email) => {
    console.log(email)

    return await User.findOne({ where: { email } });

}
const updateUserFavList = async ({ id, idNasa }) => {

    try {

        const user = await getUserId(id);
        const currentFavList = user.favList
        let newFavsList = currentFavList
        const existed = currentFavList.includes(idNasa)
        const roverDB = await Rover.findById(idNasa)

        if (existed) {
            newFavsList = currentFavList.filter(item => item !== idNasa)
            console.log("Este documento ha sido eliminado")
        } else if (roverDB) {
            newFavsList.push(idNasa)
            console.log("Este documento ha sido insertado")
        }

        await User.findByIdAndUpdate(id, { favList: newFavsList })

        let userUpdate = await getUserId(id)
        userUpdate = JSON.parse(JSON.stringify(userUpdate))
        // console.log(userUpdate)

        const { password, salt, ...userUpdate_ } = userUpdate;

        return userUpdate_

    } catch (error) {
        // console.log(error.message)
    }

}


export { updateUserFavList, getUserByEmail, getUserId }