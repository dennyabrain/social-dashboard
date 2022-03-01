"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Author.belongsTo(models.MentionedTweet);
    }
  }
  Author.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      eTwitterId: DataTypes.STRING,
      eTwitterCreatedAt: DataTypes.STRING,
      mentionedTweetId: DataTypes.UUID,
      verified: DataTypes.BOOLEAN,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      profileImageUrl: DataTypes.STRING,
      location: DataTypes.STRING,
      url: DataTypes.STRING,
      username: DataTypes.STRING,
      protected: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Author",
    }
  );
  return Author;
};
