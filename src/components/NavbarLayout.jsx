import { AuthContext } from "@/context/authContext";
import { NotificationContext } from "@/context/notificationContext";
import {
  BarChartOutlined,
  FileSearchOutlined,
  HeartOutlined,
  HomeOutlined,
  LikeOutlined,
  LoginOutlined,
  LogoutOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Button, Menu, Modal } from "antd";
import Sider from "antd/es/layout/Sider";
import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Badge } from "antd";

const NavbarLayout = () => {
  const [collapsed, setCollapsed] = useState(true);
  const { user, signOut, chats } = useContext(AuthContext);
  const [isLogined, setIsLogined] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const { showNotification } = useContext(NotificationContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setIsLogined(true);
    } else {
      setIsLogined(false);
    }
  }, [user, chats]);

  const handlerSignOut = () => {
    signOut();
    setIsLogined(false);
    setIsLogout(false);
    showNotification("success", "Đăng xuất thành công!!!");
    navigate("/");
  };

  return (
    <>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        onMouseEnter={() => setCollapsed(false)}
        onMouseLeave={() => setCollapsed(true)}
        style={{
          background: "#d9d9d9",
          transition: "width 0.3s",
          width: collapsed ? "80px" : "200px",
          zIndex: 1000,
        }}
      >
        <Menu
          mode="vertical"
          className="side-menu"
          style={{
            background: "#d9d9d9",
            width: collapsed ? "80px" : "200px",
            height: "100%",
            transition: "width 0.3s",
          }}
        >
          <Menu.Item key="home" icon={<HomeOutlined />}>
            <NavLink to="/">{!collapsed && "Trang chủ"}</NavLink>
          </Menu.Item>
          <Menu.Item key="test" icon={<BarChartOutlined />}>
            <NavLink to="/testcharacter">
              {!collapsed && "Test tính cách"}
            </NavLink>
          </Menu.Item>
          <Menu.Item key="match" icon={<FileSearchOutlined />}>
            <NavLink to="/roompreference">
              {!collapsed && "Tìm bạn ở ghép"}
            </NavLink>
          </Menu.Item>
          <Menu.Item
            key="messages"
            icon={
              <Badge count={chats} size="small">
                <MessageOutlined />
              </Badge>
            }
          >
            <NavLink to="/chatroom">{!collapsed && "Tin nhắn"}</NavLink>
          </Menu.Item>
          <Menu.Item key="like" icon={<LikeOutlined />}>
            <NavLink to="/userlikemelist">
              {!collapsed && "Danh sách thích"}
            </NavLink>
          </Menu.Item>
          <Menu.Item key="wait" icon={<HeartOutlined />}>
            <NavLink to="/usermatchedlist">
              {!collapsed && "Danh sách chờ"}
            </NavLink>
          </Menu.Item>
          {/* <Menu.Item key="data" icon={<DatabaseOutlined />}>
                    <NavLink to="/updatecriteria">{!collapsed && "Dữ liệu tính cách"}</NavLink>
                </Menu.Item> */}
          {isLogined ? (
            <Menu.Item
              onClick={() => setIsLogout(true)}
              key="logout"
              icon={<LogoutOutlined />}
            >
              {!collapsed && "Đăng Xuất"}
            </Menu.Item>
          ) : (
            <Menu.Item
              onClick={() => navigate("/login")}
              key="login"
              icon={<LoginOutlined />}
            >
              {!collapsed && "Đăng Nhập"}
            </Menu.Item>
          )}
        </Menu>
      </Sider>

      <Modal
        open={isLogout}
        title={"Bạn có muốn đăng xuất không?"}
        onCancel={() => setIsLogout(false)}
        footer={null}
        width={600}
      >
        <div>
          <Button>Không</Button>
          <Button onClick={handlerSignOut}>Có</Button>
        </div>
      </Modal>
    </>
  );
};

export default NavbarLayout;
