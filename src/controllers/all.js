const Apod = require("../models/apod.js");
const Rover = require("../models/rover.js");
const User = require("../models/user.js");



export const getAll = async () => {
    const apodList = await Apod.findAll();
    const roverList = await Rover.findAll();
    const userList = await User.findAll();
    return {
        apodList, roverList, userList
    }
}