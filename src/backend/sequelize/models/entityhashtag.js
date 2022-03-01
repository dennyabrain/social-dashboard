"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EntityHashtag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      EntityHashtag.belongsTo(models.Entity);
    }
  }
  EntityHashtag.init(
    {
      start: DataTypes.INTEGER,
      end: DataTypes.INTEGER,
      tag: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "EntityHashtag",
    }
  );
  return EntityHashtag;
};
