import React from "react";
import { Card, Button } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const PaymentFailure = () => {
    const navigate = useNavigate();

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            background: "#FFA401",
            width: "100%"
        }}>
            <Card style={{
                textAlign: "center",
                borderRadius: "10px",
                padding: "30px",
                background: "#FFF",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                width: "400px"
            }}>
                <CloseCircleFilled style={{ fontSize: "60px", color: "#FF4D4F", marginBottom: "20px" }} />
                <h2 style={{ color: "#333", fontWeight: "bold" }}>Thanh toán thất bại!</h2>
                <p style={{ color: "#666", marginBottom: "20px" }}>Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.</p>

                <div style={{
                    background: "#FFF2F0",
                    padding: "15px",
                    borderRadius: "8px",
                    marginBottom: "20px",
                    textAlign: "left"
                }}>
                    <p><strong>Mã giao dịch:</strong> #123456789</p>
                    <p><strong>Số tiền:</strong> 500.000 VND</p>
                    <p><strong>Phương thức:</strong> VNPAY</p>
                </div>

                <Button type="primary" style={{
                    width: "100%",
                    background: "#F95B01",
                    borderRadius: "5px",
                    border: "none",
                    marginBottom: "10px"
                }} onClick={() => navigate("/")}>
                    Trang chủ
                </Button>

                <Button danger style={{ width: "100%", borderRadius: "5px" }} onClick={() => navigate(-1)}>
                    Thử lại
                </Button>
            </Card>
        </div>
    );
};

export default PaymentFailure;
