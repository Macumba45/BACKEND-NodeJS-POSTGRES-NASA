'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`)
    await queryInterface.createTable('rovers', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      nasaId: {
        type: Sequelize.INTEGER
      },
      img_src: {
        type: Sequelize.STRING
      },
      earth_date: {
        type: Sequelize.STRING
      },
      camera: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: {},
        get() {
          return JSON.parse(this.getDataValue('camera'))
        },
        set(value) {
          this.setDataValue('camera', JSON.stringify(value))
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('rovers');
  }
};