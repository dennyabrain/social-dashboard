"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("PublicMetrics", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      mentionedTweetId: {
        type: Sequelize.UUID,
        references: {
          model: "MentionedTweets",
          key: "id",
        },
      },
      retweetCount: {
        type: Sequelize.INTEGER,
      },
      replyCount: {
        type: Sequelize.INTEGER,
      },
      likeCount: {
        type: Sequelize.INTEGER,
      },
      quoteCount: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("PublicMetrics");
  },
};
