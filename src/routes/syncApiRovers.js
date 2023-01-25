import { Router } from "express";
import { apiCallRovers } from "../services/api.js";
import Rover from "../models/rover.js";
const routerApiRovers = Router();

routerApiRovers.get('/', async (req, res) => {
    try {

        await apiCallRovers()
        await Rover.find()
        const message = 'Data synchronize successfully'
        res.status(200).json(message)
    } catch (error) {
        response.status(500)
    }
})



export default routerApiRovers