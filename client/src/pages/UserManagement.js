import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Popconfirm, Table } from "antd";
import ActionCell from "./ActionCell";
import { PlusOutlined } from "@ant-design/icons";

const columns = [
  {
    title: "UserName",
    width: 100,
    dataIndex: "name",
    key: "name",
    fixed: "left",
  },
  {
    title: "Name",
    width: 100,
    dataIndex: "age",
    key: "age",
    fixed: "left",
  },
  {
    title: "Age",
    dataIndex: "address",
    key: "1",
    width: 150,
  },
  {
    title: "BankAccount",
    dataIndex: "address",
    key: "2",
    width: 150,
  },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 40,
    render: () => <ActionCell/>,
  },
];
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
const UserManagement = () => {
  return (
    <>
      <h1>Manage User Page</h1>
      <div style={{display: "flex", justifyContent: "flex-end"}}>
        <Button type="primary" icon={<PlusOutlined/>}>Add User</Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{
          x: 1500,
          y: 500,
        }}
      />
    </>
  );
}
export default UserManagement;
