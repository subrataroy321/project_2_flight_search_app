'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userFavorites extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  userFavorites.init({
    userId: DataTypes.INTEGER,
    favoriteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userFavorites',
  });
  return userFavorites;
};