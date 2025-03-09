import { clientToken } from "@/api";
import { socket } from "@/context/socketContext";
import {
  GifOutlined,
  PictureOutlined,
  SendOutlined,
  SmileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Input } from "antd";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Msg = ({ sendUid, receiveUid }) => {
  const [messages, setMessages] = useState([]);
  //   const { socket } = useContext(WebSocketContext);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (receiveUid === 0) {
      return;
    }

    clientToken
      .get(`/chat/${sendUid}/${receiveUid}`)
      .then((res) => {
        const msg = res.data.map((d) => {
          if (receiveUid !== d.receiveUid) {
            return { sender: "friend", text: d.message };
          } else {
            return { sender: "Bạn", text: d.message };
          }
        });
        setMessages(msg);
      })
      .catch(() => {
        navigate("/500");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receiveUid]);

  useEffect(() => {
    const handleNewMessage = (data) => {
      if (data.receiveUid === receiveUid) {
        setMessages((prev) => [
          ...prev,
          { sender: data.sender, text: data.message },
        ]);
      }
    };

    socket.on(`${sendUid}`, handleNewMessage);

    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

    return () => {
      socket.off(`${sendUid}`, handleNewMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: "Bạn", text: input }]);
      socket.emit("createChat", { receiveUid: receiveUid, message: input });
      setInput("");
    }
  };

  return (
    <>
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "12px",
          background: "#F8F8F8",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              marginBottom: "8px",
              justifyContent: msg.sender === "Bạn" ? "flex-end" : "flex-start",
            }}
          >
            {msg.sender !== "Bạn" && (
              <Avatar
                icon={<UserOutlined />}
                size="small"
                style={{ marginRight: "8px" }}
              />
            )}{" "}
            {/* ✅ Nhỏ hơn */}
            <div
              style={{
                maxWidth: "55%" /* ✅ Hẹp lại một chút */,
                padding: "8px 12px" /* ✅ Ít padding hơn */,
                borderRadius: "15px",
                background: msg.sender === "Bạn" ? "#F95B01" : "#E0E0E0",
                color: msg.sender === "Bạn" ? "white" : "black",
                textAlign: "left",
                fontSize: "13px" /* ✅ Nhỏ hơn */,
                wordBreak: "break-word",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div
        style={{
          padding: "8px",
          display: "flex",
          alignItems: "center",
          background: "#FFA401",
        }}
      >
        {" "}
        {/* ✅ Ít padding hơn */}
        <Button
          icon={<PictureOutlined />}
          type="text"
          style={{ color: "white", marginRight: "8px", fontSize: "16px" }}
        />
        <Button
          icon={<GifOutlined />}
          type="text"
          style={{ color: "white", marginRight: "8px", fontSize: "16px" }}
        />
        <Button
          icon={<SmileOutlined />}
          type="text"
          style={{ color: "white", marginRight: "8px", fontSize: "16px" }}
        />
        <Input
          style={{
            flex: 1,
            borderRadius: "15px",
            padding: "8px",
            background: "white",
            color: "black",
            fontSize: "14px",
          }}
          placeholder="Aa"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPressEnter={handleSend}
        />
        <Button
          type="primary"
          shape="circle"
          icon={<SendOutlined />}
          style={{
            marginLeft: "8px",
            background: "#F95B01",
            fontSize: "16px",
          }}
          onClick={handleSend}
        />
      </div>
    </>
  );
};
