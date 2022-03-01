"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ContextAnnotationDomain extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ContextAnnotationDomain.belongsTo(models.ContextAnnotation);
    }
  }
  ContextAnnotationDomain.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      eId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ContextAnnotationDomain",
    }
  );
  return ContextAnnotationDomain;
};
