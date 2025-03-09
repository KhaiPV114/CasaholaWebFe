import { clientToken } from "@/api";
import { AuthContext } from "@/context/authContext";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Input, Layout, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Msg } from "./msg";

const { Content, Sider } = Layout;
const { Title, Text } = Typography;

const ChatRoom = () => {
  const [userContact, setUserContact] = useState([]);
  const [userNow, setUserNow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    clientToken
      .get(`chat/${user.id}`)
      .then((res) => {
        setUserContact(res.data || []);
        setUserNow(res.data[0]);
      })
      .catch(() => {
        setUserContact([]);
      });
  }, [user, navigate]);

  const getMsgNow = (userChoose) => {
    setUserNow(userChoose);
  };

  const filteredContacts = userContact.filter((u) =>
    u.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout style={{ height: "100vh", background: "#F8F8F8", fontSize: "14px" }}>
      <Sider width={250} style={{ background: "#FFA401", padding: "15px" }}>
        <Title level={4} style={{ color: "white", fontSize: "18px" }}>Đoạn chat</Title>
        <Input
          placeholder="Tìm kiếm trên Messenger"
          style={{
            marginBottom: "10px",
            background: "#F95B01",
            color: "white",
            borderRadius: "15px",
            fontSize: "13px",
          }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div>
          {filteredContacts.map((u, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                cursor: "pointer",
              }}
              onClick={() => getMsgNow(u)}
            >
              <Avatar icon={<UserOutlined />} size="default" />
              <Text style={{ color: "white", marginLeft: "8px", fontSize: "13px" }}>
                {u.fullName}
              </Text>
            </div>
          ))}
        </div>
      </Sider>
      <Content style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <div style={{ padding: "12px", background: "#FFA401", display: "flex", alignItems: "center" }}>
          <Avatar icon={<UserOutlined />} size="default" />
          <Title level={5} style={{ color: "white", marginLeft: "8px", fontSize: "16px" }}>
            {userNow?.fullName || ""}
          </Title>
        </div>
        {userContact && userNow && <Msg sendUid={user.id} receiveUid={userNow._id} />}
      </Content>
    </Layout>
  );
};

export default ChatRoom;
