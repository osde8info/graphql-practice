'use strict';
module.exports = (sequelize, DataTypes) => {
  const Suggest = sequelize.define('Suggest', {
    name: DataTypes.STRING,
    username: DataTypes.STRING
  }, {});
  Suggest.associate = function(models) {
    // associations can be defined here
  };
  return Suggest;
};