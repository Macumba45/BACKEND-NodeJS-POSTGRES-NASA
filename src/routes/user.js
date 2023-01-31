const Router = require('express').Router;
const updateUserFavList = require('../controllers/user.js').updateUserFavList;
const routerUser = Router()
const db = require('../models');
const User = db.user;


routerUser.post('/addFavorites/:roverId', async (req, res) => {

    try {
        const { roverId } = req.params
        const { user, isAdded } = await updateUserFavList({
            userId: req.user.id,
            roverId
        })
        console.log(isAdded)
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


routerUser.get('/favList/:userId', async (req, res) => {

    try {

        const { userId } = req.params
        const user = await User.findOne({
            where: { id: userId },
            attributes: {
                exclude: ['password', 'salt', 'createdAt', 'updatedAt']
            },
            include: [{
                model: db.rover,
                through: 'userRover',
                as: 'favorites',
            }]
        })

        res.status(200).json(user)

    } catch (error) {
        res.status(500).json(error.message)
    }
})

module.exports = routerUser

