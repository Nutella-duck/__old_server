"use strict";

module.exports = function (sequelize, DataTypes) {
  const Project = sequelize.define("project", {
    project_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    projectName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    privacy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    created_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    api_key: {
      type: DataTypes.STRING,
    },
  });

  return Project;
};
