import Apod from "../models/apod.js";
import Rover from "../models/rover.js";
import User from "../models/user.js";


export const getAll = async () => {
    const apodList = await Apod.find();
    const roverList = await Rover.find();
    const userList = await User.find();
    return {
        apodList, roverList, userList
    }
}