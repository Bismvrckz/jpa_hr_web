"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("jobLists", {
      job_list_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      job_name: {
        type: Sequelize.STRING(70),
        allowNull: false,
        unique: true,
      },
      sort_desc: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      full_desc: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      job_divisions_id: {
        allowNull: true,
        type: Sequelize.BIGINT,
        references: {
          model: "job_divisions",
          key: "job_divisions_id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      min_salary: {
        allowNull: false,
        type: Sequelize.BIGINT(11),
      },
      max_salary: {
        allowNull: false,
        type: Sequelize.BIGINT(11),
      },
      imageDir: {
        type: Sequelize.STRING,
      },
      postingStatus: {
        allowNull: false,
        type: Sequelize.ENUM("DRAFT", "PUBLISH"),
      },
      level: {
        allowNull: false,
        type: Sequelize.ENUM("Fresh Graduate", "Middle", "Senior", "Manager"),
      },
      batasPengiriman: {
        allowNull: false,
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("jobLists");
  },
};
