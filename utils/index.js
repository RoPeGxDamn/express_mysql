const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateAccessToken = (user) =>
  jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: "1800s" });

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
      if (err) return res.sendStatus(403);
      const checkUser = await User.findOne({ where: { name: user?.username } });
      if (checkUser?.status == "Blocked" || !checkUser)
        return res.sendStatus(401);
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  generateAccessToken,
  authenticateToken,
};
