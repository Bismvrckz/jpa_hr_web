"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class job_divisions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      job_divisions.hasMany(models.jobLists, {
        foreignKey: "job_divisions_id",
      });
    }
  }
  job_divisions.init(
    {
      job_divisions_id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        unique: true,
        type: DataTypes.BIGINT,
      },
      job_division_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      // summary: {
      //   type: DataTypes.STRING(500),
      //   allowNull: false,
      // },
      imageDir: {
        type: DataTypes.STRING,
        defaultValue: "imageResource/defaultJobDivision.jpg",
      },
      detail: {
        type: DataTypes.STRING,
      },
      postingStatus: {
        type: DataTypes.ENUM("PUBLISH", "DRAFT", "ARCHIVE"),
        defaultValue: "DRAFT",
      },
    },
    {
      sequelize,
      modelName: "job_divisions",
    }
  );
  return job_divisions;
};
