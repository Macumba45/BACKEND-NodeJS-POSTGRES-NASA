import { Router } from "express";
import { apiCallApod } from "../services/api.js";
import Apod from "../models/apod.js";
const routerApodsApi = Router();

routerApodsApi.get('/', async (req, res) => {
    try {

        console.log("LLAMANDO A LA API")
        await apiCallApod()
        res.status(200).json('Data synchronize successfully')
    } catch (error) {
        console.log(error)
        res.status(500).json('No new documents found')
    }
})


export default routerApodsApi