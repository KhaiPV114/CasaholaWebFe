import React, { useState, useRef, useEffect } from "react";
import { Layout, Input, Button, Avatar, Typography } from "antd";
import { SendOutlined, UserOutlined, SmileOutlined, PictureOutlined, GifOutlined } from "@ant-design/icons";

const { Content, Sider } = Layout;
const { Title, Text } = Typography;

const ChatRoom = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    const handleSend = () => {
        if (input.trim()) {
            setMessages([...messages, { sender: "Bạn", text: input }]);
            setInput("");
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <Layout style={{ height: "100vh", background: "#F8F8F8", fontSize: "14px" }}> {/* ✅ Giảm font size */}
            {/* Danh sách bạn bè */}
            <Sider width={250} style={{ background: "#FFA401", padding: "15px" }}> {/* ✅ Hẹp lại */}
                <Title level={4} style={{ color: "white", fontSize: "18px" }}>Đoạn chat</Title> {/* ✅ Giảm font */}
                <Input
                    placeholder="Tìm kiếm trên Messenger"
                    style={{ marginBottom: "10px", background: "#F95B01", color: "white", borderRadius: "15px", fontSize: "13px" }}
                />
                <div>
                    {[1, 2, 3, 4].map((user, index) => (
                        <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}> {/* ✅ Ít khoảng cách hơn */}
                            <Avatar icon={<UserOutlined />} size="default" /> {/* ✅ Avatar nhỏ lại */}
                            <Text style={{ color: "white", marginLeft: "8px", fontSize: "13px" }}>Người dùng {index + 1}</Text> {/* ✅ Font nhỏ */}
                        </div>
                    ))}
                </div>
            </Sider>

            {/* Khu vực chat */}
            <Content style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
                {/* Header chat */}
                <div style={{ padding: "12px", background: "#FFA401", display: "flex", alignItems: "center" }}> {/* ✅ Ít padding hơn */}
                    <Avatar icon={<UserOutlined />} size="default" /> {/* ✅ Avatar nhỏ hơn */}
                    <Title level={5} style={{ color: "white", marginLeft: "8px", fontSize: "16px" }}>Vo Quoc Anh</Title> {/* ✅ Font nhỏ */}
                </div>

                {/* Tin nhắn */}
                <div style={{ flex: 1, overflowY: "auto", padding: "12px", background: "#F8F8F8" }}>
                    {messages.map((msg, index) => (
                        <div key={index} style={{ display: "flex", marginBottom: "8px", justifyContent: msg.sender === "Bạn" ? "flex-end" : "flex-start" }}>
                            {msg.sender !== "Bạn" && <Avatar icon={<UserOutlined />} size="small" style={{ marginRight: "8px" }} />} {/* ✅ Nhỏ hơn */}
                            <div
                                style={{
                                    maxWidth: "55%", /* ✅ Hẹp lại một chút */
                                    padding: "8px 12px", /* ✅ Ít padding hơn */
                                    borderRadius: "15px",
                                    background: msg.sender === "Bạn" ? "#F95B01" : "#E0E0E0",
                                    color: msg.sender === "Bạn" ? "white" : "black",
                                    textAlign: "left",
                                    fontSize: "13px", /* ✅ Nhỏ hơn */
                                    wordBreak: "break-word",
                                }}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Nhập tin nhắn */}
                <div style={{ padding: "8px", display: "flex", alignItems: "center", background: "#FFA401" }}> {/* ✅ Ít padding hơn */}
                    <Button icon={<PictureOutlined />} type="text" style={{ color: "white", marginRight: "8px", fontSize: "16px" }} />
                    <Button icon={<GifOutlined />} type="text" style={{ color: "white", marginRight: "8px", fontSize: "16px" }} />
                    <Button icon={<SmileOutlined />} type="text" style={{ color: "white", marginRight: "8px", fontSize: "16px" }} />
                    <Input
                        style={{ flex: 1, borderRadius: "15px", padding: "8px", background: "white", color: "black", fontSize: "14px" }}
                        placeholder="Aa"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onPressEnter={handleSend}
                    />
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<SendOutlined />}
                        style={{ marginLeft: "8px", background: "#F95B01", fontSize: "16px" }}
                        onClick={handleSend}
                    />
                </div>
            </Content>
        </Layout>

    );
};

export default ChatRoom;
