"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("MentionedTweets", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      eTwitterId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      eTwitterCreatedAt: {
        type: Sequelize.DATE,
      },
      text: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      lang: {
        type: Sequelize.STRING,
      },
      eTwitterConversationId: {
        type: Sequelize.STRING,
      },
      possiblySensitive: {
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
    await queryInterface.dropTable("MentionedTweets");
  },
};
