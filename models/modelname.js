'use strict';
module.exports = (sequelize, DataTypes) => {
  const ModelName = sequelize.define('ModelName', {
    attribute1: DataTypes.DATA_TYPE,
    attribute2: DataTypes.DATA_TYPE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ModelName;
};
