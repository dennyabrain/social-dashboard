"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EntityAnnotation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      EntityAnnotation.belongsTo(models.Entity);
    }
  }
  EntityAnnotation.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      start: DataTypes.INTEGER,
      end: DataTypes.INTEGER,
      probability: DataTypes.INTEGER,
      type: DataTypes.STRING,
      normalizedText: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "EntityAnnotation",
    }
  );
  return EntityAnnotation;
};
