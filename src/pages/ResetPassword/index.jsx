import { client } from "@/api";
import { NotificationContext } from "@/context/notificationContext";
import { Button, Form, Input, Modal, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { showNotification } = useContext(NotificationContext);

  useEffect(() => {
    client
      .get("auth/check-reset-password", {
        params: new URLSearchParams(location.search),
      })
      .then((res) => {
        if (!res.data) {
          navigate("/403");
        }
      })
      .catch(() => navigate("/403"));
  }, []);

  const onFinish = (values) => {
    const { password, password_ver } = values;
    if (password !== password_ver) {
      showNotification("error", "Mật khẩu xác thực không khớp.");
      return;
    }
    const param = new URLSearchParams(location.search);
    const resetToken = param.get("token");
    client
      .put("auth/reset-password", { password, resetToken })
      .then((res) => {
        if (res.data) {
          showNotification("success", "Thay đổi mật khẩu thành công!");
          navigate('/login')
        } else {
          showNotification("error", "Thay đổi mật khẩu thất bai!");
        }
      })
      .catch(() => navigate("/500"));
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
        maskClosable={false}
      >
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: "#ccc",
              margin: "auto",
            }}
          />
          <Typography.Title level={2}>Thay đổi mật khẩu</Typography.Title>
          <Typography.Text>Bạn hay thay đổi mật khẩu mới</Typography.Text>
        </div>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Hãy nhập mật khẩu!" }]}
          >
            <Input.Password placeholder="Nhập mật khẩu mới" />
          </Form.Item>
          <Form.Item
            name="password_ver"
            rules={[{ required: true, message: "Hãy nhập mật khẩu!" }]}
          >
            <Input.Password placeholder="Nhập mật khẩu confirm" />
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Button
              color="default"
              style={{
                backgroundColor: "#d9d9d9",
                borderColor: "#bfbfbf",
                color: "#000000",
                marginRight: 20,
                fontSize: "16px",
                padding: "20px 25px",
              }}
              onClick={() => navigate("/login")}
            >
              Đăng nhập
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                fontSize: "16px",
                padding: "20px 20px",
              }}
            >
              Đổi mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ResetPassword;
