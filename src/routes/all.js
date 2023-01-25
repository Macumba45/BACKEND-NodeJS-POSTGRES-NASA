import { Router } from 'express';
import { getAll } from '../controllers/all.js';

const routerAll = Router()

routerAll.get('/', async (req, res) => {
    const all = await getAll()
    res.status(200).json(all)
});

export default routerAll;
