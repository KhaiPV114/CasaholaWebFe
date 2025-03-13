import { client } from "@/api";
import { EyeInvisibleOutlined, EyeTwoTone, PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Divider, Form, Input, Modal, notification, Radio, Typography, Upload } from "antd";
import dayjs from 'dayjs';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [visible, setVisible] = useState(true);
  const [iconBase64, setIconBase64] = useState(null);
  const [profileBase64, setProfileBase64] = useState(null);

  const navigate = useNavigate();
  const dateFormat = 'YYYY/MM/DD';

  // Hiển thị thông báo
  const openNotificationWithIcon = (type, msg) => {
    notification[type]({ message: msg });
  };

  // Hàm chuyển đổi file ảnh sang base64
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log("Đọc file thành công:", reader.result);
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        console.error("Lỗi đọc file:", error);
        reject(error);
      };
    });
  };

  const handleUploadIcon = async ({ file }) => {
    if (!file) return;
    const base64 = await getBase64(file);
    setIconBase64(base64);
    console.log("Icon Base64 đã cập nhật:", base64);
  };
  
  const handleUploadProfile = async ({ file }) => {
    if (!file) return;
    const base64 = await getBase64(file);
    setProfileBase64(base64);
    console.log("Profile Base64 đã cập nhật:", base64);
  };
  
  const onFinish = (values) => {
    if (values.dob) {
      values.dob = dayjs(values.dob).format(dateFormat);
    }
  
    // Kiểm tra giá trị ảnh trước khi gửi
    console.log("Ảnh Icon trước khi gửi:", iconBase64);
    console.log("Ảnh Profile trước khi gửi:", profileBase64);
  
    const payload = {
      ...values,
      identificationImage: iconBase64,
      profileImage: profileBase64,
    };
  
    console.log("Dữ liệu gửi đi:", payload);
    
    client.post('auth/register', payload)
      .then(() => {
        openNotificationWithIcon('success', "Đăng ký thành công!!!");
        navigate("/login");
      })
      .catch(() => {
        openNotificationWithIcon('error', "Email đã tồn tại!!!");
      });
  };
  
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
          <Typography.Title level={3}>Register</Typography.Title>
        </div>
        <Divider />

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Your email" name="email" rules={[
            { required: true, message: "Please enter your email!" },
            { type: "email", message: "Invalid email format!" }
          ]}>
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

          <Form.Item label="Your phone number" name="phoneNumber" rules={[{ required: true, message: "Please enter your phone number!" }]}>
            <Input placeholder="Enter your phone number" />
          </Form.Item>

          <Form.Item label="Your date of birth" name="dob" rules={[{ required: true, message: "Please enter your dob!" }]}>
            <DatePicker format={dateFormat} />
          </Form.Item>

          <Form.Item label="Your gender" name="gender" rules={[{ required: true, message: "Please enter your gender!" }]}>
            <Radio.Group
              options={[
                { value: "Nam", label: "Nam" },
                { value: "Nữ", label: "Nữ" },
              ]}
            />
          </Form.Item>

          {/* Upload Ảnh Icon */}
          <Form.Item label="Upload Ảnh Icon" rules={[{ required: true, message: "Please upload an image!" }]}>
            <Upload
              listType="picture-card"
              beforeUpload={() => false} // Ngăn upload tự động
              showUploadList={false}
              onChange={handleUploadIcon}
            >
              {iconBase64 ? (
                <img src={iconBase64} alt="icon" style={{ width: "100%", height:"100%" }} />
              ) : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Ảnh Icon</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          {/* Upload Ảnh Profile */}
          <Form.Item label="Upload Ảnh Profile" rules={[{ required: true, message: "Please upload an image!" }]}>
            <Upload
              listType="picture-card"
              beforeUpload={() => false}
              showUploadList={false}
              onChange={handleUploadProfile} // Dùng customRequest để xử lý ảnh
            >
              {profileBase64 ? (
                <img src={profileBase64} alt="profile"style={{ width: "100%", height:"100%" }}/>
              ) : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Ảnh Profile</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          <Button htmlType="submit" type="primary" block style={{ marginTop: 20 }}>
            Accept
          </Button>
          <Button type="link" block style={{ marginTop: 10 }} onClick={navigate("/login")}>
            Back
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Register;
