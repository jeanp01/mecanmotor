const User = require("../models/User.js");
const { DataTypes } = require("sequelize");
const sequelize = require("../conection");

const Repair = sequelize.define("Repair", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  motorsNumber: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "completed", "cancelled"),
    allowNull: false,
    defaultValue: "pending",
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Repair.belongsTo(User, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  as: "user",
});

module.exports = Repair;
