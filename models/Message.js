// NOT IN USE BUT ADJUSTED FOR SEEDING DATABASE TESTING

"use strict";
const { Model } = require("sequelize");
const sequelize = require("../config/connection");

class Message extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}
User.init(
  {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "message",
  }
);
// return Message;

module.exports = Message;
