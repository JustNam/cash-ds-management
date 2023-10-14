import axios from "axios";

const axiosClient = axios.create({
  baseURL: "",
})


const listUsers = async (username, password) => {
  try {
    return axiosClient.post("/user/login", {
      username,
      password
    })
  } catch (e) {
    throw Error("Call API Login Fail")
  }
}

const getUser = async (username, password) => {
  try {
    return axiosClient.post("/user/login", {
      username,
      password
    })
  } catch (e) {
    throw Error("Call API Login Fail")
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


const create = async (username, password) => {
  try {
    return axiosClient.post("/user/login", {
      username,
      password
    })
  } catch (e) {
    throw Error("Call API Login Fail")
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

const remove = async (username, password) => {
  try {
    return axiosClient.post("/user/login", {
      username,
      password
    })
  } catch (e) {
    throw Error("Call API Login Fail")
  }
}
export default {
  login,
  create,
  getUser,
  listUsers,
  update,
  remove
}
