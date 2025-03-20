import { client } from "@/api";
import { createContext, useState } from "react";

// 1. Create User Context
export const AuthContext = createContext();

// 2. Create Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [likes, setLikes] = useState([]);
  const [chats, setChats] = useState([]);
  const [matchs, setMatchs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [account, setAccount] = useState();

  const signIn = (
    userData,
    accessToken,
    refreshToken,
    likesData,
    matchsData,
    chatsData
  ) => {
    setUser(userData);
    setLikes(likesData);
    setChats(chatsData);
    setMatchs(matchsData);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  };

  // Function to log out a user
  const signOut = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  const remember = () => {
    setIsLoading(true);
    const token =
      localStorage.getItem("accessToken") ||
      localStorage.getItem("refreshToken");
    client
      .post("auth/account-remember", { token })
      .then((res) => {
        const { user, accessToken, refreshToken, likes, matchs, chats } =
          res.data;
        signIn(user, accessToken, refreshToken, likes, matchs, chats);
      })
      .catch(() => {
        signOut();
        window.location.href = "/login";
      })
      .finally(() => {
        setIsLoading(true);
      });
  };

  const getAccount = async () => {
    if (!user || !user.id) return;
  
    try {
      const response = await client.get(`/account/${user.id}`);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy thông tin tài khoản:", error);
      return null;
    }
  };
  

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        remember,
        isLoading,
        setLikes,
        likes,
        matchs,
        setMatchs,
        chats,
        setChats,
        getAccount
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
