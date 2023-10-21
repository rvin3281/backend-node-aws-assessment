const Admin = require("../model/adminModel");
const passwordUtil = require("../utils/passwordUtil");

exports.register = async (req, res, next) => {
  try {
    const data = await Admin.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(200).json({
      status: "user registered",
      data: data,
    });
  } catch (error) {
    res.statys(400).json({
      status: "fail",
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Admin.findOne({ where: { email: email } });

    if (
      !user ||
      !(await passwordUtil.comparePassword(password, user.password))
    ) {
      return res.status(400).json({
        message: "Incorrect Email or Password",
      });
    }

    return res.status(200).json({
      status: "Logged In",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Logged In",
      error: error,
    });
  }
};
