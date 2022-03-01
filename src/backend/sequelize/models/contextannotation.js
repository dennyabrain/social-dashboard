"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ContextAnnotation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ContextAnnotation.belongsTo(models.MentionedTweet);
      ContextAnnotation.hasOne(models.ContextAnnotationDomain);
      ContextAnnotation.hasOne(models.ContextAnnotationEntity);
    }
  }
  ContextAnnotation.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      mentionedTweetId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "ContextAnnotation",
    }
  );
  return ContextAnnotation;
};
