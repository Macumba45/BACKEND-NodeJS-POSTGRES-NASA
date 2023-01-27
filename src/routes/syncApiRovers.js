import { Router } from "express";
import { apiCallRovers } from "../services/api.js";
import Rover from "../models/rover.js";
const routerApiRovers = Router();

routerApiRovers.get('/', async (req, res) => {
    try {
        console.log("LLAMANDO A LA API")
        await apiCallRovers()
        res.status(200).json('Data synchronize successfully')
    } catch (error) {
        res.status(500)
    }
})



export default routerApiRovers