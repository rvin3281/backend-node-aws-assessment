const { DataTypes } = require("sequelize");
const sequelize = require("./../database/database");
const passwordUtil = require("./../utils/passwordUtil");

const Admin = sequelize.define("Admin", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Name is Required",
      },
    },
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        msg: "Invalid Email Format",
      },
      notEmpty: {
        msg: "Name is Required",
      },
    },
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Password is Required",
      },
    },
  },
});

Admin.beforeCreate(async (user, option) => {
  user.password = await passwordUtil.hashpassword(user.password);
});

module.exports = Admin;
