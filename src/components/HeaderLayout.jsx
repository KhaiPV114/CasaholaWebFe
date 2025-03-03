import React, { useContext } from "react";
import { Layout, Input, Space, Flex, Avatar, Badge } from "antd";
import { BellOutlined, UserOutlined, SearchOutlined, LoginOutlined } from "@ant-design/icons"
import "antd/dist/reset.css";
import { AuthContext } from "@/context/useContext";


const { Header } = Layout

export default function HeaderLayout() {
  const {user} = useContext(AuthContext)

    return (
        <Header className="header" align="center" style={{ backgroundColor: "white", width:"100%" }} >
            <Flex justify="space-between" align="center" style={{ width: "100%" }}>
            <Space size="middle">
              <img src="/logof.png" alt="CasaHola Logo" style={{ height: "40px" }} />
              <span style={{ fontSize: "18px", fontWeight: "bold", color: "#ff6600" }}>CASAHOLA</span>
            </Space>
            <Input style={{ width: '300px', borderRadius: '20px', background: '#f0f0f0' }} placeholder="Tìm kiếm..." prefix={<SearchOutlined style={{ color: '#ff6600' }} />} />
            <Space size="middle" align="center">
              <Badge count={2}>
                <BellOutlined style={{ fontSize: "20px", color: "#ff6600", cursor: "pointer" }} />
              </Badge>
              <Avatar size={32} icon={<UserOutlined />} style={{ backgroundColor: "#d9d9d9", cursor: "pointer" }} />
            </Space>
          </Flex>
        </Header>
    );
}