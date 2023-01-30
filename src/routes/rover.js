const db = require("../models/index.js");
const Rover = db.rover
const Router = require('express').Router;
const { getRoverList, getRoverId, createRover, updateRover, deleteRover } = require('../controllers/rover.js');
const routerRover = Router()


routerRover.get('/', async (req, res) => {
    try {
        const rovers = await getRoverList()
        res.status(200).json(rovers)
    } catch (error) {
        res.status(500).json(error.message)
    }
})


routerRover.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const task = await getRoverId(id)
        res.status(200).json(task)
    } catch (error) {
        res.status(500)
    }
});


routerRover.post('/', async (req, res) => {
    try {
        const bodyData = req.body
        const rover = await createRover(bodyData)
        res.status(200).json(rover)


    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
})

routerRover.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        const task = await updateRover(id, data)
        res.status(200).json(task)
    } catch (error) {
        console.log(error)
        res.status(500).json('Document update failed')
    }
});

routerRover.delete('/:id', async (req, res) => {

    try {
        const { id } = req.params
        console.log(id)
        await deleteRover(id)
        res.status(200).json('Document deleted successfully')

    } catch (error) {
        res.status(500).json(error.message)
    }


});

module.exports = routerRover

