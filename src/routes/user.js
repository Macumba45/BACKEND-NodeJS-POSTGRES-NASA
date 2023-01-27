import { Router } from 'express';
import { getUserId, updateUserFavList } from '../controllers/user.js';
const routerUser = Router()

routerUser.post('/favBookList/:idNasa', async (req, res) => {

    try {
        const { idNasa } = req.params
        const user = await updateUserFavList({ id: req.user.id, idNasa })
        if (user === undefined) {
            return res.status(200).json("Data no exist in database")
        }
        res.status(200).json("Data updated successfully")

    } catch (error) {
        console.log(error.message)
    }

});


routerUser.get('/favBookList/:idNasa', async (req, res) => {
    try {
        const { idNasa } = req.params
        const user = await getUserId(idNasa)
        const favorites = user.favList
        res.status(200).json(favorites)

    } catch (error) {
        res.status(500).json(error.message)
    }
})

export default routerUser

