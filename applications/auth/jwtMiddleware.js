const jwt = require("jsonwebtoken");
const cookie = require("cookie");

const jwtMiddleware = (req, res, next) => {
  console.log(req.headers.cookie);
  const token = cookie.parse(req.headers.cookie);
  console.log("token : " + token);

  if (!token) {
    console.log("토큰 없는경우");
    return next();
  }
  try {
    console.log("토큰 있는 경우 : " + token.access_token);
    const decoded = jwt.verify("j%3A%7B%7D", process.env.JWT_SECRET);
    console.log("decoded : " + decoded);

    return next();
  } catch (e) {
    return next();
  }
};

module.exports = jwtMiddleware;
