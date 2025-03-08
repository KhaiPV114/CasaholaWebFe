import { client } from "@/api";
import { UseNotification } from "@/context/useNotification";
import { Button, Form, Input, Modal, Typography } from "antd";
import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [visible, setVisible] = useState(true);
  const { showNotification } = useContext(UseNotification);
  const navigate = useNavigate()

  const onFinish = (values) => {
    console.log("Forgot Password Request:", values);
    client
      .post("auth/forgot-password", values)
      .then(() => {
        showNotification("success", "Hãy kiểm tra email của bạn.");
      })
      .catch((err) => {
        showNotification("error", "Email của bạn không tồn tại!");
      });
  };

  return (
    <div
      style={{
        backgroundColor: "#FA6400",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
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
          <Form.Item
            label="Your email"
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Button
            htmlType="submit"
            type="primary"
            block
            style={{ marginTop: 20 }}
          >
            Send Reset Link
          </Button>
          <Button type="link" onClick={() => navigate("/login")} block style={{ marginTop: 10 }}>
            Back to Login
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default ForgotPassword;
