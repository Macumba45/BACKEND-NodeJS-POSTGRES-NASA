import express from 'express';
import { connectToDb } from './src/services/db.js';
import bodyParser from 'body-parser';
import routerApod from './src/routes/apod.js';
import routerRover from './src/routes/rover.js';
import routerUser from './src/routes/user.js';
import routerAuth from './src/routes/auth.js'
import routerAll from './src/routes/all.js';
import routerApodsApi from './src/routes/syncApi.js';
import routerApiRovers from './src/routes/syncApiRovers.js';
import dotenv from 'dotenv';
import { ensureAuthenticated } from './src/middleware/auth.js';


dotenv.config();

const startApp = async () => {

    // const deleteAllApod = function () {

    //     Apod.deleteMany({}, function (err) {
    //         if (err) console.log(err);
    //         console.log("Successful deletion Apod");
    //     });

    // }
    // deleteAllApod()

    // const deleteAllRovers = function () {

    //     Rover.deleteMany({}, function (err) {
    //         if (err) console.log(err);
    //         console.log("Successful deletion Rover");
    //     });

    // }
    // deleteAllRovers()

    // const deleteAllUsers = function () {

    //     User.deleteMany({}, function (err) {
    //         if (err) console.log(err);
    //         console.log("Successful deletion Users");
    //     });

    // }
    // deleteAllUsers()

    const app = express();
    const port = process.env.PORT;

    app.use(bodyParser.json());
    app.use(express.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(ensureAuthenticated)

    app.use('/auth', routerAuth)
    app.use('/users', routerUser)
    app.use('/all', routerAll);
    app.use('/apods', routerApod);
    app.use('/rovers', routerRover);
    app.use('/sync-api', routerApodsApi);
    app.use('/sync-apiRovers', routerApiRovers);

    try {
        await connectToDb()
        app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        })

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}


startApp()
