const db = require("../models/index.js");
const Rover = db.rover
const Router = require('express').Router;
const { getRoverList, getRoverId, updateRover, deleteRover } = require('../controllers/rover.js');
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
        const { nasaId } = req.body;
        const exists = await Rover.findOne({ where: { nasaId } });
        if (!exists) {
            const bodyData = req.body;
            await Rover.create(bodyData);
            res.status(200).json(bodyData);
        } else {
            res.status(200).json("Rover already exists");
        }
    } catch (error) {
        console.error(error);
    }
});

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

