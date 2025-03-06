import { client } from "@/api";
import { BASE_URL } from "@/config/1";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, DatePicker, Divider, Form, Input, Modal, notification, Radio, Typography } from "antd";
import axios from "axios";
import dayjs from 'dayjs';
import { useState } from "react";
import { useNavigate } from "react-router-dom";



const Register = () => {
  const [visible, setVisible] = useState(true);

  const navigate = useNavigate()

  const openNotificationWithIcon = (type, msg) => {
    notification[type]({
      message: msg,
    });
  };

  const dateFormat = 'YYYY/MM/DD';

  const onFinish = (values) => {
    if (values.dob) {
      values.dob = dayjs(values.dob).format("YYYY/MM/DD"); // Định dạng ngày tháng
    }
    client.post('auth/register', values)
    .then(() => {
      openNotificationWithIcon('success', "Đăng ký thành công!!!")
      navigate("/")
    })
    .catch((err) => {
      openNotificationWithIcon('error',"Đăng ký thất bại!!!")
    })
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
          {/* <div style={{ width: 50, height: 50, borderRadius: "50%", background: "#ccc", margin: "auto" }} /> */}
          <Typography.Title level={3}>Register</Typography.Title>
        </div>

        <Divider></Divider>

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

          <Form.Item label="Your name" name="fullName" rules={[{ required: true, message: "Please enter your name" }]}>
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item label="Your phonenumber" name="phoneNumber" rules={[{ required: true, message: "Please enter your phonenumber!" }]}>
            <Input
              placeholder="Enter your phonenumber"
            />
          </Form.Item>

          <Form.Item label="Your date of birth" name="dob" rules={[{ required: true, message: "Please enter your dob!" }]}>
            <DatePicker
              format={dateFormat}
              // onChange={onChange}
            />
          </Form.Item>

          <Form.Item label="Your gender" name="gender" rules={[{ required: true, message: "Please enter your gender!" }]}>
            <Radio.Group
              value={""}
              options={[
                { value: "Nam", label: "Nam" },
                { value: "Nữ", label: "Nữ" },
              ]}
            />
          </Form.Item>

          <Button htmlType="submit" type="primary" block style={{ marginTop: 20 }}>Accept</Button>
          <Button type="link" block style={{ marginTop: 10 }}>Back</Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Register;
