import { clientToken } from "@/api";
import { AuthContext } from "@/context/authContext";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Input, Layout, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Msg } from "./msg";

const { Content, Sider } = Layout;
const { Title, Text } = Typography;

const ChatRoom = () => {
  const [userContact, setUserContact] = useState([]);
  const [userSource, setUserSource] = useState(null);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const location = useLocation();
  const { user, remember, setChats } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      remember();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async (params) => {
    try {
      const response = await clientToken.get(`chat/${user.id}`, { params });
      setUserContact(response.data || []);

      setFilteredContacts(
        response.data?.filter((u) => u.fullName.toLowerCase().includes("")) ||
          []
      );

      let matchingSource = null;

      if (params?.get("chooseUid")) {
        matchingSource = response.data.find(
          (contact) => contact._id === params.get("chooseUid")
        );
      }

      setUserSource(matchingSource || response.data[0]);
    } catch (error) {
      setUserContact([]);
    }
  };

  useEffect(() => {
    if (location.search) {
      fetchData(new URLSearchParams(location.search));
    } else {
      fetchData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
k
  const getMsgSource = async (userChoose) => {
    if (!userChoose.status) {
      const res = await clientToken.put(
        `chat/read/${user.id}/${userChoose._id}`
      );
      if (res?.data >= 0) {
        setChats(res.data);
        fetchData();
      }
    }
    setUserSource(userChoose);
  };

  const setSearchTerm = (key) => {
    const users = userContact.filter((u) =>
      u.fullName.toLowerCase().includes(key || "")
    );

    setFilteredContacts(users);
  };

  return (
    <Layout
      style={{ height: "100vh", background: "#F8F8F8", fontSize: "14px" }}
    >
      <Sider width={250} style={{ background: "#FFA401", padding: "15px" }}>
        <Title level={4} style={{ color: "white", fontSize: "18px" }}>
          Đoạn chat
        </Title>
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
              onClick={() => getMsgSource(u)}
            >
              <Avatar icon={<UserOutlined />} size="default" />
              <Text
                style={{ color: "white", marginLeft: "8px", fontSize: "13px" }}
              >
                {u.fullName}
              </Text>
              {u.lastSend !== user?.id && u.status === false && (
                <div
                  className=""
                  style={{
                    flexGrow: "1",
                    textAlign: "end",
                    paddingRight: "5px",
                  }}
                >
                  O
                </div>
              )}
            </div>
          ))}
        </div>
      </Sider>
      <Content
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <div
          style={{
            padding: "12px",
            background: "#FFA401",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar icon={<UserOutlined />} size="default" />
          <Title
            level={5}
            style={{ color: "white", marginLeft: "8px", fontSize: "16px" }}
          >
            {userSource?.fullName || ""}
          </Title>
        </div>
        {user && userContact && userSource && (
          <Msg
            sendUid={user.id}
            receiveUid={userSource._id}
            fetchData={fetchData}
          />
        )}
      </Content>
    </Layout>
  );
};

export default ChatRoom;
