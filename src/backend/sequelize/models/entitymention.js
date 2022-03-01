"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EntityMention extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      EntityMention.belongsTo(models.Entity);
    }
  }
  EntityMention.init(
    {
      start: DataTypes.INTEGER,
      end: DataTypes.INTEGER,
      username: DataTypes.STRING,
      eTwitterId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "EntityMention",
    }
  );
  return EntityMention;
};
