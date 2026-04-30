'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class school extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  school.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'Name is required',
          },
          len: {
            args: [5, 200],
            msg: 'Name must be between 5 and 200 character',
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'address is required',
          },
          len: {
            args: [5, 500],
            msg: 'address must be between 5 and 500 character',
          },
        },
      },
      latitude: {
        type: DataTypes.FLOAT,
        validate: {
          notEmpty: {
            msg: 'Latitude is required',
          },
        },
      },
      longitude: {
        type: DataTypes.FLOAT,
        validate: {
          notEmpty: {
            msg: 'Longitude is required',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'school',
    },
  );
  return school;
};
