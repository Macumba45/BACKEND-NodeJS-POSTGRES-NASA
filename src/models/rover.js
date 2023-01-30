'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rover extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  rover.init({
    nasaId: DataTypes.STRING,
    img_src: DataTypes.STRING,
    earth_date: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'rover',
  });
  return rover;
};