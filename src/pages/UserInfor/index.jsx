import React from "react";
import { Form, Input, Select, Button, Upload, Row, Col, Avatar, DatePicker } from "antd";
import { SaveOutlined, LeftOutlined, HomeOutlined, UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const UserEditForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Updated user data:", values);
  };

  return (
    <div style={{
      maxWidth: 1200,
      margin: "40px auto",
      padding: 40,
      textAlign: "center",
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)",
    }}>
      <h2 style={{ color: "#F95B01", fontSize: "24px", fontWeight: "bold", marginBottom: 20 }}>Cập Nhật Thông Tin</h2>
      <Row gutter={24} align="middle">
        <Col span={8} style={{ textAlign: "center" }}>
          <Avatar size={150} src="/path/to/profile-image.jpg" />
          <p style={{ fontWeight: "bold", marginTop: 10 }}>Ảnh Đại diện</p>
          <p>Email: user@example.com</p>
          <p>Họ và tên: Nguyễn Văn A</p>
          <p>Vai trò: Admin</p>
          <p>Ngày sinh: 01/01/1990</p>
          <p>Giới tính: Nam</p>
        </Col>
        <Col span={16}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Row gutter={16}>
              {["Email", "FullName"].map((field) => (
                <Col span={12} key={field}>
                  <Form.Item label={<span style={{ fontWeight: "bold" }}>{field}</span>} name={field}>
                    <Input type="text" placeholder={field} style={{ borderRadius: 8 }} />
                  </Form.Item>
                </Col>
              ))}
              <Col span={12}>
                <Form.Item label={<span style={{ fontWeight: "bold" }}>Ngày sinh</span>} name="Dob">
                  <DatePicker style={{ width: "100%", borderRadius: 8 }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={<span style={{ fontWeight: "bold" }}>Giới tính</span>} name="Gender">
                  <Select placeholder="Chọn một tùy chọn" style={{ width: "100%", borderRadius: 8 }}>
                    <Option value="male">Nam</Option>
                    <Option value="female">Nữ</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={<span style={{ fontWeight: "bold" }}>Tính cách</span>} name="CharacteristicId">
                  <Input disabled style={{ width: "100%", borderRadius: 8 }} value="Tính cách của user" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={<span style={{ fontWeight: "bold" }}>Gói đăng ký</span>} name="PackageId">
                  <Input disabled style={{ width: "100%", borderRadius: 8 }} value="Gói hiện tại" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={<span style={{ fontWeight: "bold" }}>Ảnh CMND</span>} name="IdentificationImage">
                  <Upload>
                    <Button icon={<UploadOutlined />}>Tải lên</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={<span style={{ fontWeight: "bold" }}>Ảnh Đại diện</span>} name="ProfileImage">
                  <Upload>
                    <Button icon={<UploadOutlined />}>Tải lên</Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
            <div style={{
              marginTop: 40,
              display: "flex",
              justifyContent: "center",
              gap: "16px",
            }}>
              <Button type="primary" icon={<SaveOutlined />} htmlType="submit" style={{
                background: "#FFA401",
                borderColor: "#FFA401",
                fontSize: "16px",
                padding: "8px 20px",
                borderRadius: 8,
              }}>Lưu</Button>
              <Button icon={<LeftOutlined />} style={{
                background: "#FFA401",
                borderColor: "#FFA401",
                color: "white",
                fontSize: "16px",
                padding: "8px 20px",
                borderRadius: 8,
              }}>Quay lại</Button>
              <Button icon={<HomeOutlined />} style={{
                background: "#F95B01",
                borderColor: "#F95B01",
                color: "white",
                fontSize: "16px",
                padding: "8px 20px",
                borderRadius: 8,
              }}>Trang chủ</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default UserEditForm;
