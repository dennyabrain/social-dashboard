"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MentionedTweet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MentionedTweet.hasOne(models.Author);
      MentionedTweet.hasOne(models.PublicMetric);
      MentionedTweet.hasOne(models.Entity);
      MentionedTweet.hasMany(models.ContextAnnotation);
    }
  }
  MentionedTweet.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      eTwitterId: DataTypes.STRING,
      eTwitterCreatedAt: DataTypes.DATE,
      text: DataTypes.STRING,
      lang: DataTypes.STRING,
      eTwitterConversationId: DataTypes.STRING,
      possiblySensitive: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "MentionedTweet",
    }
  );
  return MentionedTweet;
};
