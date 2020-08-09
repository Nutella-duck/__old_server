"use strict";

module.exports = function (sequelize, DataTypes) {
  const Runs = sequelize.define("runs", {
    modelID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    modelName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },    
    // createdTime: {
    //     type: DataTypes.DATE,
    //     defaultValue: DataTypes.NOW,
    //     allowNull: false,
    //   },
    projectname: {
      type: DataTypes.STRING,
      allowNull: false,
    //   ref: 'Project'
    },
  });

  return Runs;
};
