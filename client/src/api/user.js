import axios from "axios";
import { BASE_URL } from "./config";

const axiosClient = axios.create({
  baseURL: BASE_URL,
})


const listUsers = async () => {
  try {
    const { data } = await axiosClient.get("/user/list", {})
    return data
  } catch (e) {
    throw Error("Call API Login Fail")
  }
}

const getUser = async (userId) => {
  try {
    return axiosClient.get("/user", {
      params: {
        userId
      }
    })
  } catch (e) {
    throw Error("Call API getUser Fail")
  }
}

const login = async (username, password) => {
  try {
    return axiosClient.post("/user/login", {
      username,
      password
    })
  } catch (e) {
    throw Error("Call API Login Fail")
  }
}


const createOrUpdate = async ({ user_id, username, password, fullname, type, bank_accounts }) => {
  try {
    return axiosClient.post("/user", {
      user_id,
      username,
      password,
      fullname,
      type,
      bank_accounts
    })
  } catch (e) {
    throw Error("Call API Create Fail")
  }
}

const update = async (username, password) => {
  try {
    return axiosClient.post("/user/login", {
      username,
      password
    })
  } catch (e) {
    throw Error("Call API Login Fail")
  }
}

const remove = async (userId) => {
  try {
    return axiosClient.post("/user/delete", {
      user_id: userId
    })
  } catch (e) {
    throw Error("Call API remove Fail")
  }
}

const verifyToken = async (token) => {
  try {
    const { data } = await axiosClient.post("/user/tokenValid", {
      token
    })
    console.log(data)
    return data.isValid
  } catch (e) {
    throw Error("Call API remove Fail")
  }
}

export default {
  login,
  createOrUpdate,
  getUser,
  listUsers,
  update,
  remove,
  verifyToken
}
