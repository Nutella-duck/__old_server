"use strict";

module.exports = function (sequelize, DataTypes) {
  const Project_Run = sequelize.define("project_run", {
    project_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    run_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
  });
    
  return Project_Run;
};
