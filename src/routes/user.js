const Router = require('express').Router;
const updateUserFavListRover = require('../controllers/user.js').updateUserFavListRover;
const updateUserFavListApod = require('../controllers/user.js').updateUserFavListApod
const routerUser = Router()
const db = require('../models');
const User = db.user;


routerUser.post('/addFavoritesRover/:roverId', async (req, res) => {

    try {
        const { roverId } = req.params
        const { user, isAdded } = await updateUserFavListRover({
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

routerUser.post('/addFavoritesApod/:apodId', async (req, res) => {

    try {
        const { apodId } = req.params
        console.log(apodId)
        const { user, isAdded } = await updateUserFavListApod({
            userId: req.user.id,
            apodId
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

        const { userId } = req.params;
        const user = await User.findOne({
            where: { id: userId },
            attributes: {
                exclude: ['password', 'salt', 'createdAt', 'updatedAt']
            },
            include: [
                {
                    model: db.rover,
                    through: 'userRover',
                    as: 'roverFavorites',
                },
                {
                    model: db.apod,
                    through: 'userApod',
                    as: 'apodFavorites',
                },
            ]
        });

        res.status(200).json(user)

    } catch (error) {
        res.status(500).json(error.message)
    }
})

module.exports = routerUser

