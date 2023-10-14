const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");

const UserModel = db.User;

const login = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await UserModel.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: "Username not register!" })
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Password Wrong!" })
    }
    const token = jwt.sign({
      username,
      user_id: user.user_id
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "4h" }, null);
    const userInfo = { username, user_id: user.user_id, token };
    return res.status(200).json(userInfo)
  } catch (ex) {
    console.log(ex)
    res.status(500).json(ex)
  }
}

const create = async (req, res) => {
  try {
    const { username, password, fullName, bankAccount, type = "user" } = req.body;
    if (!username && !password) {
      return res.status(400).json({ message: "usename and password is required" })
    }
    const passHash = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      username,
      password: passHash,
      fullname: fullName,
      bank_accounts: bankAccount,
      type
    });
    newUser.password = "******"
    return res.status(200).json(newUser)
  } catch (e) {
    console.error(e)
    return res.status(500).json("Cant create user")
  }
}


module.exports = {
  login,
  create
}
