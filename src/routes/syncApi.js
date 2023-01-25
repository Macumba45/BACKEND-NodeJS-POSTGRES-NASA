import { Router } from "express";
import { apiCallApod } from "../services/api.js";
import Apod from "../models/apod.js";

const routerApodsApi = Router();

routerApodsApi.get('/', async (req, res) => {
    try {

        await apiCallApod()
        await Apod.find()
        const message = 'Data synchronize successfully'
        res.status(200).json(message)
    } catch (error) {
        res.status(500).json('No new documents found')
    }
})


export default routerApodsApi