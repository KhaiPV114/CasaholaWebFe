import { AuthContext } from "@/context/authContext";
import {
  BellOutlined,
  LogoutOutlined,
  OrderedListOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  Flex,
  Input,
  Layout,
  Menu,
  Space,
} from "antd";
import "antd/dist/reset.css";
import { useContext } from "react";
import { Link } from "react-router-dom";

const { Header } = Layout;

const packages = {
  NONE: <></>,
  GOLD: (
    <Button color="cyan" variant="outlined">
      GOLD
    </Button>
  ),
  PREMIUM: (
    <Button color="danger" variant="outlined">
      PREMIUM
    </Button>
  ),
};

export default function HeaderLayout() {
  const { user } = useContext(AuthContext);
  

  const profileMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link to={"/userinfo"}>Hồ sơ cá nhân</Link>
      </Menu.Item>
      {user?.role === "ADMIN" && (
        <Menu.Item key="adminpage" icon={<OrderedListOutlined />}>
          <Link to={"/admin"}>Admin Page</Link>
        </Menu.Item>
      )}
      <Menu.Item key="listcriteria" icon={<OrderedListOutlined />}>
        <Link to={"/updatecriteria"}>Sửa tiêu chí cá nhân</Link>
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} danger>
        <Link>Đăng xuất</Link>
      </Menu.Item>
    </Menu>
  );

  const notificationsMenu = (
    <Menu>
      <Menu.Item key="1">Bạn có thông báo mới</Menu.Item>
      <Menu.Item key="2">Cập nhật hệ thống</Menu.Item>
      <Menu.Item key="3">Tin nhắn từ admin</Menu.Item>
    </Menu>
  );

  return (
    <Header
      className="header"
      align="center"
      style={{ backgroundColor: "white", width: "100%" }}
    >
      <Flex justify="space-between" align="center" style={{ width: "100%" }}>
        <Space size="middle">
          <img
            src="/logof.png"
            alt="CasaHola Logo"
            style={{ height: "40px" }}
          />
          <Link to={"/"}>
            <span
              style={{ fontSize: "18px", fontWeight: "bold", color: "#ff6600" }}
            >
              CASAHOLA
            </span>
          </Link>
        </Space>
        <Input
          style={{
            width: "300px",
            borderRadius: "20px",
            background: "#f0f0f0",
          }}
          placeholder="Tìm kiếm..."
          prefix={<SearchOutlined style={{ color: "#ff6600" }} />}
        />
        <Space size="middle" align="center">
          {user?.packageType && packages[user.packageType]}
          {user && (
            <>
              <Dropdown overlay={notificationsMenu} trigger={["hover"]}>
                <Badge count={2}>
                  <BellOutlined
                    style={{
                      fontSize: "20px",
                      color: "#ff6600",
                      cursor: "pointer",
                    }}
                  />
                </Badge>
              </Dropdown>
              <Dropdown overlay={profileMenu} trigger={["hover"]}>
                <Avatar
                  size={32}
                  icon={<UserOutlined />}
                  src={user?.profileImage || "/default-avatar.jpg"} 
                  style={{ backgroundColor: "#d9d9d9", cursor: "pointer" }}
                />
              </Dropdown>
            </>
          )}

        </Space>
      </Flex>
    </Header>
  );
}
