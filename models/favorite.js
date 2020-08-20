'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.favorite.belongsTo(models.user)
    }
  };
  favorite.init({
    userId: DataTypes.INTEGER,
    airline: DataTypes.STRING,
    boeing: DataTypes.STRING,
    stops: DataTypes.INTEGER,
    checkedBags: DataTypes.INTEGER,
    departureAirport1: DataTypes.STRING,
    departureTime1: DataTypes.STRING,
    arrivalAirport1: DataTypes.STRING,
    arrivalTime1: DataTypes.STRING,
    travelTime1: DataTypes.STRING,
    departureAirport2: DataTypes.STRING,
    departureTime2: DataTypes.STRING,
    arrivalAirport2: DataTypes.STRING,
    arrivalTime2: DataTypes.STRING,
    travelTime2: DataTypes.STRING,
    departureAirport3: DataTypes.STRING,
    departureTime3: DataTypes.STRING,
    arrivalAirport3: DataTypes.STRING,
    arrivalTime3: DataTypes.STRING,
    travelTime3: DataTypes.STRING,
    departureAirport4: DataTypes.STRING,
    departureTime4: DataTypes.STRING,
    arrivalAirport4: DataTypes.STRING,
    arrivalTime4: DataTypes.STRING,
    travelTime4: DataTypes.STRING,
    departureAirport5: DataTypes.STRING,
    departureTime5: DataTypes.STRING,
    arrivalAirport5: DataTypes.STRING,
    arrivalTime5: DataTypes.STRING,
    travelTime5: DataTypes.STRING,
    totalTravelTime: DataTypes.STRING,
    price: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'favorite',
  });
  return favorite;
};