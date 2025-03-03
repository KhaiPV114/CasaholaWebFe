import React from 'react';
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

const AppRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="testcharacter" element={<TestCharacter />} />
                <Route path="result-page" element={<ResultPage />} />
                <Route path="quiz" element={<Quiz />}/>
                <Route path="guess-friend" element={<Guess />} />
                <Route path="payment" element={<PaymentPage />} />
                <Route path="package" element={<Package />} />
                <Route path="roompreference" element={<RoommatePreferenceForm />} />
                <Route path="yourpreference" element={<YourPreferenceForm />} />

            </Route>

            <Route path="register" element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/reset-password' element={<ResetPassword />} />

        </Routes>
    </BrowserRouter>
);

export default AppRoutes;