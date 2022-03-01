"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Authors", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      eTwitterId: {
        type: Sequelize.STRING,
      },
      eTwitterCreatedAt: {
        type: Sequelize.STRING,
      },
      mentionedTweetId: {
        type: Sequelize.UUID,
        references: {
          model: "MentionedTweets",
          key: "id",
        },
      },
      verified: {
        type: Sequelize.BOOLEAN,
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      profileImageUrl: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.STRING,
      },
      url: {
        type: Sequelize.STRING,
      },
      username: {
        type: Sequelize.STRING,
      },
      protected: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("Authors");
  },
};
