import React from "react";
import { Card, Typography, Space } from "antd";
import { CloseOutlined, HeartFilled, StarFilled } from "@ant-design/icons";
import styles from "./styles.module.scss";

const { Title, Text } = Typography;

const CustomCardUser = ({ image, name, school, location, description }) => {
    return (
        <Card className={styles["custom-card"]} cover={
            <div className={styles["custom-card-cover"]}>
                <img alt={name} src={image} />
                <div className={styles["card-info"]}>
                    <Title level={5}>{name} <span>{school}</span></Title>
                    <Text className={styles["info-text"]}>{location}</Text>
                    <Text className={styles["description"]}>{description}</Text>
                </div>
            </div>
        }>
            <Space className={styles["custom-card-actions"]}>
                <CloseOutlined className={`${styles.icon} ${styles["close-icon"]}`} />
                <HeartFilled className={`${styles.icon} ${styles["heart-icon"]}`} />
                <StarFilled className={`${styles.icon} ${styles["star-icon"]}`} />
            </Space>
        </Card>
    );
};

export default CustomCardUser;
