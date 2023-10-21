const bcrypt = require("bcryptjs");

exports.hashpassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const encryptPassword = await bcrypt.hash(password, salt);
  return encryptPassword;
};

exports.comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
