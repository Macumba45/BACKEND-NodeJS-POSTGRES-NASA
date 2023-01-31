'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class apod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.apod.belongsToMany(models.user, {
        through: 'userApod',
        as: 'apodFavorites',
        foreignKey: 'apodId'
      });
    }
  }
  apod.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    title: DataTypes.STRING,
    date: DataTypes.STRING,
    explanation: {
      type: DataTypes.TEXT('long')
    },
    url: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'apod',
  });
  return apod;
};