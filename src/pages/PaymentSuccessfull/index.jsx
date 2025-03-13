import { AuthContext } from "@/context/authContext";
import { CheckCircleFilled } from "@ant-design/icons";
import { Button, Card } from "antd";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { user, remember } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      remember();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#FFA401",
        width: "100%",
      }}
    >
      <Card
        style={{
          textAlign: "center",
          borderRadius: "10px",
          padding: "30px",
          background: "#FFF",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
          width: "400px",
        }}
      >
        <CheckCircleFilled
          style={{ fontSize: "60px", color: "#52c41a", marginBottom: "20px" }}
        />
        <h2 style={{ color: "#333", fontWeight: "bold" }}>
          Thanh toán thành công!
        </h2>
        <p style={{ color: "#666", marginBottom: "20px" }}>
          Cảm ơn bạn đã sử dụng dịch vụ.
        </p>

        {/* <div
          style={{
            background: "#FFF7E6",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "20px",
            textAlign: "left",
          }}
        >
          <p>
            <strong>Mã giao dịch:</strong> #123456789
          </p>
          <p>
            <strong>Số tiền:</strong> 500.000 VND
          </p>
          <p>
            <strong>Phương thức:</strong> VNPAY
          </p>
        </div> */}

        <Button
          type="primary"
          style={{
            width: "100%",
            background: "#F95B01",
            borderRadius: "5px",
            border: "none",
            marginBottom: "10px",
          }}
          onClick={() => navigate("/")}
        >
          Trang chủ
        </Button>

        <Button
          style={{ width: "100%", borderRadius: "5px" }}
          onClick={() => navigate(-1)}
        >
          Quay lại
        </Button>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
