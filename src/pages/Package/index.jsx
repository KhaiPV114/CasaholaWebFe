import { AuthContext } from "@/context/authContext";
import { Button, Col, Image, Modal, Row, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import PaymentInvoice from "../PaymentInvoice";
import "./package.scss";
import { clientToken } from "@/api";

const { Title } = Typography;
const type = {
  35000: "GOLD",
  50000: "PREMIUM",
};

const Package = () => {
  const { user, remember } = useContext(AuthContext);
  const [selectedPackage, setSelectedPackage] = useState(false);
  const [amount, setAmount] = useState(35000);
  const [orderId, setOrderId] = useState(Date.now().toString());

  useEffect(() => {
    if (!user) {
      remember();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const handleRedirect = (packageType) => {
  //   clientToken
  //     .get("vnpay/payment", {
  //       params: {
  //         //   orderInfo: user.id,
  //         amount: Number(packageType),
  //         orderId: user.id,
  //       },
  //     })
  //     .then((res) => {
  //       window.location.href = res.data;
  //     });
  // };

  const payos = (amount) => {
    setOrderId(Date.now().toString());
    setAmount(amount);
    setSelectedPackage(true);
  };

  const handlePayment = () => {
    clientToken
      .get("/payos/create-payment", {
        params: {
          amount: amount,
          type: type[amount],
          orderId: orderId,
        },
      })
      .then((res) => {
        console.log(res.data);
        window.location.href = res.data;
      })
      .catch(() => {
        window.location.href = "/500";
      });
  };

  return (
    <div className="package-container">
      <Title level={2} className="package-title">
        MỞ KHÓA TÍNH NĂNG NHẮN TIN
      </Title>

      <Row gutter={[60, 20]} justify="center">
        <Col xs={24} sm={12} md={10} lg={8}>
          <div
            className="image-container"
            onClick={() => payos(35000)}
            style={{ cursor: "pointer" }}
          >
            <Image
              src="./FA6002 (14).png"
              preview={false}
              className="package-image"
            />
          </div>
        </Col>

        <Col xs={24} sm={12} md={10} lg={8}>
          <div
            className="image-container"
            onClick={() => payos(50000)}
            style={{ cursor: "pointer" }}
          >
            <Image
              src="./FA6002 (13).png"
              preview={false}
              className="package-image"
            />
          </div>
        </Col>
      </Row>

      <div className="button-container">
        <Button
          type="primary"
          size="large"
          className="return-button"
          onClick={() => window.history.back()}
        >
          QUAY LẠI KẾT QUẢ TÌM TRỌ
        </Button>
      </div>
      {selectedPackage && (
        <Modal
          open={selectedPackage}
          // title={selectedProfile.name}
          onCancel={() => setSelectedPackage(false)}
          footer={null}
          width={600}
        >
          <PaymentInvoice
            amount={amount}
            type={type[amount]}
            orderId={orderId}
            handlePayment={handlePayment}
            onClose={() => setSelectedPackage(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default Package;
