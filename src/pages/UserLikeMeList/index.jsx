import React, { useContext, useEffect, useState } from "react";
import { Card } from "antd";
import { clientToken } from "@/api";
import { AuthContext } from "@/context/authContext";

const LikedUsers = () => {
  const [likedUsers, setLikedUsers] = useState([]);
  const { user, remember } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      remember();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    clientToken
      .get(`users/likes/${user.id}`)
      .then((res) => {
        setLikedUsers(res.data || []);
      })
      .catch(() => {
        window.location.href = "/500";
      });
  }, [user, setLikedUsers]);

  //   const convertAge = (dob) => {
  //     const today = new Date();
  //     const birthDate = new Date(dob);

  //     let age = today.getFullYear() - birthDate.getFullYear();

  //     const monthDifference = today.getMonth() - birthDate.getMonth();
  //     if (
  //       monthDifference < 0 ||
  //       (monthDifference === 0 && today.getDate() < birthDate.getDate())
  //     ) {
  //       age--;
  //     }

  //     return age;
  //   };

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
      <h1 style={{ color: "#FFF", marginBottom: "20px" }}>NGƯỜI TÔI THÍCH</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          justifyContent: "center",
          maxWidth: "80%",
          margin: "0 auto",
        }}
      >
        {likedUsers.map((user) => (
          <Card
            key={user.id}
            style={{
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
              {/* 🔺 */}
              {/* {user.university} */}
            </h4>
            <p style={{ fontSize: "12px", color: "#666" }}>
              Tháng {new Date(user.dob).getMonth()} -{" "}
              {new Date(user.dob).getFullYear()}
            </p>
            <p style={{ fontSize: "12px", color: "#999" }}>{user.interests}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LikedUsers;
