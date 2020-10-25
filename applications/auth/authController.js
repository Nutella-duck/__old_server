const knex = require("../../db/knex");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { param } = require("../../routes/runRoute");
const jwt = require("jsonwebtoken");
const NodeRsa = require("node-rsa"); // 대기
const key = new NodeRsa({ b: 512 }); // 대기
const publicKey = key.exportKey("pkcs1-public-pem"); //대기
const privateKey = key.exportKey("pkcs8-private-pem"); //대기
let token = "";
let authController = {};
//sha256, isms,
const setPassword = async (password) => {
  //sha256 하고 난후 bcrypt 를 해주는게 좋음.
  const passwordHash = await bcrypt.hash(password, 10);
  return passwordHash;
};

const checkpassword = async (password, dbPassword) => {
  const result = await bcrypt.compare(password, dbPassword);
  return result;
};

const generateToken = async (username) => {
  token = jwt.sign({ username: username }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const userExistsChecker = async (userName) => {
  return knex
    .select("userName")
    .from("user")
    .where({ userName: userName })
    .then((result) => {
      return result;
    });
};

const getUserPassword = async (userName) => {
  return knex
    .select("password")
    .from("user")
    .where({ userName: userName })
    .then((result) => {
      return result;
    });
};

const userSaveDatabase = (username, password) => {
  return knex
    .insert({ userName: username, password: password })
    .into("user")
    .then((result) => {
      return "created";
    });
};

authController.register = async (req, res) => {
  //회원가입.
  /*rsa 암호화(처음로그인할때 publicKey (특정주기별로 계속 변화) 를 받아가고 이것을 이용해 아이디  패스워드를 암호화)*/
  /*컨트롤러 핸들러  */
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().required(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    res.status(400).end("이메일 규정이 올바르지 않습니다.");
  }

  const { username, password } = req.body;

  try {
    const exists = await userExistsChecker(username);

    if (exists.length) {
      return res.status(400).end("유저가 존재합니다.");
    }

    const hashPassword = await setPassword(password);

    await userSaveDatabase(username, hashPassword);

    generateToken(username);
    res.cookie("access_token", token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
    return res.end("회원가입 완료");
  } catch (e) {
    res.status(400).end(e);
  }

  res.end("success");
};

authController.login = async (req, res) => {
  // 에러 발생 시 특정 코드를 정하는게 좋음.

  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).end("잘못된 아이디 및 비밀번호입니다.");
  }

  try {
    const user = await userExistsChecker(username);

    if (!user.length) {
      res.status(400).end("없는 유저입니다.");
    }
    const dbPassword = await getUserPassword(username);

    const valid = await checkpassword(password, dbPassword[0].password);

    if (!valid) {
      return res.status(400).end("비밀번호가 올바르지 않습니다.");
    }

    generateToken(username);

    res.cookie("access_token", token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
    res.end("로그인 완료");
  } catch (e) {
    res.status(400).end(e);
  }
};

authController.logout = async (req, res) => {
  res.cookie("access_token");
  res.end("로그아웃 완료");
};

module.exports = authController;
