const Router = require('express').Router;
const apiCallRovers = require('../services/api.js').apiCallRovers;
const routerApiRovers = Router();

routerApiRovers.get('/', async (req, res) => {
    try {
        await apiCallRovers()
        res.status(200).json('Data synchronize successfully')
    } catch (error) {
        console.log(error)
        res.status(500)
    }
})



module.exports = routerApiRovers