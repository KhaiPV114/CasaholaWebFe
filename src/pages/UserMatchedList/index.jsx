import React, { useState } from "react";
import { Card, Button, Pagination } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";

const fakeMatchedUsers = [
    { id: 1, name: "Nguyễn Văn A", age: 24, university: "FPTU HCM", zodiac: "Bảo Bình", interests: "Nhảy, hát, game", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
    { id: 2, name: "Nguyễn Văn B", age: 22, university: "FPTU HN", zodiac: "Thiên Bình", interests: "Du lịch, chụp ảnh", avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
    { id: 3, name: "Nguyễn Văn C", age: 26, university: "FPTU ĐN", zodiac: "Song Tử", interests: "Đọc sách, bơi lội", avatar: "https://randomuser.me/api/portraits/women/3.jpg" },
    { id: 4, name: "Nguyễn Văn D", age: 25, university: "FPTU Cần Thơ", zodiac: "Xử Nữ", interests: "Công nghệ, coding", avatar: "https://randomuser.me/api/portraits/women/4.jpg" },
    { id: 5, name: "Nguyễn Văn E", age: 23, university: "FPTU Đà Nẵng", zodiac: "Kim Ngưu", interests: "Âm nhạc, thể thao", avatar: "https://randomuser.me/api/portraits/women/5.jpg" },
    { id: 6, name: "Nguyễn Văn F", age: 27, university: "FPTU HCM", zodiac: "Sư Tử", interests: "Du lịch, marketing", avatar: "https://randomuser.me/api/portraits/women/6.jpg" },
    { id: 7, name: "Nguyễn Văn G", age: 28, university: "FPTU Hà Nội", zodiac: "Ma Kết", interests: "Thể thao, game", avatar: "https://randomuser.me/api/portraits/women/7.jpg" },
    { id: 8, name: "Nguyễn Văn H", age: 21, university: "FPTU HCM", zodiac: "Cự Giải", interests: "Du lịch, nấu ăn", avatar: "https://randomuser.me/api/portraits/women/8.jpg" },
    { id: 9, name: "Nguyễn Văn I", age: 24, university: "FPTU ĐN", zodiac: "Bạch Dương", interests: "Coding, vẽ", avatar: "https://randomuser.me/api/portraits/women/9.jpg" },
    { id: 10, name: "Nguyễn Văn J", age: 26, university: "FPTU Cần Thơ", zodiac: "Nhân Mã", interests: "Âm nhạc, sách", avatar: "https://randomuser.me/api/portraits/women/10.jpg" },
    { id: 11, name: "Nguyễn Văn K", age: 22, university: "FPTU HCM", zodiac: "Thiên Yết", interests: "Múa, ca hát", avatar: "https://randomuser.me/api/portraits/women/11.jpg" },
    { id: 12, name: "Nguyễn Văn L", age: 23, university: "FPTU HN", zodiac: "Song Ngư", interests: "Vẽ tranh, gym", avatar: "https://randomuser.me/api/portraits/women/12.jpg" },
    { id: 13, name: "Nguyễn Văn M", age: 29, university: "FPTU ĐN", zodiac: "Bạch Dương", interests: "Thể thao, coding", avatar: "https://randomuser.me/api/portraits/women/13.jpg" },
    { id: 14, name: "Nguyễn Văn N", age: 24, university: "FPTU Cần Thơ", zodiac: "Kim Ngưu", interests: "Âm nhạc, nấu ăn", avatar: "https://randomuser.me/api/portraits/women/14.jpg" },
    { id: 15, name: "Nguyễn Văn O", age: 25, university: "FPTU HCM", zodiac: "Sư Tử", interests: "Xem phim, đọc sách", avatar: "https://randomuser.me/api/portraits/women/15.jpg" },
    { id: 16, name: "Nguyễn Văn P", age: 26, university: "FPTU Hà Nội", zodiac: "Nhân Mã", interests: "Marketing, coding", avatar: "https://randomuser.me/api/portraits/women/16.jpg" },
];

const PAGE_SIZE = 16;

const MatchedUsers = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastUser = currentPage * PAGE_SIZE;
    const indexOfFirstUser = indexOfLastUser - PAGE_SIZE;
    const currentUsers = fakeMatchedUsers.slice(indexOfFirstUser, indexOfLastUser);

    return (
        <div style={{ padding: "20px", background: "#FFA401", minHeight: "100vh", textAlign: "center", width: "100%" }}>
            <h1 style={{ color: "#FFF", marginBottom: "20px" }}>DANH SÁCH BẠN MUỐN GHÉP TRỌ</h1>

            <div style={{ display: "flex", justifyContent: "center" }}>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)", // 4 cột
                        gap: "20px",
                        maxWidth: "900px",
                        width: "100%",
                    }}
                >
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
                            cover={
                                <img
                                    alt={user.name}
                                    src={user.avatar}
                                    style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px", height: "150px", objectFit: "cover" }}
                                />
                            }
                        >
                            <h4 style={{ fontWeight: "bold", fontSize: "14px" }}>{user.name} 🔺 {user.university}</h4>
                            <p style={{ fontSize: "12px", color: "#666" }}>Tháng {user.age} - {user.zodiac}</p>
                            <p style={{ fontSize: "12px", color: "#999" }}>{user.interests}</p>

                            <CloseCircleFilled style={{ fontSize: "20px", color: "red", cursor: "pointer", marginBottom: "10px" }} />

                            <Button type="primary" style={{ width: "100%", background: "#F95B01", borderRadius: "5px", border: "none", fontSize: "12px" }}>
                                TRÒ CHUYỆN NGAY
                            </Button>
                        </Card>
                    ))}
                </div>
            </div>

            <div style={{display:"flex", justifyContent:"center"}}>
                <Pagination
                    current={currentPage}
                    total={fakeMatchedUsers.length}
                    pageSize={PAGE_SIZE}
                    onChange={(page) => setCurrentPage(page)}
                    style={{ marginTop: "20px" }}
                />
            </div>
        </div>
    );
};

export default MatchedUsers;
