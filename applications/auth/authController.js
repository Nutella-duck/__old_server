const knex = require("../../db/knex");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { param } = require("../../routes/runRoute");

let authController = {};

const setPassword = async (password) => {
  const passwordHash = await bcrypt.hash(password, 10);
  return passwordHash;
};

const checkpassword = async (password, dbPassword) => {
  const result = await bcrypt.compare(password, dbPassword);
  return result;
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

const userSaveDatabase = (username, password) => {
  return knex
    .insert({ userName: username, password: password })
    .into("user")
    .then((result) => {
      return "created";
    });
};

authController.register = async (req, res) => {
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().required(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    res.status(400).send("이메일 규정이 올바르지 않습니다.");
  }

  const { username, password } = req.body;

  try {
    const exists = await userExistsChecker(username);

    if (exists.length) {
      return res.status(400).send("유저가 존재합니다.");
    }

    const hashPassword = await setPassword(password);

    await userSaveDatabase(username, hashPassword);

    return res.send("success");
  } catch (e) {
    res.status(400).send(e);
  }

  res.end("success");
};

module.exports = authController;
