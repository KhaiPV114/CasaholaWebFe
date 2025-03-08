import { BellOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Flex, Input, Layout, Space } from "antd";
import "antd/dist/reset.css";
import { useNavigate } from "react-router-dom";


const { Header } = Layout;

export default function HeaderLayout() {
    const navigate = useNavigate()
    return (
        <Header className="header" align="center" style={{ backgroundColor: "white", width:"100%" }} >
            <Flex justify="space-between" align="center" style={{ width: "100%" }}>
            <Space size="middle" onClick={() => navigate("/")}>
              <img src="/logof.png" alt="CasaHola Logo" style={{ height: "40px" , cursor: "pointer" }} />
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