import React from "react";
import { Layout, Row, Col, Typography } from "antd";
import { FacebookFilled, InstagramFilled, TikTokFilled } from "@ant-design/icons";
import s from "./styles.module.scss";

const { Footer } = Layout;
const { Title, Paragraph } = Typography;

const CustomFooter = () => {
    return (
        <Footer className={s.footer}>
            <Row gutter={[16, 16]} justify="center">
                <Col xs={24} sm={12} md={6}>
                    <Title level={4} className={s.title}>CASAHOLA</Title>
                    <Paragraph className={s.text}>Book your trip in minutes, get full control for much longer.</Paragraph>
                </Col>

                <Col xs={24} sm={12} md={6}>
                    <Title level={5} className={s.subtitle}>Company</Title>
                    <Paragraph><a href="#">About</a></Paragraph>
                    <Paragraph><a href="#">Careers</a></Paragraph>
                    <Paragraph><a href="#">Mobile</a></Paragraph>
                </Col>

                <Col xs={24} sm={12} md={6}>
                    <Title level={5} className={s.subtitle}>Contact</Title>
                    <Paragraph><a href="#">Help/FAQ</a></Paragraph>
                    <Paragraph><a href="#">Press</a></Paragraph>
                    <Paragraph><a href="#">Affiliates</a></Paragraph>
                </Col>

                <Col xs={24} sm={12} md={6}>
                    <Title level={5} className={s.subtitle}>Follow Us</Title>
                    <div className={s.socialIcons}>
                        <FacebookFilled className={`${s.icon} ${s.facebook}`} />
                        <InstagramFilled className={`${s.icon} ${s.instagram}`} />
                        <TikTokFilled className={`${s.icon} ${s.youtube}`} />
                    </div>
                </Col>
            </Row>

            <div className={s.copyright}>
                <Paragraph>© 2025 Casahola. All rights reserved.</Paragraph>
            </div>
        </Footer>
    );
};

export default CustomFooter;
