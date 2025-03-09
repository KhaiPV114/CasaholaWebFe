import { Button, Image, Typography } from 'antd';
import './payment.scss';

const { Title } = Typography;

const Payment = () => {

    return (
        <div className="payment-container">
            <Title level={2} className="payment-title" color='white'>
                MỞ KHÓA TÍNH NĂNG NHẮN TIN
            </Title>

            <Title level={4} className="payment-subtitle">
                THANH TOÁN VÀO TÀI KHOẢN
            </Title>


            <div className="qr-box">
                <Image
                    src="./vietqr.png"
                    preview={false}
                    className="payment-image"
                />
            </div>

            <p className="payment-text">
                Với cú pháp "<b>Họ và tên_SĐT_CASAGOLD/ CASAPREMIUM</b>"
            </p>

            <p className="or-text">HOẶC</p>

            <div className="qr-box second-qr">
                <Image
                    src="./zaloqr.png"
                    preview={false}
                    className="payment-image"
                />
            </div>

            <p className="payment-text">
                để được tư vấn và hỗ trợ tận tình.
            </p>

            <div className="button-container">
                <Button
                    type="primary"
                    size="large"
                    className="return-button"
                    
                >
                    QUAY LẠI KẾT QUẢ TÌM TRỌ
                </Button>
            </div>
        </div>
    );
};

export default Payment;
