import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Divider, Form, Input, Modal, notification, Typography } from "antd";
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "@/config/1";

const ChangePassword = () => {
  const [visible, setVisible] = useState(true);

  const openNotificationWithIcon = (type, msg) => {
    notification[type]({ message: msg });
  };

  const onFinish = (values) => {
    if (values.newPassword !== values.confirmPassword) {
      openNotificationWithIcon("error", "Passwords do not match!");
      return;
    }

    axios
      .post(`${BASE_URL}auth/change-password`, values)
      .then(() => openNotificationWithIcon("success", "Password changed successfully!"))
      .catch((err) => {
        console.log(err);
        openNotificationWithIcon("error", "Password change failed!");
      });
  };

  return (
    <div style={{ backgroundColor: "#FA6400", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Modal open={visible} onCancel={() => setVisible(false)} footer={null} centered maskClosable={false}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <Typography.Title level={3}>Change Password</Typography.Title>
        </div>

        <Divider />

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="New Password" name="newPassword" rules={[{ required: true, message: "Please enter your new password!" }]}>
            <Input.Password placeholder="Enter new password" iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
          </Form.Item>

          <Form.Item label="Confirm Password" name="confirmPassword" rules={[{ required: true, message: "Please confirm your password!" }]}>
            <Input.Password placeholder="Confirm password" iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
          </Form.Item>

          <Button htmlType="submit" type="primary" block style={{ marginTop: 20 }}>Change Password</Button>
          <Button type="link" block style={{ marginTop: 10 }}>Back</Button>
        </Form>
      </Modal>
    </div>
  );
};

export default ChangePassword;
