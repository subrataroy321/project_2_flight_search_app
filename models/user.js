'use strict';
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.belongsToMany(models.outboundFavorite, {through: "userOutboundFavorite"})
      
    }
  };
  user.init({
    firstName: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1,50],
          msg: 'Name must be 1 to 50 characters'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1,30],
          msg: 'Last Name must be 1 to 30 characters'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8,200],
          msg: 'Password must be between 8 to 200 characters'
        }
      }
    },
    countryCode: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1,6],
          msg: 'Country Code should between 1 to 6 numbers'
        }
      }
    },
    contactNo: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1,10],
          msg: 'Number must be 10 numbers'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'user',
  });

user.addHook('beforeCreate', function(pendingUser) {
  let hash = bcrypt.hashSync(pendingUser.password, 12);
  pendingUser.password = hash;
})

user.addHook('beforeUpdate', function(pendingUser) {
  
  let hash = bcrypt.hashSync(pendingUser.password, 12);
  pendingUser.password = hash;
})

user.prototype.validPassword = function(passwordTyped) {
  let correctPassword= bcrypt.compareSync(passwordTyped, this.password);
  return correctPassword;
}

user.prototype.toJSON = function() {
  let userData = this.get();
  delete userData.password;
  return userData;
}

return user;
};