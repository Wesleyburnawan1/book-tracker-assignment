const jwt = require("jsonwebtoken");
const config = require("config");
module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Authorization denied due to missing token" });
  }
  try {
    const verified = jwt.verify(token, config.get("jwtSecret"));
    req.user = verified.user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};