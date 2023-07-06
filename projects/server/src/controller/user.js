const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const db = require("../../models");
const { User } = require("../../models");

const register = async (req, res) => {
  try {
    const {
      username,
      email,
      phone,
      store_name,
      image_profile,
      password,
      confirmPassword,
    } = req.body;

    if (password !== confirmPassword)
      return res.status(400).json({
        ok: false,
        message: "password and confirm password have to match",
      });
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const isEmailExist = await User.findOne({ where: { email } });
    const isUsernameExist = await User.findOne({ where: { username } });
    const isPhoneExist = await User.findOne({ where: { phone } });
    const isStoreExist = await User.findOne({ where: { store_name } });

    if (isUsernameExist) {
      return res.status(409).json({
        ok: false,
        message: "username already used",
      });
    }

    if (isEmailExist) {
      return res.status(409).json({
        ok: false,
        message: "email already used",
      });
    }

    if (isPhoneExist) {
      return res.status(409).json({
        ok: false,
        message: "phone already used",
      });
    }

    if (isStoreExist) {
      return res.status(409).json({
        ok: false,
        message: "store name already used",
      });
    }

    await User.create({
      username: username,
      email: email,
      phone: phone,
      store_name: store_name,
      image_profile: image_profile,
      password: hashPassword,
    });

    const data = await User.findOne({
      where: { email: email, username: username },
    });

    if (!data) {
      return res.status(400).json({
        ok: false,
        message: "register failed",
      });
    }
    res.status(201).json({
      ok: true,
      message: "congrats! register successful",
      data,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      message: "something bad happen",
    });
  }
};

const login = async (req, res) => {
  try {
    const { user_identification, password } = req.body;
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email: user_identification },
          { phone: user_identification },
          { username: user_identification },
        ],
      },
    });

    if (!user) {
      return res.status(401).json({
        ok: false,
        message: "user unauthorized",
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({
        ok: false,
        message: "wrong password",
      });
    }

    const userId = user.id;
    const username = user.username;
    const email = user.email;

    const accessToken = jwt.sign(
      { userId, username, email },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      ok: true,
      message: "welcome to your blog",
      isAccountExist: user,
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      ok: false,
      message: "Account not found",
    });
  }
};

const getUserInformation = async (req, res) => {
  const user = req.user;
  try {
    const result = await User.findOne({ where: { id: user.userId } });
    res.json({
      ok: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  getUserInformation,
};
