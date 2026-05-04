const jwt = require("jsonwebtoken");

function authorization(req, res, next) {
  const authorization = req.headers.authorization;
  
  if (!authorization) {
    return res.status(401).json({
      message: "Bearer token not found",
    });
  }

  try {
    const bearer = authorization.split(" ")[0];
    const token = authorization.split(" ")[1];
    if (bearer !== "Bearer" || !token) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decode;

    next()
  } catch (error) {
    return res.status(401).json({
      message: error.message
    });
  }
}

module.exports = authorization;