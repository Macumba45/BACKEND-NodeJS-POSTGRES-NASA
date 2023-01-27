import Apod from "../models/apod.js";
import Rover from "../models/rover.js";
import User from "../models/user.js";


export const getAll = async () => {
    const apodList = await Apod.findAll();
    const roverList = await Rover.findAll();
    const userList = await User.findAll();
    return {
        apodList, roverList, userList
    }
}