"use strict";

module.exports = function (sequelize, DataTypes) {
  const Project = sequelize.define("project", {
    projectId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    projectname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Project;
};
