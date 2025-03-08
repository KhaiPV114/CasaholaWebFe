import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import TestCharacter from '@/pages/TestCharacter';
import Login from '@/pages/Login';
import ResultPage from '@/pages/TestResult';
import Quiz from '@/pages/Quiz';
import Guess from '@/pages/Suggest_friend';
import PaymentPage from '@/pages/Payment';
import Package from '@/pages/Package';
import RoommatePreferenceForm from '@/pages/RoomPreference';
import ResetPassword from '@/pages/ResetPassword';
import Register from '@/pages/Register';
import YourPreferenceForm from '@/pages/YourPreference';
import ChatRoom from '@/pages/ChatRoom';
import UserManagement from '@/pages/UserManagement';
import UpdateCriteriaPage from '@/pages/UpdateCriteria';
import ForgotPassword from '@/pages/ForgotPassword';
import ChangePassword from '@/pages/ChangePassword';
import UserEditForm from '@/pages/UserInfor';
import { AuthContext } from "@/context/useContext";
import { client } from "@/api";
import { VnPayReturn } from "@/pages/vnpay";

const AppRoutes = () => {
  const { user, signIn, signOut } = useContext(AuthContext);
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
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
  }, []);

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="testcharacter" element={<TestCharacter />} />
                <Route path="result-page" element={<ResultPage />} />
                <Route path="quiz" element={<Quiz />}/>
                {/* <Route path="guess-friend" element={<Guess />} /> */}
                <Route path="payment" element={<PaymentPage />} />
                <Route path="package" element={<Package />} />
                <Route path="roompreference" element={<RoommatePreferenceForm />} />
                <Route path="chatroom" element={<ChatRoom />} />
                <Route path="usermanagement" element={<UserManagement />} />
                <Route path="updatecriteria" element={<UpdateCriteriaPage />} />
                <Route path="userinfo" element={<UserEditForm />} />
                <Route path="yourpreference" element={<YourPreferenceForm />} />



            </Route>
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
