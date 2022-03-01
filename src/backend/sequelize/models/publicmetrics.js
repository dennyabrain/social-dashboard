"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PublicMetric extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PublicMetric.belongsTo(models.MentionedTweet);
    }
  }
  PublicMetric.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      mentionedTweetId: DataTypes.UUID,
      retweetCount: DataTypes.INTEGER,
      replyCount: DataTypes.INTEGER,
      likeCount: DataTypes.INTEGER,
      quoteCount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PublicMetric",
    }
  );
  return PublicMetric;
};
