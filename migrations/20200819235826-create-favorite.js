'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('favorites', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      airline: {
        type: Sequelize.STRING
      },
      boeing: {
        type: Sequelize.STRING
      },
      stops: {
        type: Sequelize.INTEGER
      },
      checkedBags: {
        type: Sequelize.INTEGER
      },
      departureAirport1: {
        type: Sequelize.STRING
      },
      departureTime1: {
        type: Sequelize.STRING
      },
      arrivalAirport1: {
        type: Sequelize.STRING
      },
      arrivalTime1: {
        type: Sequelize.STRING
      },
      travelTime1: {
        type: Sequelize.STRING
      },
      departureAirport2: {
        type: Sequelize.STRING
      },
      departureTime2: {
        type: Sequelize.STRING
      },
      arrivalAirport2: {
        type: Sequelize.STRING
      },
      arrivalTime2: {
        type: Sequelize.STRING
      },
      travelTime2: {
        type: Sequelize.STRING
      },
      departureAirport3: {
        type: Sequelize.STRING
      },
      departureTime3: {
        type: Sequelize.STRING
      },
      arrivalAirport3: {
        type: Sequelize.STRING
      },
      arrivalTime3: {
        type: Sequelize.STRING
      },
      travelTime3: {
        type: Sequelize.STRING
      },
      departureAirport4: {
        type: Sequelize.STRING
      },
      departureTime4: {
        type: Sequelize.STRING
      },
      arrivalAirport4: {
        type: Sequelize.STRING
      },
      arrivalTime4: {
        type: Sequelize.STRING
      },
      travelTime4: {
        type: Sequelize.STRING
      },
      departureAirport5: {
        type: Sequelize.STRING
      },
      departureTime5: {
        type: Sequelize.STRING
      },
      arrivalAirport5: {
        type: Sequelize.STRING
      },
      arrivalTime5: {
        type: Sequelize.STRING
      },
      travelTime5: {
        type: Sequelize.STRING
      },
      totalTravelTime: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('favorites');
  }
};