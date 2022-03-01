"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("EntityURLs", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      entityId: {
        type: Sequelize.UUID,
        references: {
          model: "Entities",
          key: "id",
        },
      },
      url: {
        type: Sequelize.STRING,
      },
      expandedURL: {
        type: Sequelize.STRING,
      },
      displayURL: {
        type: Sequelize.STRING,
      },
      unwoundURL: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("EntityURLs");
  },
};
