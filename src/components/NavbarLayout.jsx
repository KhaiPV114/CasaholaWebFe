import { AuthContext } from "@/context/useContext";
import { UseNotification } from "@/context/useNotification";
import { BarChartOutlined, DatabaseOutlined, FileSearchOutlined, HomeOutlined, LoginOutlined, LogoutOutlined, MessageOutlined } from "@ant-design/icons";
import { Menu, notification } from "antd";
import Sider from "antd/es/layout/Sider";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NavbarLayout = () => {
    const [collapsed, setCollapsed] = useState(true);
    const { user, signOut } = useContext(AuthContext)
    const [isLogined, setIsLogined] = useState(false);
    const {showNofitication} = useContext(UseNotification)
    const navigate = useNavigate()

    const openNotificationWithIcon = (type, msg) => {
        notification[type]({
          message: msg,
        });
      };

    useEffect(() => {
        if (user) {
            setIsLogined(true)
        } else {
            setIsLogined(false)
        }
    }, [])

    const handlerSignOut = () => {
        signOut();
        setIsLogined(false);
        openNotificationWithIcon("success", "Logout successfull!")
    }
    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            onMouseEnter={() => setCollapsed(false)}
            onMouseLeave={() => setCollapsed(true)}
            style={{ background: "#d9d9d9", transition: "width 0.3s", width: collapsed ? "80px" : "200px", zIndex: 1000 }}
        >
            <Menu mode="vertical" className="side-menu" style={{ background: "#d9d9d9", width: collapsed ? "80px" : "200px", height: "100%", transition: "width 0.3s", }}>
                <Menu.Item key="home" icon={<HomeOutlined />}>{!collapsed && "Trang chủ"}</Menu.Item>
                <Menu.Item key="test" icon={<BarChartOutlined />}>{!collapsed && "Test tính cách"}</Menu.Item>
                <Menu.Item key="match" icon={<FileSearchOutlined />}>{!collapsed && "Tìm bạn ở ghép"}</Menu.Item>
                <Menu.Item key="news" icon={<MessageOutlined />}>{!collapsed && "Tin nhắn"}</Menu.Item>
                <Menu.Item key="data" icon={<DatabaseOutlined />}>{!collapsed && "Dữ liệu tính cách"}</Menu.Item>
                {
                    isLogined
                    ? <Menu.Item onClick={handlerSignOut} key="logout" icon={<LogoutOutlined /> }>{!collapsed && "Đăng Xuat"}</Menu.Item>
                        : <Menu.Item onClick={() => navigate("/login")} key="login" icon={<LoginOutlined />}>{!collapsed && "Đăng Nhập"}</Menu.Item>
                        
                }
            </Menu>
        </Sider>
    );
};

export default NavbarLayout;