import { createContext, useContext, useEffect } from "react";
import { AuthContext } from "./authContext";
import { NotificationContext } from "./notificationContext";
import { clientToken } from "@/api";

const { SOCKET_URL } = require("@/config/1");
const { io } = require("socket.io-client");

const token = localStorage.getItem("accessToken");
const socket = io(SOCKET_URL, {
  transports: ["websocket", "polling"],
  auth: {
    token: token,
  },
});

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { user, setMatchs, setChats } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);

  useEffect(() => {
    const sh = (data) => {
      if (data.id === user?.id) {
        showNotification("success", "Bạn có 1 tin nhắn mới!");
        clientToken
          .get(`chat/numberUnread`)
          .then((res) => {
            setChats(res.data);
          })
          .catch(() => {
            window.location.href = "/500";
          });
      }
    };

    socket.on(`receiveMsg`, sh);

    return () => {
      socket.off(`receiveMsg`, sh);
    };
  }, [user, showNotification, setChats]);

  useEffect(() => {
    const sh = (data) => {
      if (data.id === user?.id) return;
      showNotification("success", `${data.name} đã yêu thích bạn.`);
      setMatchs(data.matchs);
    };

    socket.on(`tb-likes`, sh);

    return () => {
      socket.off(`tb-likes`, sh);
    };
  }, [user, showNotification, setMatchs]);

  useEffect(() => {
    const sh = (data) => {
      if (data.id === user?.id) return;
      setMatchs(data.matchs);
      console.log(data.matchs);
    };

    socket.on(`tb-unlikes`, sh);

    return () => {
      socket.off(`tb-unlikes`, sh);
    };
  }, [user, showNotification, setMatchs]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
