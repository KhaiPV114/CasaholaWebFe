import { clientToken } from "@/api";
import { AuthContext } from "@/context/useContext";
import { Button, Col, Image, Row, Typography } from "antd";
import { useContext } from "react";
import "./package.scss";

const { Title } = Typography;

const Package = () => {
  const { user } = useContext(AuthContext);

  const handleRedirect = (packageType) => {
    console.log(user);
    clientToken
      .get("vnpay/payment", {
        params: {
          //   orderInfo: user.id,
          amount: Number(packageType),
          orderId: user.id,
        },
      })
      .then((res) => {
        window.location.href = res.data;
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
            onClick={() => handleRedirect("35000")}
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
            onClick={() => handleRedirect("50000")}
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
    </div>
  );
};

export default Package;
