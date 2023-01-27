import { Sequelize } from "sequelize";
import db from "../services/db.js"

const Rover = db.define('rovers', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
    },

    camera: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: {},
        get() {
            return JSON.parse(this.getDataValue('camera'));
        },
        set(value) {
            this.setDataValue('camera', JSON.stringify(value));
        }
    },
    img_src: {
        type: Sequelize.STRING,
        // allowNull: false,
    },
    earth_date: {
        type: Sequelize.STRING,
        // allowNull: false,

    },
});

export default Rover;
