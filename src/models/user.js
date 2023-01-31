'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.belongsToMany(models.rover, {
        through: 'userRover',
        as: 'roverFavorites',
        foreignKey: 'userId'
      });

      user.belongsToMany(models.apod, {
        through: 'userApod',
        as: 'apodFavorites',
        foreignKey: 'userId'
      });

    }
  }
  user.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: DataTypes.STRING,
    salt: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};