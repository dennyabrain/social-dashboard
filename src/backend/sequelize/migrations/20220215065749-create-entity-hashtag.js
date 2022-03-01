"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("EntityHashtags", {
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
      tag: {
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
    await queryInterface.dropTable("EntityHashtags");
  },
};
