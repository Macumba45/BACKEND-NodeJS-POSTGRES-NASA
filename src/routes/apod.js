import { Router } from 'express';
import { getApodList, getApodId, createApod, updateApod, deleteApod } from '../controllers/apod.js';
const routerApod = Router()

routerApod.get('/', async (req, res) => {
    try {
        const apods = await getApodList()
        res.status(200).json(apods)
    } catch (error) {
        response.status(500)
    }
})


routerApod.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const task = await getApodId(id)
        res.status(200).json(task)
    } catch (error) {
        response.status(500)
    }
});


routerApod.post('/', async (req, res) => {

    try {
        const bodyData = req.body
        const apod = await createApod(bodyData)
        res.status(200).json(apod)


    } catch (error) {

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
        response.status(500)
    }


});



export default routerApod

