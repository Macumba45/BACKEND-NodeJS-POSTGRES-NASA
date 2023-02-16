const Router = require('express').Router;
const apiCallApod = require("../services/api").apiCallApod
const routerApodsApi = Router();

routerApodsApi.get('/', async (req, res) => {
    try {

        await apiCallApod()
        res.status(200).json('Data synchronize successfully')
    } catch (error) {
        console.log(error)
        res.status(500).json('No new documents found')
    }
})


module.exports = routerApodsApi