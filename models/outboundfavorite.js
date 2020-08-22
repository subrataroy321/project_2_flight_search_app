'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class outboundFavorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.outboundFavorite.belongsToMany(models.user, {through: "userOutboundFavorite"});
      models.outboundFavorite.hasOne(models.inboundFavorite)

    }
  };
  outboundFavorite.init({
    userId: DataTypes.INTEGER,
    inboundFavoriteId: DataTypes.INTEGER,
    tripType: DataTypes.STRING,
    price: DataTypes.STRING,
    totalTravelTime: DataTypes.STRING,
    stops: DataTypes.INTEGER,
    airline1: DataTypes.STRING,
    airlineCode1: DataTypes.STRING,
    aircraftCode1: DataTypes.STRING,
    departureAirport1: DataTypes.STRING,
    departureTime1: DataTypes.STRING,
    arrivalAirport1: DataTypes.STRING,
    arrivalTime1: DataTypes.STRING,
    travelTime1: DataTypes.STRING,
    airline2: DataTypes.STRING,
    airlineCode2: DataTypes.STRING,
    aircraftCode2: DataTypes.STRING,
    departureAirport2: DataTypes.STRING,
    departureTime2: DataTypes.STRING,
    arrivalAirport2: DataTypes.STRING,
    arrivalTime2: DataTypes.STRING,
    travelTime2: DataTypes.STRING,
    airline3: DataTypes.STRING,
    airlineCode3: DataTypes.STRING,
    aircraftCode3: DataTypes.STRING,
    departureAirport3: DataTypes.STRING,
    departureTime3: DataTypes.STRING,
    arrivalAirport3: DataTypes.STRING,
    arrivalTime3: DataTypes.STRING,
    travelTime3: DataTypes.STRING,
    airline4: DataTypes.STRING,
    airlineCode4: DataTypes.STRING,
    aircraftCode4: DataTypes.STRING,
    departureAirport4: DataTypes.STRING,
    departureTime4: DataTypes.STRING,
    arrivalAirport4: DataTypes.STRING,
    arrivalTime4: DataTypes.STRING,
    travelTime4: DataTypes.STRING,
    airline5: DataTypes.STRING,
    airlineCode5: DataTypes.STRING,
    aircraftCode5: DataTypes.STRING,
    departureAirport5: DataTypes.STRING,
    departureTime5: DataTypes.STRING,
    arrivalAirport5: DataTypes.STRING,
    arrivalTime5: DataTypes.STRING,
    travelTime5: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'outboundFavorite',
  });
  return outboundFavorite;
};