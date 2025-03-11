import React from "react";
import { Card, Button } from "antd";
import { DollarCircleFilled, CloseCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const PaymentInvoice = () => {
    const navigate = useNavigate();

    const handlePayment = () => {
        navigate("/payment-success");
    };

    const handleCancel = () => {
        navigate("/payment-failure");
    };

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
                <DollarCircleFilled style={{ fontSize: "60px", color: "#F95B01", marginBottom: "20px" }} />
                <h2 style={{ color: "#333", fontWeight: "bold" }}>Chi tiết hóa đơn</h2>
                <p style={{ color: "#666", marginBottom: "20px" }}>Vui lòng kiểm tra thông tin trước khi thanh toán.</p>

                <div style={{
                    background: "#FFF7E6",
                    padding: "15px",
                    borderRadius: "8px",
                    marginBottom: "20px",
                    textAlign: "left"
                }}>
                    <p><strong>Mã hóa đơn:</strong> #INV-123456</p>
                    <p><strong>Dịch vụ:</strong> Thuê phòng tháng 03/2025</p>
                    <p><strong>Số tiền:</strong> 5.000.000 VND</p>
                    <p><strong>Phương thức:</strong> VNPAY</p>
                </div>

                <Button type="primary" style={{
                    width: "100%",
                    background: "#F95B01",
                    borderRadius: "5px",
                    border: "none",
                    marginBottom: "10px"
                }} onClick={handlePayment}>
                    Thanh toán ngay
                </Button>

                <Button danger icon={<CloseCircleOutlined />} style={{
                    width: "100%",
                    borderRadius: "5px",
                    marginTop: "10px"
                }} onClick={handleCancel}>
                    Hủy giao dịch
                </Button>
            </Card>
        </div>
    );
};

export default PaymentInvoice;
