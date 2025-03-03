import { BASE_URL } from "@/config/1";
import { AuthContext } from "@/context/useContext";
import { EyeInvisibleOutlined, EyeTwoTone, GoogleOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, Modal, Typography, notification } from "antd";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [visible, setVisible] = useState(true);
  const {signIn} = useContext(AuthContext) 

  const navigate = useNavigate()

  const openNotificationWithIcon = (type, msg) => {
    notification[type]({
      message: msg,
    });
  };

  const onFinish = (values) => {
    console.log("ok", values);
    
    axios.post(`${BASE_URL}auth/login/local`,values)
    .then((res) => {
      const {user, accessToken, refreshToken} = res.data;
      signIn(user, accessToken, refreshToken);
      openNotificationWithIcon('success', "Login successful!")
      navigate("/yourpreference")
    })
    .catch((err) => {
      openNotificationWithIcon('error', "err")
    })
  }
  return (
    <div style={{ backgroundColor: "#FA6400", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Modal
        open={visible}
        onCancel={() => navigate("/")}
        footer={null}
        centered
        maskClosable={false} // Prevent closing when clicking outside
      >
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ width: 50, height: 50, borderRadius: "50%", background: "#ccc", margin: "auto" }} />
          <Typography.Title level={3}>Log in</Typography.Title>
          <Typography.Text>Don't have an account? <a href="#">Sign up</a></Typography.Text>
        </div>

        <Button block icon={<GoogleOutlined />} style={{ marginBottom: 10 }}>
          Log in with Google
        </Button>
        
        <Divider>OR</Divider>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Your email" name="email" rules={[{ required: true, message: "Please enter your email!" }]}>
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item label="Your password" name="password" rules={[{ required: true, message: "Please enter your password!" }]}>
            <Input.Password
              placeholder="Enter your password"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>

          <Typography.Text style={{ float: "right" }}>
            <a href="/reset-password">Forget your password?</a>
          </Typography.Text>

          <Button htmlType="submit" type="primary" block style={{ marginTop: 20 }}>Log in</Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Login;
