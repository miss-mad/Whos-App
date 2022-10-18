'use strict';
const {
  Model, DataTypes
} = require('sequelize');


  class Contact extends Model {}
  
  Contact.init(
    {
      id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
  
module.exports = Contact;