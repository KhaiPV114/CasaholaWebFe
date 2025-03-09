import React, { useState } from "react";
import { Card, Button, Pagination } from "antd";
import { HeartFilled, CloseCircleFilled } from "@ant-design/icons";

const fakeMatchedUsers = [
    { id: 1, name: "Nguyễn Văn A", age: 24, university: "FPTU HCM", zodiac: "Bảo Bình", interests: "Nhảy, hát, game", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
    { id: 2, name: "Nguyễn Văn B", age: 22, university: "FPTU HN", zodiac: "Thiên Bình", interests: "Du lịch, chụp ảnh", avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
    { id: 3, name: "Nguyễn Văn C", age: 26, university: "FPTU ĐN", zodiac: "Song Tử", interests: "Đọc sách, bơi lội", avatar: "https://randomuser.me/api/portraits/women/3.jpg" },
    { id: 4, name: "Nguyễn Văn D", age: 25, university: "FPTU Cần Thơ", zodiac: "Xử Nữ", interests: "Công nghệ, coding", avatar: "https://randomuser.me/api/portraits/women/4.jpg" },
    { id: 5, name: "Nguyễn Văn E", age: 23, university: "FPTU Đà Nẵng", zodiac: "Kim Ngưu", interests: "Âm nhạc, thể thao", avatar: "https://randomuser.me/api/portraits/women/5.jpg" },
    { id: 6, name: "Nguyễn Văn F", age: 27, university: "FPTU HCM", zodiac: "Sư Tử", interests: "Du lịch, marketing", avatar: "https://randomuser.me/api/portraits/women/6.jpg" },
];

const PAGE_SIZE = 4;

const MatchedUsers = () => {
    const [users, setUsers] = useState(fakeMatchedUsers);
    const [currentPage, setCurrentPage] = useState(1);

    const handleAccept = (userId) => {
        setUsers(users.filter((user) => user.id !== userId));
    };

    const handleReject = (userId) => {
        setUsers(users.filter((user) => user.id !== userId));
    };

    const indexOfLastUser = currentPage * PAGE_SIZE;
    const indexOfFirstUser = indexOfLastUser - PAGE_SIZE;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    return (
        <div style={{ padding: "20px", background: "#FFA401", minHeight: "100vh", textAlign: "center", width: "100%" }}>
            <h1 style={{ color: "#FFF", marginBottom: "20px" }}>DANH SÁCH BẠN MUỐN GHÉP TRỌ</h1>

            <div style={{ display: "flex", justifyContent: "center", gap: "15px", overflowX: "auto", padding: "10px" }}>
                {currentUsers.map((user) => (
                    <Card
                        key={user.id}
                        style={{
                            width: "200px",
                            borderRadius: "10px",
                            textAlign: "center",
                            background: "#FFF",
                            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                        }}
                        cover={<img alt={user.name} src={user.avatar} style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px", height: "150px", objectFit: "cover" }} />}
                    >
                        <h4 style={{ fontWeight: "bold", fontSize: "14px" }}>{user.name} 🔺 {user.university}</h4>
                        <p style={{ fontSize: "12px", color: "#666" }}>Tháng {user.age} - {user.zodiac}</p>
                        <p style={{ fontSize: "12px", color: "#999" }}>{user.interests}</p>

                        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "10px" }}>
                            <CloseCircleFilled onClick={() => handleReject(user.id)} style={{ fontSize: "20px", color: "red", cursor: "pointer" }} />
                        </div>

                        <Button type="primary" style={{ width: "100%", background: "#F95B01", borderRadius: "5px", border: "none", fontSize: "12px" }}>
                            TRÒ CHUYỆN NGAY
                        </Button>
                    </Card>
                ))}
            </div>

            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                <Pagination
                    current={currentPage}
                    total={users.length}
                    pageSize={PAGE_SIZE}
                    onChange={(page) => setCurrentPage(page)}
                />
            </div>

        </div>
    );
};

export default MatchedUsers;
