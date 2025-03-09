import { AuthContext } from '@/context/authContext';
import { CloseOutlined, HeartFilled, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Button, Card, Col, Modal, Row, Tooltip, Typography } from 'antd';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './suggest.scss';

const { Title, Paragraph } = Typography;

const Guess = ({friend}) => {
  const [profiles] = useState(friend.slice(0, 4));
  const [selectedProfile, setSelectedProfile] = useState(null);
  const {user } = useContext(AuthContext);
  const navigate = useNavigate()

  const openProfileDetails = (profile) => {
    setSelectedProfile(profile);
  };

  const closeProfileDetails = () => {
    setSelectedProfile(null);
  };

  const chatNow = () => {
      if(user.packageType === "NONE") {
        navigate("/package")
      }else {
        navigate("/chatroom")
      }
  }

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
              style={{height : '100px'}}
              // cover={<img className="profile-image" src={profile.profileImage || './guess-test2.jpg'} alt="Profile" />}
              cover={<img className="profile-image" src={'./guess_test.jpg'} alt="Profile" />}
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
          {/* <Image.PreviewGroup>
            {selectedProfile.images.map((img, index) => (
              <Image key={index} width={200} src={img} alt="Profile" />
            ))}
          </Image.PreviewGroup> */}
          <Paragraph>{selectedProfile.za}</Paragraph>
          <Paragraph>{selectedProfile.workplace}</Paragraph>
          <Paragraph>Địa chỉ: {selectedProfile.address}</Paragraph>
          <Paragraph>Hoạt động: {selectedProfile.online}</Paragraph>
          <Button type="primary" onClick={chatNow} icon={<MessageOutlined />}>TRÒ CHUYỆN NGAY</Button>
        </Modal>
      )}
    </div>
  );
};

export default Guess;
