import React, { useState } from "react";
import { Card } from "antd";

const favoriteUsers = [
    { id: 1, name: "Nguyễn Văn A", age: 24, university: "FPTU HCM", zodiac: "Bảo Bình", interests: "Nhảy, hát, game", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
    { id: 2, name: "Nguyễn Văn B", age: 22, university: "FPTU HN", zodiac: "Thiên Bình", interests: "Du lịch, chụp ảnh", avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
    { id: 3, name: "Nguyễn Văn C", age: 26, university: "FPTU ĐN", zodiac: "Song Tử", interests: "Đọc sách, bơi lội", avatar: "https://randomuser.me/api/portraits/women/3.jpg" },
    { id: 4, name: "Nguyễn Văn D", age: 25, university: "FPTU Cần Thơ", zodiac: "Xử Nữ", interests: "Công nghệ, coding", avatar: "https://randomuser.me/api/portraits/women/4.jpg" },
    { id: 5, name: "Nguyễn Văn E", age: 23, university: "FPTU Đà Nẵng", zodiac: "Kim Ngưu", interests: "Âm nhạc, thể thao", avatar: "https://randomuser.me/api/portraits/women/5.jpg" },
    { id: 6, name: "Nguyễn Văn F", age: 27, university: "FPTU HCM", zodiac: "Sư Tử", interests: "Du lịch, marketing", avatar: "https://randomuser.me/api/portraits/women/6.jpg" },
];

const LikedUsers = () => {
    const [likedUsers] = useState(favoriteUsers);

    return (
        <div style={{ padding: "20px", background: "#FFA401", minHeight: "100vh", textAlign: "center", width: "100%" }}>
            <h1 style={{ color: "#FFF", marginBottom: "20px" }}>NGƯỜI TÔI THÍCH</h1>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", justifyContent: "center", maxWidth: "80%", margin: "0 auto" }}>
                {likedUsers.map((user) => (
                    <Card
                        key={user.id}
                        style={{
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
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default LikedUsers;
