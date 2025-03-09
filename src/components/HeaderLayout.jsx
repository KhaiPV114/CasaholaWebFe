import React, { useContext } from "react";
import { Layout, Input, Space, Flex, Avatar, Badge, Dropdown, Menu } from "antd";
import { BellOutlined, UserOutlined, SearchOutlined, LogoutOutlined, OrderedListOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import { AuthContext } from "@/context/authContext";
import { Link } from "react-router-dom";

const { Header } = Layout;

export default function HeaderLayout() {
  const { user } = useContext(AuthContext);

  // Menu cho Avatar (Hồ sơ cá nhân & Đăng xuất)
  const profileMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link to={"/userinfo"}>
          Hồ sơ cá nhân
        </Link>
      </Menu.Item>
      <Menu.Item key="listcriteria" icon={<OrderedListOutlined />} >
        <Link to={"/yourpreference"}>
          Sửa tiêu chí cá nhân
        </Link>
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} danger>
        <Link>
          Đăng xuất
        </Link>
      </Menu.Item>
    </Menu>
  );

  // Menu cho Thông báo
  const notificationsMenu = (
    <Menu>
      <Menu.Item key="1">Bạn có thông báo mới</Menu.Item>
      <Menu.Item key="2">Cập nhật hệ thống</Menu.Item>
      <Menu.Item key="3">Tin nhắn từ admin</Menu.Item>
    </Menu>
  );

  return (
    <Header className="header" align="center" style={{ backgroundColor: "white", width: "100%" }}>
      <Flex justify="space-between" align="center" style={{ width: "100%" }}>
        <Space size="middle">
          <img src="/logof.png" alt="CasaHola Logo" style={{ height: "40px" }} />
          <Link to={"/"}>
            <span style={{ fontSize: "18px", fontWeight: "bold", color: "#ff6600" }}>CASAHOLA</span>
          </Link>
        </Space>
        <Input
          style={{ width: "300px", borderRadius: "20px", background: "#f0f0f0" }}
          placeholder="Tìm kiếm..."
          prefix={<SearchOutlined style={{ color: "#ff6600" }} />}
        />
        <Space size="middle" align="center">
          <Dropdown overlay={notificationsMenu} trigger={["hover"]}>
            <Badge count={2}>
              <BellOutlined style={{ fontSize: "20px", color: "#ff6600", cursor: "pointer" }} />
            </Badge>
          </Dropdown>
          <Dropdown overlay={profileMenu} trigger={["hover"]}>
            <Avatar size={32} icon={<UserOutlined />} style={{ backgroundColor: "#d9d9d9", cursor: "pointer" }} />
          </Dropdown>
        </Space>
      </Flex>
    </Header>
  );
}
