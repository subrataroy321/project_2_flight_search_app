'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('inboundFavorites', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      outboundFavoriteId: {
        type: Sequelize.INTEGER
      },
      totalReturnTravelTime: {
        type: Sequelize.STRING
      },
      returnStops: {
        type: Sequelize.INTEGER
      },
      returnAirline1: {
        type: Sequelize.STRING
      },
      returnAirlineCode1: {
        type: Sequelize.STRING
      },
      returnAircraftCode1: {
        type: Sequelize.STRING
      },
      returnDepartureAirport1: {
        type: Sequelize.STRING
      },
      returnDepartureTime1: {
        type: Sequelize.STRING
      },
      returnArrivalAirport1: {
        type: Sequelize.STRING
      },
      returnArrivalTime1: {
        type: Sequelize.STRING
      },
      returnTavelTime1: {
        type: Sequelize.STRING
      },
      returnAirline2: {
        type: Sequelize.STRING
      },
      returnAirlineCode2: {
        type: Sequelize.STRING
      },
      returnAircraftCode2: {
        type: Sequelize.STRING
      },
      returnDepartureAirport2: {
        type: Sequelize.STRING
      },
      returnDepartureTime2: {
        type: Sequelize.STRING
      },
      returnArrivalAirport2: {
        type: Sequelize.STRING
      },
      returnArrivalTime2: {
        type: Sequelize.STRING
      },
      returnTavelTime2: {
        type: Sequelize.STRING
      },
      returnAirline3: {
        type: Sequelize.STRING
      },
      returnAirlineCode3: {
        type: Sequelize.STRING
      },
      returnAircraftCode3: {
        type: Sequelize.STRING
      },
      returnDepartureAirport3: {
        type: Sequelize.STRING
      },
      returnDepartureTime3: {
        type: Sequelize.STRING
      },
      returnArrivalAirport3: {
        type: Sequelize.STRING
      },
      returnArrivalTime3: {
        type: Sequelize.STRING
      },
      returnTavelTime3: {
        type: Sequelize.STRING
      },
      returnAirline4: {
        type: Sequelize.STRING
      },
      returnAirlineCode4: {
        type: Sequelize.STRING
      },
      returnAircraftCode4: {
        type: Sequelize.STRING
      },
      returnDepartureAirport4: {
        type: Sequelize.STRING
      },
      returnDepartureTime4: {
        type: Sequelize.STRING
      },
      returnArrivalAirport4: {
        type: Sequelize.STRING
      },
      returnArrivalTime4: {
        type: Sequelize.STRING
      },
      returnTavelTime4: {
        type: Sequelize.STRING
      },
      returnAirline5: {
        type: Sequelize.STRING
      },
      returnAirlineCode5: {
        type: Sequelize.STRING
      },
      returnAircraftCode5: {
        type: Sequelize.STRING
      },
      returnDepartureAirport5: {
        type: Sequelize.STRING
      },
      returnDepartureTime5: {
        type: Sequelize.STRING
      },
      returnArrivalAirport5: {
        type: Sequelize.STRING
      },
      returnArrivalTime5: {
        type: Sequelize.STRING
      },
      returnTavelTime5: {
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
    await queryInterface.dropTable('inboundFavorites');
  }
};