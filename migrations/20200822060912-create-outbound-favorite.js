'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('outboundFavorites', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      inboundFavoriteId: {
        type: Sequelize.INTEGER
      },
      tripType: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      totalTravelTime: {
        type: Sequelize.STRING
      },
      stops: {
        type: Sequelize.INTEGER
      },
      airline1: {
        type: Sequelize.STRING
      },
      airlineCode1: {
        type: Sequelize.STRING
      },
      aircraftCode1: {
        type: Sequelize.STRING
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
      airline2: {
        type: Sequelize.STRING
      },
      airlineCode2: {
        type: Sequelize.STRING
      },
      aircraftCode2: {
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
      airline3: {
        type: Sequelize.STRING
      },
      airlineCode3: {
        type: Sequelize.STRING
      },
      aircraftCode3: {
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
      airline4: {
        type: Sequelize.STRING
      },
      airlineCode4: {
        type: Sequelize.STRING
      },
      aircraftCode4: {
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
      airline5: {
        type: Sequelize.STRING
      },
      airlineCode5: {
        type: Sequelize.STRING
      },
      aircraftCode5: {
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
    await queryInterface.dropTable('outboundFavorites');
  }
};