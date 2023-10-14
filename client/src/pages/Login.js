import React from "react";
import {Button, Card, Col, Form, Input, Row} from "antd";

import userApi from "../api/user"

function LoginPage() {
  const onFinish = async (values) => {
    const {username, password} = values;
    const loginResponse = await userApi.login(username, password)
    if (!loginResponse.token){
      // show message
    }

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
            wrapperCol={{span: 22}}
            style={{maxWidth: 600}}
            initialValues={{remember: true}}
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
