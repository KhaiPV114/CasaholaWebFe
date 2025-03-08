import React, { useState } from 'react';
import { Card, Button, Row, Col, Typography, Tooltip, Modal, Image } from 'antd';
import { CloseOutlined, HeartFilled, StarOutlined, MessageOutlined } from '@ant-design/icons';
import './suggest.scss';

const { Title, Paragraph } = Typography;

const initialProfiles = [
  { id: 1, name: 'Kieu Minh Trang', school: 'FPTU', location: 'Hòa Lạc, Hà Nội', workplace: 'Công ty 1 thành viên', address: 'Hoa Lac Hi-tech Park, km 29, Đại lộ, Thăng Long, Hà Nội', online: 'Trực tuyến', images: ['./guess_test.jpg', './guess_test2.jpg'] },
  { id: 2, name: 'Kieu Minh Trang', school: 'FPTU', location: 'Hòa Lạc, Hà Nội', workplace: 'Công ty 1 thành viên', address: 'Hoa Lac Hi-tech Park, km 29, Đại lộ, Thăng Long, Hà Nội', online: 'Trực tuyến', images: ['./guess_test.jpg', './guess_test2.jpg'] }
];

const Guess = () => {
  const [profiles, setProfiles] = useState(initialProfiles.slice(0, 4));
  const [selectedProfile, setSelectedProfile] = useState(null);

  const openProfileDetails = (profile) => {
    setSelectedProfile(profile);
  };

  const closeProfileDetails = () => {
    setSelectedProfile(null);
  };

  return (
    <div className="guess-container">
      <div className="guess-header">
        <Title level={2} style={{ color: "white", margin: "0" }}>
          GỢI Ý BẠN TRỢ
        </Title>
        <Paragraph style={{ color: "white", marginTop: "8px" }}>
          Chọn bất kỳ gợi ý bạn trợ phù hợp với bạn
        </Paragraph>
      </div>

      <Row gutter={[16, 16]} className="profile-row">
        {profiles.map((profile) => (
          <Col xs={24} sm={12} md={8} lg={6} key={profile.id}>
            <Card
              className="profile-card"
              cover={<img className="profile-image" src={profile.images[0]} alt="Profile" />}
              bordered={false}
            >
              <Title level={5} className="profile-name">{profile.name} • {profile.school}</Title>
              <Button type="link" onClick={() => openProfileDetails(profile)}>Xem thêm</Button>
              <div className="action-buttons">
                <Tooltip title="Từ chối">
                  <Button shape="circle" icon={<CloseOutlined />} className="reject-button" />
                </Tooltip>
                <Tooltip title="Thích">
                  <Button shape="circle" icon={<HeartFilled />} className="like-button" />
                </Tooltip>
                <Tooltip title="Đánh dấu">
                  <Button shape="circle" icon={<StarOutlined />} className="star-button" />
                </Tooltip>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      
      {selectedProfile && (
        <Modal
          visible={!!selectedProfile}
          title={selectedProfile.name}
          onCancel={closeProfileDetails}
          footer={null}
          width={600}
        >
          <Image.PreviewGroup>
            {selectedProfile.images.map((img, index) => (
              <Image key={index} width={200} src={img} alt="Profile" />
            ))}
          </Image.PreviewGroup>
          <Paragraph>{selectedProfile.location}</Paragraph>
          <Paragraph>{selectedProfile.workplace}</Paragraph>
          <Paragraph>Địa chỉ: {selectedProfile.address}</Paragraph>
          <Paragraph>Hoạt động: {selectedProfile.online}</Paragraph>
          <Button type="primary" icon={<MessageOutlined />}>TRÒ CHUYỆN NGAY</Button>
        </Modal>
      )}
    </div>
  );
};

export default Guess;
