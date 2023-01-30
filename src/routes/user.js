const Router = require('express').Router;
const getUserId = require('../controllers/user.js').getUserId;
const updateUserFavList = require('../controllers/user.js').updateUserFavList;
const routerUser = Router()

routerUser.post('/favBookList/:id', async (req, res) => {

    try {
        const { id } = req.params
        console.log(req.params)
        const user = await updateUserFavList({ userID: req.user.id, id })
        console.log(user)
        // console.log(req.user.id, id)
        if (user === undefined) {
            return res.status(200).json("Data no exist in database")
        }
        res.status(200).json("Data updated successfully")

    } catch (error) {
        console.log(error.message)
    }

});


routerUser.get('/favBookList/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await getUserId(id)
        const favorites = user.favList
        res.status(200).json(favorites)

    } catch (error) {
        res.status(500).json(error.message)
    }
})

module.exports = routerUser

