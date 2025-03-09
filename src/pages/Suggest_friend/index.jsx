import { AuthContext } from '@/context/authContext';
import { CloseOutlined, HeartFilled, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Button, Card, Col, Modal, Row, Tooltip, Typography, Pagination } from 'antd';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './suggest.scss';

const { Title, Paragraph } = Typography;
const PAGE_SIZE = 4; // Số người hiển thị mỗi trang

const Guess = ({ friend }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const openProfileDetails = (profile) => {
    setSelectedProfile(profile);
  };

  const closeProfileDetails = () => {
    setSelectedProfile(null);
  };

  const chatNow = () => {
    if (user.packageType === "NONE") {
      navigate("/package");
    } else {
      navigate("/chatroom");
    }
  };

  // Xác định dữ liệu trang hiện tại
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedProfiles = friend.slice(startIndex, startIndex + PAGE_SIZE);

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
        {paginatedProfiles.map((profile) => (
          <Col xs={24} sm={12} md={8} lg={6} key={profile.id}>
            <Card
              hoverable
              className="profile-card"
              style={{ height: "250px", transition: "transform 0.3s ease" }}
              cover={<img className="profile-image" src={"./guess_test.jpg"} alt="Profile" />}
              bordered={false}
              onClick={() => openProfileDetails(profile)}
            >
              <Title level={5} className="profile-name">{profile.name} • {profile.school}</Title>
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

      {/* Phân trang */}
      <div className="pagination-container">
        <Pagination
          current={currentPage}
          total={friend.length}
          pageSize={PAGE_SIZE}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>

      {selectedProfile && (
        <Modal
          open={!!selectedProfile}
          title={selectedProfile.name}
          onCancel={closeProfileDetails}
          footer={null}
          width={600}
        >
          <Paragraph>{selectedProfile.za}</Paragraph>
          <Paragraph>{selectedProfile.workplace}</Paragraph>
          <Paragraph>Địa chỉ: {selectedProfile.address}</Paragraph>
          <Paragraph>Hoạt động: {selectedProfile.online}</Paragraph>
          <Button type="primary" onClick={chatNow} icon={<MessageOutlined />}>
            TRÒ CHUYỆN NGAY
          </Button>
        </Modal>
      )}
    </div>
  );
};

export default Guess;
