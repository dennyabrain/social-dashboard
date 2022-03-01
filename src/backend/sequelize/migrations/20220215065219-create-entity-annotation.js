"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("EntityAnnotations", {
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
      start: {
        type: Sequelize.INTEGER,
      },
      end: {
        type: Sequelize.INTEGER,
      },
      probability: {
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.STRING,
      },
      normalizedText: {
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
    await queryInterface.dropTable("EntityAnnotations");
  },
};
