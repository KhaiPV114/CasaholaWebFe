import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Form, Input, Modal, notification, Typography } from "antd";
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "@/config/1";


const ForgotPassword = () => {
  const [visible, setVisible] = useState(true);

  const openNotificationWithIcon = (type, msg) => {
    notification[type]({
      message: msg,
    });
  };

  const onFinish = (values) => {
    console.log("Forgot Password Request:", values);
    axios
      .post(`${BASE_URL}auth/forgot-password`, values)
      .then(() => {
        openNotificationWithIcon("success", "Check your email for reset link!");
      })
      .catch((err) => {
        console.log(err);
        openNotificationWithIcon("error", "Email not found!");
      });
  };

  return (
    <div style={{ backgroundColor: "#FA6400", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Modal
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        centered
        maskClosable={false} // Prevent closing when clicking outside
      >
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <Typography.Title level={3}>Forgot Password</Typography.Title>
        </div>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Your email" name="email" rules={[{ required: true, message: "Please enter your email!" }]}>
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Button htmlType="submit" type="primary" block style={{ marginTop: 20 }}>Send Reset Link</Button>
          <Button type="link" block style={{ marginTop: 10 }}>Back to Login</Button>
        </Form>
      </Modal>
    </div>
  );
};

export default ForgotPassword;
