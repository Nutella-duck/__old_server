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
      allowNull: true, //change later 
    },
    created_by: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
    run_time: {
      type: DataTypes.INTEGER,
      allowNull: true, 
    },
    // created_time: {
    //   type: DataTypes.DATE,
    //   defaultValue: DataTypes.NOW,
    //   allowNull: false,
    // },
  });

  return Run;
};
