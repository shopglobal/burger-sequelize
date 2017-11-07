'use strict';
module.exports = function(sequelize, DataTypes) {
  var Burger = sequelize.define("burger", {
    burger_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  });
  return Burger;
};