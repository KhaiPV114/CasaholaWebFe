import React from 'react';
import { Button, Row, Col, Typography, Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import './package.scss';

const { Title } = Typography;

const Package = () => {
    const navigate = useNavigate(); 

    const handleRedirect = (packageType) => {
        navigate(`/payment?package=${packageType}`); 
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
                        onClick={() => handleRedirect('gold')}
                        style={{ cursor: 'pointer' }} 
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
                        onClick={() => handleRedirect('premium')} 
                        style={{ cursor: 'pointer' }} 
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
                >
                    QUAY LẠI KẾT QUẢ TÌM TRỌ
                </Button>
            </div>
        </div>
    );
};

export default Package;
