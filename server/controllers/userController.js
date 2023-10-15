const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");

const UserModel = db.User;

const listUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll();
    return res.status(200).json(users)
  } catch (e) {
    res.status(500).json({ message: "Server Error!" })
  }
}

const get = async (req, res) => {
  try {
    const { user_id } = req.query;
    if (!user_id) {
      return res.status(400).json({ message: "user_id params is required!" })
    }
    const existedUser = await UserModel.findByPk(user_id);
    if (!existedUser) {
      return res.status(200).json([])
    }
    return res.status(200).json(existedUser)
  } catch (e) {
    res.status(500).json({ message: "Server Error!" })
  }
}

const del = async (req, res) => {
  try {
    const { user_id } = req.body;
    if (!user_id) {
      return res.status(400).json({ message: "user_id params is required!" })
    }
    const affectedRows = await UserModel.destroy({
      where: {
        user_id
      },
    });
    return res.status(200).json({ affectedRows })
  } catch (e) {
    res.status(500).json({ message: "Server Error!" })
  }
}

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
    const userInfo = { username, user_id: user.user_id, user_type: user.type, token };
    return res.status(200).json(userInfo)
  } catch (ex) {
    console.log(ex)
    res.status(500).json(ex)
  }
}

const upsert = async (req, res) => {
  try {
    const { user_id = "", username, password, bankAccount, fullname = "", type = "user" } = req.body;
    if (!username && !password) {
      return res.status(400).json({ message: "usename and password is required" })
    }
    const existedUser = await UserModel.findByPk(user_id);
    const passHash = await bcrypt.hash(password, 10);
    let user = null;

    if (existedUser) {
      const { affectedRows: Users } = await UserModel.update({
        username,
        password: passHash,
        fullname: fullname,
        bank_accounts: bankAccount,
        type
      }, {
        where: {
          user_id
        }
      });
      user = Users[0];
    } else {
      user = await UserModel.create({
        username,
        password: passHash,
        fullname: fullname,
        bank_accounts: bankAccount,
        type
      });
    }
    user.password = "******"
    return res.status(200).json(user)
  } catch
    (e) {
    console.error(e)
    return res.status(500).json("Cant create user")
  }
}

const tokenValid = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) throw "Dont have token";
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {}, null);
    return res.status(200).json({ isValid: true })
  } catch (ex) {
    res.status(200).json({ isValid: false })
  }
}


module.exports = {
  login,
  get,
  upsert,
  del,
  listUsers,
  tokenValid
}
