import React from 'react';
import { Row, Col, Button } from 'antd';
import { CheckCircleFilled, ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import CustomCardHome from '@/components/CustomCardHome';
import s from "@/pages/Home/styles.module.scss";
import { Content } from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';
import CustomCardUser from '@/components/CustomCardUser';

const Home = () => (
    <Content>
        <Row className={s.section}>
            <Col span={12} className={s['section-left']}>
                <Title level={1} className={s.title}>TÌM BẠN Ở GHÉP SIÊU CHẤT LƯỢNG!</Title>
                <Paragraph className={s.description}>
                    Không còn nỗi lo ở ghép với người không phù hợp, đã có CasaHola giúp bạn.
                </Paragraph>
                <Button className={s.button}>BẮT ĐẦU NGAY</Button>

                <div className={s.features}>
                    <div className={s['feature-item']}>
                        <CheckCircleFilled style={{ color: '#19BD00', fontSize: '20px' }} />
                        Uy tín, chất lượng
                    </div>
                    <div className={s['feature-item']}>
                        <ClockCircleOutlined style={{ color: '#059AFF', fontSize: '20px' }} />
                        Ghép nối nhanh chóng, thuận tiện
                    </div>
                    <div className={s['feature-item']}>
                        <UserOutlined style={{ color: '#014766', fontSize: '20px' }} />
                        Bảo mật thông tin người dùng
                    </div>
                </div>
            </Col>
            <Col span={12} style={{ textAlign: 'center' }}>
                <img src="./Penguin.png" style={{ height: '400px' }} alt="Penguin" />
            </Col>
        </Row>

        <div className={s.divider}></div>

        <Row className={s.featureSection}>
            <Col span={24} className={s['featureSection-info']}>
                <Title level={1} className={s.title}>TÍNH NĂNG TÌM BẠN Ở GHÉP CỦA CASAHOLA</Title>
                <Paragraph className={s.description}>
                    CASA HOLA dựa trên tính cách và nhu cầu cá nhân giúp bạn dễ dàng trong việc tìm kiếm <strong>BẠN Ở GHÉP</strong> trực tuyến!
                </Paragraph>
                <Row className={s.card}>
                    <Col span={8}>
                        <CustomCardHome url="./TestCharacter.png" title="TRẮC NGHIỆM TÍNH CÁCH MIỄN PHÍ" />
                    </Col>
                    <Col span={8}>
                        <CustomCardHome url="./Feature2.png" title="XÁC ĐỊNH YẾU TỐ TRONG BẢN ĐỒ SAO CÁ NHÂN" />
                    </Col>
                    <Col span={8}>
                        <CustomCardHome url="./Feature3.png" title="LỌC NHU CẦU, GHÉP TÌM NHANH CHÓNG" />
                    </Col>
                </Row>
            </Col>
        </Row>

        {/* <Row className={s.topSearch}>
            <Col span={24}>
                <Title level={1} className={s.topTitle}>TOP BẠN TRỌ ĐANG TÌM KIẾM</Title>
                <Row className={s.profileUser}>

                    <Col>
                        <CustomCardUser image="./FA6002 (13).png"
                            name="NGUYEN VAN A"
                            school="FPTU, MC"
                            location="Thôn 3, Tân Xã"
                            description="Nhóm 4 - Người cá tính\nMọc Sư Tử, Sun Bảo Bình, Moon Nhân Mã\nNấu ăn, âm nhạc, game,... Xem thêm" />
                    </Col>
                    <Col >
                        <CustomCardUser image="./FA6002 (13).png"
                            name="NGUYEN VAN A"
                            school="FPTU, MC"
                            location="Thôn 3, Tân Xã"
                            description="Nhóm 4 - Người cá tính\nMọc Sư Tử, Sun Bảo Bình, Moon Nhân Mã\nNấu ăn, âm nhạc, game,... Xem thêm" />
                    </Col>
                    <Col >
                        <CustomCardUser image="./FA6002 (13).png"
                            name="NGUYEN VAN A"
                            school="FPTU, MC"
                            location="Thôn 3, Tân Xã"
                            description="Nhóm 4 - Người cá tính\nMọc Sư Tử, Sun Bảo Bình, Moon Nhân Mã\nNấu ăn, âm nhạc, game,... Xem thêm" />
                    </Col>

                </Row>

            </Col>
        </Row> */}
        <div className={s.divider}></div>


        <div className={s.cta}>
            <Col><h1 className={s.title}>ROOMATE TÌM KHÔNG RA, CÓ CASAHOLA!</h1></Col>
            <Col><button className={s.button}>TRẢI NGHIỆM NGAY</button>    </Col>
            <Row>
                <Col span={6}>                <img src="./Penguin.png" style={{ height: '200px' }} alt="Penguin" />
                </Col>
            </Row>
        </div>
    </Content>
);

export default Home;
