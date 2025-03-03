import React, { useState } from "react";
import { Modal, Form, Input, Button, Divider, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const [visible, setVisible] = useState(true);
    const navigate = useNavigate();
    return (
        <div style={{ backgroundColor: "#FA6400", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Modal
                open={visible}
                onCancel={() => setVisible(false)}
                footer={null}
                centered
                maskClosable={false}
            >
                <div style={{ textAlign: "center", marginBottom: 20 }}>
                    <div style={{ width: 50, height: 50, borderRadius: "50%", background: "#ccc", margin: "auto" }} />
                    <Typography.Title level={2}>Reset Password</Typography.Title>
                    <Typography.Text >Enter your email to reset your password</Typography.Text>
                </div>

                <Form layout="vertical">
                    <Form.Item  name="email" rules={[{ required: true, message: "Please enter your email!" }]}>
                        <Input placeholder="Enter your email" />
                    </Form.Item>
                    <Form.Item style={{ textAlign: "right" }}>
                        <Button color="default" style={{
                            backgroundColor: "#d9d9d9",
                            borderColor: "#bfbfbf",
                            color: "#000000",
                            marginRight: 20,
                            fontSize: "16px",
                            padding: "20px 25px"
                        }}
                        onClick={() => navigate("/login")}
                        >Cancel</Button>
                        <Button type="primary" style={{
                            fontSize: "16px",
                            padding: "20px 20px"
                        }}>Search</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ResetPassword;
