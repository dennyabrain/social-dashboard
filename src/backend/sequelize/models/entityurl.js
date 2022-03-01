"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EntityURL extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      EntityURL.belongsTo(models.Entity);
    }
  }
  EntityURL.init(
    {
      url: DataTypes.STRING,
      expandedURL: DataTypes.STRING,
      displayURL: DataTypes.STRING,
      unwoundURL: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "EntityURL",
    }
  );
  return EntityURL;
};
