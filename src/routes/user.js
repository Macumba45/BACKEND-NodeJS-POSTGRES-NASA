const Router = require('express').Router;
const getUserId = require('../controllers/user.js').getUserId;
const updateUserFavList = require('../controllers/user.js').updateUserFavList;
const routerUser = Router()

routerUser.post('/favBookList/:roverId', async (req, res) => {

    try {
        const { roverId } = req.params
        const { user, isAdded } = await updateUserFavList({
            userId: req.user.id,
            roverId
        })

        if (isAdded) {
            res.status(200).json("Favorites successfully added")
        } else {
            res.status(200).json("Favorites successfully removed")
        }

    } catch (error) {
        if (error.message === 'No exist this data in database') {
            res.status(404).json(error.message)
        } else {
            console.error(error)
            res.status(500).json(error.message)
        }
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

