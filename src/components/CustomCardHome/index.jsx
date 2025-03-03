import React from "react";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";


const CustomCardHome = ({ url, title }) => {
    return (
        <Card
            hoverable
            style={{
                width: 280,
                height: 320,
                borderRadius: 10,
                overflow: "hidden",
                padding: 0,
                border: "none",
                background: "linear-gradient(to bottom, #ff7f00, white)",
            }}
            cover={
                <img
                    alt={title}
                    src={url}
                    style={{
                        width: "100%",
                        height: 180,
                        objectFit: "cover",
                        margin: 0
                    }}
                />
            }
        >
            <Meta title={<span style={{ whiteSpace: "pre-line", fontSize: "16px", fontWeight: "700" }}>{title}</span>} />
        </Card>
    );
};

export default CustomCardHome;
