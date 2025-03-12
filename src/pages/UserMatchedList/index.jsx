import { clientToken } from "@/api";
import { AuthContext } from "@/context/authContext";
import { Button, Card, Pagination } from "antd";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 16;

const MatchedUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [userMatchs, setUserMatchs] = useState([]);
  const [currentUsers, setCurrentUsers] = useState([]);
  const navigate = useNavigate();
  const { user, remember } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      remember();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      clientToken
        .get(`users/matchs/${user.id}`)
        .then((res) => {
          setUserMatchs(res.data || []);
          setCurrentUsers(res.data?.slice(0, 16) || []);
        })
        .catch(() => {
          window.location.href = "/500";
        });
    } catch (error) {
      window.location.href = "/login";
    }
  }, [user, setUserMatchs]);

  const changePage = (page) => {
    setCurrentPage(page);
    setCurrentUsers(userMatchs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE));
  };

  return (
    <div
      style={{
        padding: "20px",
        background: "#FFA401",
        minHeight: "100vh",
        textAlign: "center",
        width: "100%",
      }}
    >
      <h1 style={{ color: "#FFF", marginBottom: "20px" }}>
        DANH SÁCH BẠN MUỐN GHÉP TRỌ
      </h1>

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
                  alt={user.fullName}
                  src={user.profileImage}
                  style={{
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              }
            >
              <h4 style={{ fontWeight: "bold", fontSize: "14px" }}>
                {user.fullName}
                {/* 🔺 {user.university} */}
              </h4>
              <p style={{ fontSize: "12px", color: "#666" }}>
                Tháng {new Date(user.dob).getMonth()} -{" "}
                {new Date(user.dob).getFullYear()}
              </p>
              <p style={{ fontSize: "12px", color: "#999" }}>
                {user.interests}
              </p>

              <Button
                type="primary"
                style={{
                  width: "100%",
                  background: "#F95B01",
                  borderRadius: "5px",
                  border: "none",
                  fontSize: "12px",
                }}
                onClick={() => navigate(`/chatroom?chooseUid=${user._id}`)}
              >
                TRÒ CHUYỆN NGAY
              </Button>
            </Card>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          current={currentPage}
          total={userMatchs.length}
          pageSize={PAGE_SIZE}
          onChange={(page) => changePage(page)}
          style={{ marginTop: "20px" }}
        />
      </div>
    </div>
  );
};

export default MatchedUsers;
