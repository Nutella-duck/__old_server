"use strict";

module.exports = function (sequelize, DataTypes) {
  const Run = sequelize.define("run", {
    run_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    run_name: {
        type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_by: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
    run_time: {
      type: DataTypes.INTEGER,
      allowNull: true, 
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
    },
  });

  return Run;
};
