'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class inboundFavorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.inboundFavorite.belongsTo(models.outboundFavorite)
    }
  };
  inboundFavorite.init({
    outboundFavoriteId: DataTypes.INTEGER,
    totalReturnTravelTime: DataTypes.STRING,
    returnStops: DataTypes.INTEGER,
    returnAirline1: DataTypes.STRING,
    returnAirlineCode1: DataTypes.STRING,
    returnAircraftCode1: DataTypes.STRING,
    returnDepartureAirport1: DataTypes.STRING,
    returnDepartureTime1: DataTypes.STRING,
    returnArrivalAirport1: DataTypes.STRING,
    returnArrivalTime1: DataTypes.STRING,
    returnTavelTime1: DataTypes.STRING,
    returnAirline2: DataTypes.STRING,
    returnAirlineCode2: DataTypes.STRING,
    returnAircraftCode2: DataTypes.STRING,
    returnDepartureAirport2: DataTypes.STRING,
    returnDepartureTime2: DataTypes.STRING,
    returnArrivalAirport2: DataTypes.STRING,
    returnArrivalTime2: DataTypes.STRING,
    returnTavelTime2: DataTypes.STRING,
    returnAirline3: DataTypes.STRING,
    returnAirlineCode3: DataTypes.STRING,
    returnAircraftCode3: DataTypes.STRING,
    returnDepartureAirport3: DataTypes.STRING,
    returnDepartureTime3: DataTypes.STRING,
    returnArrivalAirport3: DataTypes.STRING,
    returnArrivalTime3: DataTypes.STRING,
    returnTavelTime3: DataTypes.STRING,
    returnAirline4: DataTypes.STRING,
    returnAirlineCode4: DataTypes.STRING,
    returnAircraftCode4: DataTypes.STRING,
    returnDepartureAirport4: DataTypes.STRING,
    returnDepartureTime4: DataTypes.STRING,
    returnArrivalAirport4: DataTypes.STRING,
    returnArrivalTime4: DataTypes.STRING,
    returnTavelTime4: DataTypes.STRING,
    returnAirline5: DataTypes.STRING,
    returnAirlineCode5: DataTypes.STRING,
    returnAircraftCode5: DataTypes.STRING,
    returnDepartureAirport5: DataTypes.STRING,
    returnDepartureTime5: DataTypes.STRING,
    returnArrivalAirport5: DataTypes.STRING,
    returnArrivalTime5: DataTypes.STRING,
    returnTavelTime5: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'inboundFavorite',
  });
  return inboundFavorite;
};