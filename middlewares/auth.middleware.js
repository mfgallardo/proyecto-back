const jwt = require("jsonwebtoken");

const users = require("../models/user.model");

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader)
    return res
      .status(403)
      .json({ auth: false, message: "No se proveyó un token" });

  // Bearer token

  const token = authHeader.split(" ")[1];

  if (!token)
    return res.status(403).json({ auth: false, message: "Malformed token" });

  jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
    if (error)
      return res
        .status(500)
        .json({ auth: false, message: "Failed to authenticate token" });

    const user = users.find((u) => u.id == decoded.id);
    if (!user) {
      return res.status(404).json({ error: "User nor found" });
    }

    console.log(decoded);
    req.userId = decoded.id;

    next();
  });
};
