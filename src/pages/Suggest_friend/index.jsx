import React, { useState } from 'react';
import { Card, Button, Row, Col, Typography, Tooltip, Image } from 'antd';
import { CloseOutlined, HeartFilled, StarOutlined, MessageOutlined } from '@ant-design/icons';
import './suggest.scss';

const { Title, Paragraph } = Typography;

const initialProfiles = [
  { id: 1, name: 'Kieu Minh Trang', school: 'FPTU', location: 'Hòa Lạc, Hà Nội', workplace: 'Công ty 1 thành viên', address: 'Hoa Lac Hi-tech Park, km 29, Đại lộ, Thăng Long, Hà Nội', online: 'Trực tuyến' },
  { id: 2, name: 'Kieu Minh Trang', school: 'FPTU', location: 'Hòa Lạc, Hà Nội', workplace: 'Công ty 1 thành viên', address: 'Hoa Lac Hi-tech Park, km 29, Đại lộ, Thăng Long, Hà Nội', online: 'Trực tuyến' },
  { id: 3, name: 'Kieu Minh Trang', school: 'FPTU', location: 'Hòa Lạc, Hà Nội', workplace: 'Công ty 1 thành viên', address: 'Hoa Lac Hi-tech Park, km 29, Đại lộ, Thăng Long, Hà Nội', online: 'Trực tuyến' },
  { id: 4, name: 'Kieu Minh Trang', school: 'FPTU', location: 'Hòa Lạc, Hà Nội', workplace: 'Công ty 1 thành viên', address: 'Hoa Lac Hi-tech Park, km 29, Đại lộ, Thăng Long, Hà Nội', online: 'Trực tuyến' },
  { id: 5, name: 'Kieu Minh Trang', school: 'FPTU', location: 'Hòa Lạc, Hà Nội', workplace: 'Công ty 1 thành viên', address: 'Hoa Lac Hi-tech Park, km 29, Đại lộ, Thăng Long, Hà Nội', online: 'Trực tuyến' },
  { id: 6, name: 'Kieu Minh Trang', school: 'FPTU', location: 'Hòa Lạc, Hà Nội', workplace: 'Công ty 1 thành viên', address: 'Hoa Lac Hi-tech Park, km 29, Đại lộ, Thăng Long, Hà Nội', online: 'Trực tuyến' },
  { id: 7, name: 'Kieu Minh Trang', school: 'FPTU', location: 'Hòa Lạc, Hà Nội', workplace: 'Công ty 1 thành viên', address: 'Hoa Lac Hi-tech Park, km 29, Đại lộ, Thăng Long, Hà Nội', online: 'Trực tuyến' },
  { id: 8, name: 'Kieu Minh Trang', school: 'FPTU', location: 'Hòa Lạc, Hà Nội', workplace: 'Công ty 1 thành viên', address: 'Hoa Lac Hi-tech Park, km 29, Đại lộ, Thăng Long, Hà Nội', online: 'Trực tuyến' },
  { id: 9, name: 'Kieu Minh Trang', school: 'FPTU', location: 'Hòa Lạc, Hà Nội', workplace: 'Công ty 1 thành viên', address: 'Hoa Lac Hi-tech Park, km 29, Đại lộ, Thăng Long, Hà Nội', online: 'Trực tuyến' },
  { id: 10, name: 'Kieu Minh Trang', school: 'FPTU', location: 'Hòa Lạc, Hà Nội', workplace: 'Công ty 1 thành viên', address: 'Hoa Lac Hi-tech Park, km 29, Đại lộ, Thăng Long, Hà Nội', online: 'Trực tuyến' },
  { id: 11, name: 'Kieu Minh Trang', school: 'FPTU', location: 'Hòa Lạc, Hà Nội', workplace: 'Công ty 1 thành viên', address: 'Hoa Lac Hi-tech Park, km 29, Đại lộ, Thăng Long, Hà Nội', online: 'Trực tuyến' },
];

const Guess = () => {
  const [profiles, setProfiles] = useState(initialProfiles.slice(0, 4).map(profile => ({ ...profile, showDetails: false })));
  const [showAdditional, setShowAdditional] = useState(false);
  const [displayCount, setDisplayCount] = useState(4);

  const handleAddMoreResults = () => {
    const newDisplayCount = displayCount + 4;
    const newProfiles = initialProfiles.slice(0, newDisplayCount).map(profile => ({ ...profile, showDetails: false }));
    setProfiles(newProfiles);
    setDisplayCount(newDisplayCount);
    if (newDisplayCount >= initialProfiles.length) {
      setShowAdditional(true);
    }
  };

  const handleReset = () => {
    const resetProfiles = initialProfiles.slice(0, 4).map(profile => ({ ...profile, showDetails: false }));
    setProfiles(resetProfiles);
    setDisplayCount(4);
    setShowAdditional(false);
  };

  const toggleDetails = (id) => {
    setProfiles(profiles.map(profile => 
      profile.id === id ? { ...profile, showDetails: !profile.showDetails } : profile
    ));
  };

  return (
    <div className="guess-container">
      <div className="guess-header">
        <Title level={2} style={{ color: 'white', margin: '0' }}>GỢI Ý BẠN TRỢ</Title>
        <Paragraph style={{ color: 'white', marginTop: '8px' }}>
          Chọn bất kỳ gợi ý bạn trợ phù hợp với bạn
        </Paragraph>
      </div>
      
      <Row gutter={[16, 16]} className="profile-row">
        {profiles.map(profile => (
          <Col xs={24} sm={12} md={8} lg={6} key={profile.id}>
            <div className="profile-wrapper">
              <Card
                className="profile-card"
                cover={
                  <div className="profile-cover">
                    <img className="profile-image" src="./guess_test.jpg" />
                    <div className="profile-text-bottom">
                      <Title level={5} className="profile-name">
                        {profile.name} • {profile.school}
                      </Title>
                      {profile.showDetails && (
                        <>
                          <Paragraph className="profile-text">{profile.location}</Paragraph>
                          <Paragraph className="profile-text">{profile.workplace}</Paragraph>
                          <Paragraph className="profile-text">Địa chỉ: {profile.address}</Paragraph>
                          <Paragraph className="profile-text">Hoạt động: {profile.online}</Paragraph>
                        </>
                      )}
                      <Button 
                        type="link" 
                        onClick={() => toggleDetails(profile.id)}
                        className="toggle-details-button"
                      >
                        {profile.showDetails ? 'Ẩn bớt' : 'Xem thêm'}
                      </Button>
                    </div>
                    
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
                  </div>
                }
                bordered={false}
              >
              </Card>
              <Button className="chat-button" icon={<MessageOutlined />}>TRÒ CHUYỆN NGAY</Button>
            </div>
          </Col>
        ))}
      </Row>
      
      <div className="action-buttons-container">
        <Button className="add-results-button" onClick={handleAddMoreResults} disabled={showAdditional}>
          THÊM KẾT QUẢ
        </Button>
        <Button className="reset-button" onClick={handleReset}>
          TRANG CHỦ
        </Button>
      </div>
    </div>
  );
};

export default Guess;