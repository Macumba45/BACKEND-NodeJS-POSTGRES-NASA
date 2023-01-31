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
      models.rover.belongsToMany(models.user, {
        through: 'userRover',
        as: 'roverFavorites',
        foreignKey: 'roverId'
      });
    }
  }
  rover.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    nasaId: DataTypes.INTEGER,
    img_src: DataTypes.STRING,
    earth_date: DataTypes.STRING,
    camera: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'rover',
  });
  return rover;
};