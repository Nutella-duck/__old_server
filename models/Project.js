"use strict";

module.exports = function (sequelize, DataTypes) {
  const Project = sequelize.define("project", {
    projectId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    decription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    lastmodification: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    createdtime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    projectname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Project;
};
