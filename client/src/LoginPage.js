import React, { useState } from 'react';
import { Layout, Button, Col, Input } from 'antd';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const navigateToHomePage = () => navigate('/home');

    function login() {
        axios
            .post('http://localhost:8888/login', { username: username, password: password })
            .then((response) => {
                console.log(response.data);
                if (response.data.success) {
                    navigateToHomePage()
                    console.log('Login success');
                } else {
                    alert('Wrong username or password')
                }
            })
            .catch((error) => {
                alert("Fail");
                console.error('Login error:', error);
                alert(error);
            });
    }

    function handleChangeUsername(event) {
        setUsername(event.target.value);
    }

    function handleChangePassword(event) {
        setPassword(event.target.value);
    }

    return (
        <Layout>
            <div
                style={{
                    background: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%"
                }}
            >
                <Col style={{
                    alignItems: "center",
                    textAlign: "center",
                    verticalAlign: "center",
                    justifyContent: "center"
                }}>
                    <h1>Welcome</h1>

                    <Input style={{ marginTop: "20px", marginBottom: "20px" }} placeholder="Username" value={username} onChange={handleChangeUsername} />
                    <Input.Password style={{ marginBottom: "20px" }} placeholder="Password" value={password} onChange={handleChangePassword} />
                    <Button type="primary" onClick={login}>Login</Button>
                </Col>


            </div>
        </Layout>
    );
}

export default LoginPage;