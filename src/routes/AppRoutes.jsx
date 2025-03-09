import { client } from "@/api";
import { AuthContext } from "@/context/authContext";
import { NotificationContext } from "@/context/notificationContext";
import { socket } from "@/context/socketContext";
import MainLayout from "@/layouts/MainLayout";
import About from "@/pages/About";
import ChangePassword from "@/pages/ChangePassword";
import ChatRoom from "@/pages/ChatRoom";
import Contact from "@/pages/Contact";
import ForgotPassword from "@/pages/ForgotPassword";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Package from "@/pages/Package";
import PaymentPage from "@/pages/Payment";
import Quiz from "@/pages/Quiz";
import Register from "@/pages/Register";
import ResetPassword from "@/pages/ResetPassword";
import RoommatePreferenceForm from "@/pages/RoomPreference";
import TestCharacter from "@/pages/TestCharacter";
import ResultPage from "@/pages/TestResult";
import UpdateCriteriaPage from "@/pages/UpdateCriteria";
import UserEditForm from "@/pages/UserInfor";
import UserManagement from "@/pages/UserManagement";
import MatchedUsers from "@/pages/UserMatchedList";
import VnPayReturn from "@/pages/vnpay";
import YourPreferenceForm from "@/pages/YourPreference";
import { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  const { user, signIn, signOut } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);

  useEffect(() => {
    const token =
      localStorage.getItem("accessToken") ||
      localStorage.getItem("refreshToken");
    if (!user && token) {
      client
        .post("auth/account-remember", { token })
        .then((res) => {
          const { user, accessToken, refreshToken } = res.data;
          signIn(user, accessToken, refreshToken);
        })
        .catch(() => {
          signOut();
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!user) return;

    const sh = (data) => {
      if (data.id === user.id) return;
      showNotification("success", "Bạn có 1 tin nhắn mới!");
    };

    socket.on(`tb${user.id}`, sh);

    return () => {
      socket.off(`tb${user.id}`, sh);
    };
  }, [ user, showNotification]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          {/* <Route element={<ProtectedRoute user={ user } />}> */}
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="testcharacter" element={<TestCharacter />} />
          <Route path="result-page" element={<ResultPage />} />
          <Route path="quiz" element={<Quiz />} />
          {/* <Route path="guess-friend" element={<Guess />} /> */}
          <Route path="payment" element={<PaymentPage />} />
          <Route path="package" element={<Package />} />
          <Route path="roompreference" element={<RoommatePreferenceForm />} />
          <Route path="chatroom" element={<ChatRoom />} />
          <Route path="usermanagement" element={<UserManagement />} />
          <Route path="updatecriteria" element={<UpdateCriteriaPage />} />
          <Route path="userinfo" element={<UserEditForm />} />
          <Route path="usermatchedlist" element={<MatchedUsers />} />

          {/* </Route> */}
        </Route>
        <Route path="yourpreference" element={<YourPreferenceForm />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="change-password" element={<ChangePassword />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="vnpay" element={<VnPayReturn />} />
        <Route path="/403" element={<>Bi dan</>} />
        <Route path="/401" element={<>Dang nhap di</>} />
        <Route path="/500" element={<>He thong bi loi</>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
