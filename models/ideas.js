'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ideas = sequelize.define('Ideas', {
    name: DataTypes.STRING,
    username: DataTypes.STRING
  }, {});
  Ideas.associate = function(models) {
    // associations can be defined here
  };
  return Ideas;
};