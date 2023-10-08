import React, { Component } from 'react';
import { Menu, Sider } from 'antd';
import HomePage from './HomePage';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>      
      <Sider width={200} theme="light">
        <Menu mode="vertical" theme="light" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<FileAddOutlined />}>
            Transaction Processing
          </Menu.Item>
        </Menu>
      </Sider>
      <Route exact path="/" component={HomePage} />
      {/* Add more routes for other pages if needed */}
    </Router>
  );
}

export default App;
