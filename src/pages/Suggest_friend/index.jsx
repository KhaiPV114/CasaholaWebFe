import { clientToken } from "@/api";
import { AuthContext } from "@/context/authContext";
import { NotificationContext } from "@/context/notificationContext";
import { CloseOutlined, HeartFilled, MessageOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Modal,
  Pagination,
  Row,
  Tooltip,
  Typography,
} from "antd";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./suggest.scss";

const { Meta } = Card;

const { Title, Paragraph } = Typography;
const PAGE_SIZE = 4; // Số người hiển thị mỗi trang

const Guess = ({ friend }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const { user, likes, setLikes, matchs } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);
  const navigate = useNavigate();

  const openProfileDetails = (profile) => {
    setSelectedProfile(profile);
  };

  const closeProfileDetails = () => {
    setSelectedProfile(null);
  };

  const chatNow = (id) => {
    if (user.packageType === "NONE" && !matchs.includes(id)) {
      navigate("/package");
    } else {
      navigate(`/chatroom?chooseUid=${id}`);
    }
  };

  const like = (sourceUid) => {
    clientToken
      .post("likes", {
        targetUid: user.id,
        sourceUid,
      })
      .then(() => {
        setLikes([...likes, sourceUid]);
        showNotification("success", "Đã thêm vào khỏi danh sách yêu thích!");
      })
      .catch(() => {
        navigate("/500");
      });
  };

  const unlike = (sourceUid) => {
    clientToken
      .put("likes", {
        targetUid: user.id,
        sourceUid,
      })
      .then(() => {
        setLikes(likes.filter((uid) => uid !== sourceUid));
        showNotification("success", "Đã loại bỏ ra khỏi danh sách yêu thích!");
      })
      .catch(() => {
        navigate("/500");
      });
  };

  // Xác định dữ liệu trang hiện tại
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedProfiles = friend.slice(startIndex, startIndex + PAGE_SIZE);

  console.log(selectedProfile); 


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
              style={{ height: "300px", transition: "transform 0.3s ease" }}
              bordered={false}
            >
              <img className="profile-image" src={profile.profileImage|| "./Profile.png"} alt="Profile"
                style={{ width: "100%", height: "150px", objectFit: "cover" }} />

              <Meta title={profile.fullName || "Tên chưa có"}/>

              <div className="action-buttons">
                {likes && likes.includes(profile._id) && (
                  <Tooltip title="Bỏ thích">
                    <Button
                      shape="circle"
                      icon={<CloseOutlined />}
                      className="reject-button"
                      onClick={() => unlike(profile._id)}
                    />
                  </Tooltip>
                )}

                {likes && !likes.includes(profile._id) && (
                  <Tooltip title="Thích">
                    <Button
                      shape="circle"
                      icon={<HeartFilled />}
                      className="like-button"
                      onClick={() => like(profile._id)}
                    />
                  </Tooltip>
                )}

                <Tooltip title="Chát ngay">
                  <Button
                    shape="circle"
                    icon={<MessageOutlined />}
                    className="star-button"
                    onClick={() => openProfileDetails(profile)}
                  />
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
          <Button
            type="primary"
            onClick={() => chatNow(selectedProfile._id)}
            icon={<MessageOutlined />}
          >
            TRÒ CHUYỆN NGAY
          </Button>
        </Modal>
      )}
    </div>
  );
};

export default Guess;
