const { getApodList, getApodId, updateApod, deleteApod } = require('../controllers/apod.js')
const Router = require('express').Router;
const routerApod = Router()
const db = require("../models/index.js");
const Apod = db.apod


routerApod.get('/', async (req, res) => {
    try {
        const apods = await getApodList()
        res.status(200).json(apods)
    } catch (error) {
        res.status(500)
    }
})


routerApod.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const task = await getApodId(id)
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json(error.message)
    }
});


routerApod.post('/', async (req, res) => {

    try {
        const { title } = req.body
        const exists = await Apod.findOne({ where: { title } })
        if (!exists) {
            const bodyData = req.body
            await Apod.create(bodyData)
            res.status(200).json(bodyData)
        } else {
            res.status(200).json("Apod already Exists")
        }

    } catch (error) {
        console.log(error)
        res.status(500).json('Document creation failed')
    }
})

routerApod.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        const task = await updateApod(id, data)
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json('Document update failed')
    }
});

routerApod.delete('/:id', async (req, res) => {

    try {
        const { id } = req.params
        await deleteApod(id)
        res.status(200).json('Document deleted successfully')

    } catch (error) {
        res.status(500)
    }


});


module.exports = routerApod

