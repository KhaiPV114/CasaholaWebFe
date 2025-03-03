import { Button, Col, Row, Typography } from 'antd';
import React from 'react';
import './testcharacter.scss';

const { Title, Text } = Typography;
 
const TestCharacter = () => {
    return (
        <div className="test-character">
            <div className="image-placeholder">
                <img src="/Banner.png" alt="Banner" className="image-placeholder__img" />
            </div>

            <div className="content-section">
                <Row className="info-row">
                    <Col span={18} className="main-content">
                        <Title level={1} className="main-title">
                            TRẮC NGHIỆM TÍNH CÁCH MIỄN PHÍ. KHÁM PHÁ BẠN LÀ AI?
                        </Title>
                        <Row className="stats-row">
                            <Col className="stat-block">
                                <Text strong className="stat-number">
                                    154 người
                                </Text>
                                <Text>đã tham gia trắc nghiệm. </Text>
                            </Col>
                            <Col className="stat-block">
                                <Text strong className="stat-number stat-number--blue">
                                    65 người
                                </Text>
                                <Text>đã tham gia trắc nghiệm. </Text>
                            </Col>
                        </Row>

                        <Text className="description">
                            Kết quả trắc nghiệm tính cách giúp bạn hiểu rõ điểm mạnh, điểm yếu và động lực của bản thân. Từ đó CASAHOLA sẽ đưa ra gợi ý cho bạn về những kiểu tính cách tương hợp giúp bạn tìm được bạn cùng phòng ưng ý và tránh rủi ro cao nhất.
                        </Text>
                        <Button type="primary" size="large" className="cta-button">
                            Làm Trắc Nghiệm
                        </Button>
                    </Col>
                    <Col span={6}>
                        <div className="image-placeholder image-placeholder--sidebar">
                            <img src="/Penguin.png" alt="Penguin" className="image-placeholder__img" />
                        </div>
                    </Col>
                </Row>
            </div>

            <div className="personality-section">
                <Title level={3} className="section-title">
                    CÁC KIỂU TÍNH CÁCH ENNEAGRAM
                </Title>


                <Row gutter={[50, 50]} className="personality-grid" justify="center">
                    {["Cầu Toàn", "Giúp Đỡ", "Thành Đạt", "Cá Tính", "Nghiên Cứu"].map((name, index) => (
                        <Col key={index} xs={12} sm={8} md={6} lg={4} className="personality-item">
                            <div className="personality-circle">
                            <img src={`/images/genitive_testcharacter/${index + 1}.png`} alt={`Nhóm ${index + 1}`} />
                            </div>
                            <Text strong className="personality-label">Nhóm {index + 1}</Text>
                            <Text strong className="personality-label">
                                Người {name}
                            </Text>
                        </Col>
                    ))}
                </Row>


                <Row gutter={[50, 50]} className="personality-grid personality-grid--second-row" justify="center">
                    {["Trung Thành", "Nhiệt Tình", "Thử Thách", "Hòa Bình"].map((name, index) => (
                        <Col key={index} xs={12} sm={8} md={6} lg={4} className="personality-item">
                            <div className="personality-circle">
                            <img src={`/images/genitive_testcharacter/${index + 1}.png`} alt={`Nhóm ${index + 1}`} />
                            </div>
                            <Text strong className="personality-label">Nhóm {index + 6}</Text>
                            <Text strong className="personality-label">
                                Người {name}
                            </Text>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default TestCharacter;
