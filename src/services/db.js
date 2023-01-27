import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    "macumba",
    "macumba",
    "macumba",
    {
        host: 'localhost',
        dialect: 'postgres',
    }
)

export default sequelize;





