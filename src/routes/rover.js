import { Router } from 'express';
import { getRoverList, getRoverId, createRover, updateRover, deleteRover } from '../controllers/rover.js';
const routerRover = Router()


routerRover.get('/', async (req, res) => {
    try {
        const rovers = await getRoverList()
        res.status(200).json(rovers)
    } catch (error) {
        response.status(500)
    }
})


routerRover.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const task = await getRoverId(id)
        res.status(200).json(task)
    } catch (error) {
        response.status(500)
    }
});


routerRover.post('/', async (req, res) => {
    try {
        const bodyData = req.body
        const rover = await createRover(bodyData)
        res.status(200).json(rover)

    } catch (error) {
        res.status(500).json('Document creation failed')
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
        await deleteRover(id)
        res.status(200).json('Document deleted successfully')

    } catch (error) {
        response.status(500)
    }


});



export default routerRover

