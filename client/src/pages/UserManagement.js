import React, { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Modal, Popconfirm, Table } from "antd";
import ActionCell from "./ActionCell";
import { PlusOutlined } from "@ant-design/icons";
import userApi from "../api/user";
import UserForm from "./UserForm";

const columns = [
  {
    title: "UserName",
    width: 100,
    dataIndex: "username",
    key: "name",
    fixed: "left",
  },
  {
    title: "Name",
    width: 100,
    dataIndex: "fullname",
    key: "age",
    fixed: "left",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "2",
    width: 150,
  },
  {
    title: "BankAccount",
    dataIndex: "bank_accounts",
    key: "2",
    width: 150,
  }
];

const UserManagement = () => {
  const [listUser, setListUser] = useState([])

  const [openCreateUser, setOpenCreateUser] = useState(false);
  const [confirmCreateUser, setConfirmCreateUser] = useState(false);

  const [user, setUser] = useState({})

  const onUpdateUser = (user) => {
    setUser(user)
  }

  const handleCreateUser = async () => {
    const { username, password, type } = user;
    // @todo show message
    if (!username || !password || !type) {
      return;
    }
    // call API createUser
    try {
      setConfirmCreateUser(true);
      const userCreated = await userApi.createOrUpdate({ ...user });
    } catch (e) {

    } finally {
      setOpenCreateUser(false);
      setConfirmCreateUser(false)
      onRefreshTable()
    }
  }

  const openModalCreateUser = () => {
    setOpenCreateUser(true)
  }

  const handleCancel = () => {
    setOpenCreateUser(false)
  }

  const getListUser = async () => {
    const users = await userApi.listUsers();
    console.log({ users })
    return users
  }

  const onRefreshTable = () => {
    getListUser().then(users => {
      const dataTable = users.map(user => ({
        key: user.user_id,
        user_id: user.user_id,
        username: user.username,
        fullname: user.fullname,
        bank_accounts: user.bank_accounts,
        type: user.type,
      }))
      setListUser(dataTable)
    });
  }

  useEffect(() => {
    getListUser().then(users => {
      const dataTable = users.map(user => ({
        key: user.user_id,
        user_id: user.user_id,
        username: user.username,
        fullname: user.fullname,
        bank_accounts: user.bank_accounts,
        type: user.type,
      }))
      setListUser(dataTable)
    });
  }, [])


  return (
    <>
      <h1>Manage User Page</h1>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="primary" icon={<PlusOutlined/>} onClick={openModalCreateUser}>Add User</Button>
      </div>
      <Table
        columns={[...columns, {
          title: "Action",
          key: "operation",
          fixed: "right",
          width: 40,
          render: (record) => <ActionCell userId={record.user_id} onRefreshData={onRefreshTable}/>,
        },]}
        dataSource={listUser}
        scroll={{
          x: 1500,
          y: 500,
        }}
      />
      <Modal
        title="Create User"
        okText={"Create"}
        open={openCreateUser}
        onOk={handleCreateUser}
        confirmLoading={confirmCreateUser}
        onCancel={handleCancel}
      >
        <UserForm onUpdateData={onUpdateUser}/>
      </Modal>
    </>
  );
}
export default UserManagement;
