import { CloseCircleOutlined, DollarCircleFilled } from "@ant-design/icons";
import { Button } from "antd";

const PaymentInvoice = ({ amount, type, orderId, handlePayment, onClose }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
      }}
    >
      <DollarCircleFilled
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: "60px",
          color: "#F95B01",
          marginBottom: "20px",
        }}
      />
      <h2 style={{ color: "#333", fontWeight: "bold", textAlign: "center" }}>
        Chi tiết hóa đơn
      </h2>
      <p style={{ color: "#666", marginBottom: "20px", textAlign: "center" }}>
        Vui lòng kiểm tra thông tin trước khi thanh toán.
      </p>

      <div
        style={{
          background: "#FFF7E6",
          padding: "15px",
          borderRadius: "8px",
          marginBottom: "20px",
          textAlign: "left",
        }}
      >
        <p>
          <strong>Mã hóa đơn:</strong> {orderId}
        </p>
        <p>
          <strong>Dịch vụ:</strong> Thanh toán gói tài khoản {type}
        </p>
        <p>
          <strong>Số tiền:</strong> {amount} VND
        </p>
        <p>
          <strong>Phương thức:</strong> PAYOS
        </p>
      </div>

      <Button
        type="primary"
        style={{
          width: "100%",
          background: "#F95B01",
          borderRadius: "5px",
          border: "none",
          marginBottom: "10px",
        }}
        onClick={handlePayment}
      >
        Thanh toán ngay
      </Button>

      <Button
        danger
        icon={<CloseCircleOutlined />}
        style={{
          width: "100%",
          borderRadius: "5px",
          marginTop: "10px",
        }}
        onClick={onClose}
      >
        Hủy giao dịch
      </Button>
    </div>
  );
};

export default PaymentInvoice;
