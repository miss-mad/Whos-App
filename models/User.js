'use strict';
const {
  Model, DataTypes
} = require('sequelize');

const bcrypt = require(bcrypt);

const sequelize = require('../config/connection');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    checkPassword(loginPW) {
      return bcrypt.compareSync(loginPW, this.password);
    }
    static associate(models) {
      // define association here
      User.hasMany(Contact);
      User.hasMany(Message);
      Contact.belongsTo(User);
      Message.belongsTo(User);
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    userName: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

module.exports = User;