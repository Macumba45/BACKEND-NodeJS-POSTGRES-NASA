const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    "macumba",
    "macumba",
    "macumba",
    {
        host: 'localhost',
        dialect: 'postgres',
    }
)

module.exports = sequelize;