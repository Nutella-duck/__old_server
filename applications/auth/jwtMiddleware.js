const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const cookieParser = require("cookie-parser");

const getToken = (cookie) => {
  let idx = cookie.indexOf("=");
  return cookie.substring(idx + 1, cookie.length);
};
const jwtMiddleware = (req, res, next) => {
  const token = getToken(req.headers.cookie);
  console.log(token);
  if (!token) {
    console.log("토큰 없는경우");
    return next();
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded : " + decoded.username);
    const user = decoded.username;
    if (!user) {
      res.status(400).end("로그인 중이 아닙니다.");
    }

    return next();
  } catch (e) {
    console.log(e);
    return next();
  }
};

module.exports = jwtMiddleware;
