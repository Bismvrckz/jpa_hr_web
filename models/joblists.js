"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class jobLists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      jobLists.hasOne(models.job_divisions, {
        foreignKey: "job_divisions_id",
      });
    }
  }
  jobLists.init(
    {
      job_list_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      job_name: {
        type: DataTypes.STRING(70),
        allowNull: false,
        unique: true,
      },
      sort_desc: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      full_desc: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      job_divisions_id: {
        allowNull: false,
        type: DataTypes.BIGINT,
        references: {
          model: "job_divisions",
          key: "job_divisions_id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      min_salary: {
        allowNull: false,
        type: DataTypes.BIGINT(11),
      },
      max_salary: {
        allowNull: false,
        type: DataTypes.BIGINT(11),
      },
      imageDir: {
        type: DataTypes.STRING,
      },
      postingStatus: {
        allowNull: false,
        type: DataTypes.ENUM("DRAFT", "PUBLISH"),
        defaultValue: "DRAFT",
      },
      level: {
        allowNull: false,
        type: DataTypes.ENUM("Fresh Graduate", "Middle", "Senior", "Manager"),
      },
      batasPengiriman: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "jobLists",
    }
  );
  return jobLists;
};
