"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("job_divisions", {
      job_divisions_id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        unique: true,
        type: Sequelize.BIGINT,
      },
      job_division_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      // summary: {
      //   type: Sequelize.STRING(500),
      //   allowNull: false,
      // },
      imageDir: {
        type: Sequelize.STRING,
        defaultValue: "imageResource/defaultJobDivision.jpg",
      },
      detail: {
        type: Sequelize.STRING,
      },
      postingStatus: {
        type: Sequelize.ENUM("PUBLISH", "DRAFT", "ARCHIVE"),
        defaultValue: "DRAFT",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("job_divisions");
  },
};
