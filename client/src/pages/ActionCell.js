import React, {useState} from "react";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {Button, Space, Modal} from "antd";

import userApi from "../api/user";

const ActionCell = props => {
  const userId = props;
  const [openRemove, setOpenRemove] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const showModalRemove = () => {
    setOpenRemove(true);
  };
  const showModalEdit = () => {
    setOpenRemove(true);
  };

  const handleRemove = () => {
    setConfirmDelete(true);
    setTimeout(() => {
      setOpenRemove(false);
      setConfirmDelete(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpenRemove(false);
  };
  const removeUser = async () => {

  }
  return (
    <>
      <Space>
        <Button type="primary" icon={<EditOutlined/>} />
        <Button type="primary" danger icon={<DeleteOutlined/>} onClick={showModalRemove}/>
      </Space>
      <Modal
        title="Delete User"
        okText={"Remove"}
        open={openRemove}
        onOk={handleRemove}
        confirmLoading={confirmDelete}
        onCancel={handleCancel}
      >
        <p>{"Ban chac chan xoa user nay"}</p>
      </Modal>
    </>

  )
}
export default ActionCell;
