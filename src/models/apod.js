import { Sequelize } from "sequelize";
import db from "../services/db.js"

const Apod = db.define('apods', {

    id: {
        type: Sequelize.INTEGER, // debe ser tipo string uuid
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING(2048),

    },
    explanation: {
        type: Sequelize.STRING(2048),
    },
    url: {
        type: Sequelize.STRING(2048),
    },
    date: {
        type: Sequelize.STRING(2048),
    }

})

export default Apod;


