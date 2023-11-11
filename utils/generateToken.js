const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "sms", { expiresIn: "5d" });
};
//when u connect with front-end jwt will keep in the local storage
module.exports = generateToken;
