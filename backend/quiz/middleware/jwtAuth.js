const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

const jwtAuth = () => {
  try {
    return async (req, res, next) => {
      // const authorization = req.headers.authorization;

      const token = req.cookies.token;

      if (!token) {
        return res.status(401).json({ status: "Failed", error: "Unauthorized" });
      }
      next();
      // jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      //   if (err) {
      //     return res.status(401).json({ status: "Failed", error: "Invalid token" });
      //   }
      //   req.jwt = decoded;
      //   next();
      // });
    };
  } catch (err) {
    return res.status(err.code).json({
      status: "Failed",
      message: err.message,
    });
  }
};

module.exports = jwtAuth;