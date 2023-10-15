import React, { useEffect, useState } from "react";

import userApi from "../api/user";
import { Form, Input, Select } from "antd";

const UserForm = props => {
  const { userId, onUpdateData } = props;
  const [user, setUser] = useState({
    user_id: "",
    username: "",
    password: "",
    fullname: "",
    type: "",
    bank_accounts: ""
  })
  onUpdateData(user);
  const getUserById = async (userId) => {
    const { data: user } = await userApi.getUser(userId)
    return user;
  }

  const onChangeItem = (e) => {
    const name = e.target.id;
    const value = e.target.value;
    setUser(prevUser => {
      return { ...prevUser, [name]: value }
    })
  }

  const onChangeSelect = (value="user") => {
    setUser(prevUser => ({ ...prevUser, type: value }))
  }

  useEffect(() => {
    if (!userId) {
      return;
    }
    // get UserInfo
    getUserById(userId).then(user => setUser(user))
  }, [])

  return (
    <Form
      wrapperCol={{ span: 22 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      layout={"vertical"}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input username!",
          },
        ]}
        onChange={onChangeItem}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input password!",
          },
        ]}
        onChange={onChangeItem}
      >
        <Input.Password/>
      </Form.Item>

      <Form.Item
        label="Full Name"
        name="fullname"
        rules={[
          {
            required: false,
          },
        ]}
        onChange={onChangeItem}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        label="Bank Account"
        name="bank_accounts"
        rules={[
          {
            required: false,
          },
        ]}
        onChange={onChangeItem}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        label="Type"
        name="type"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select onChange={onChangeSelect}>
          <Select.Option value="user">User</Select.Option>
          <Select.Option value="admin">Admin</Select.Option>
        </Select>
      </Form.Item>

    </Form>
  )
}

export default UserForm;
