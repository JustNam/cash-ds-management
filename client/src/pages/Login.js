import React, { useState } from "react";
import { Button, Card, Col, Form, Input, Row } from "antd";

import userApi from "../api/user";
import { useAuth } from "../hooks/useAuth";

function LoginPage() {
  const [showErrLogin, setShowErrLogin] = useState(false)
  const { login } = useAuth();

  const onFinish = async (values) => {
    const { username, password } = values;
    const { data: user = {} } = await userApi.login(username, password);
    if (!user.token) {
      // show message
      setShowErrLogin(true);
      return;
    }
    if (user.user_type === "admin") {
      login(user, "/usersManagement")
      return;
    }
    login(user)
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row>
      <Col offset={1} span={20}>
        <Card title="Login Page">
          <Form
            name="basic"
            wrapperCol={{ span: 22 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout={"vertical"}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password/>
            </Form.Item>
            <span hidden={!showErrLogin}
                  style={{ color: "red" }}>Username or Password invalid! Please check it again!</span>
            <Form.Item
              wrapperCol={{
                offset: 4,
                span: 4,
              }}
            >
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}

export default LoginPage;
