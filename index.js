const express = require('express');
const bodyParser = require('body-parser');
const routerApod = require('./src/routes/apod.js');
const routerRover = require('./src/routes/rover.js');
const routerUser = require('./src/routes/user.js');
const routerAuth = require('./src/routes/auth.js')
const routerApodsApi = require('./src/routes/syncApi.js');
const routerApiRovers = require('./src/routes/syncApiRovers.js');
const routerAll = require('./src/routes/all.js');
const dotenv = require('dotenv');
const ensureAuthenticated = require('./src/middleware/auth.js');
const cors = require('cors');


dotenv.config();

const startApp = async () => {


    const app = express();

    app.use(cors())

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
        app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        })

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}


startApp()
