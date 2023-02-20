const Router = require('express').Router;
const updateUserFavListRover = require('../controllers/user.js').updateUserFavListRover;
const updateUserFavListApod = require('../controllers/user.js').updateUserFavListApod
const getUserByEmail = require('../controllers/user.js').getUserByEmail;
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
        res.status(200).json({ isAdded })

    } catch (error) {
        if (error.message === 'No exist this data in database') {
            res.status(404).json(error.message)
        } else {
            console.error(error)
            res.status(500).json(error.message)
        }
    }
});


routerUser.get('/favList', async (req, res) => {

    try {

        const user = await User.findOne({
            where: { id: req.user.id },
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


routerUser.get('/profile', async (req, res) => {
    try {

        const data = await getUserByEmail(req.user.email)
        await data.reload();
        const user = {
            id: data.id,
            email: data.email,
            name: data.name
        }
        res.status(200).json(user)
        console.log(user)

    } catch (error) {

        console.log(error);
        res.status(500).json(error.message)


    }


})

module.exports = routerUser

