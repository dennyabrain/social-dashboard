"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Entity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Entity.belongsTo(models.MentionedTweet);
      Entity.hasMany(models.EntityURL);
      Entity.hasMany(models.EntityAnnotation);
      Entity.hasMany(models.EntityHashtag);
      Entity.hasMany(models.EntityMention);
    }
  }
  Entity.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      mentionedTweetId: DataTypes.UUID,
      mention: DataTypes.UUID,
      url: DataTypes.UUID,
      annotation: DataTypes.UUID,
      hashtag: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Entity",
    }
  );
  return Entity;
};
