import { createContext } from "react";

const { SOCKET_URL } = require("@/config/1");
const { io } = require("socket.io-client");


const token = localStorage.getItem("accessToken")
export const socket = io(SOCKET_URL, {
    transports: ["websocket", "polling"], 
    auth: {
        token: token
    }
  });
