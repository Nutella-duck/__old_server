"use strict";

module.exports = function (sequelize, DataTypes) {
  const Project = sequelize.define("project", {
    project_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    project_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    api_key: {
      type: DataTypes.STRING,
    },
  });
    
  return Project;
};
