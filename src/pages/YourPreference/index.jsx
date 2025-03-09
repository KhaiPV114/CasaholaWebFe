import { clientToken } from "@/api";
import { AuthContext } from "@/context/authContext";
import { NotificationContext } from "@/context/notificationContext";
import { Button, Card, Form, message, Select, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./yourpreference.scss";

const { Title, Paragraph } = Typography;
const { Option } = Select;

const getCategoryTitle = (category) => {
  const titles = {
    purpose: "MỤC TIÊU",
    budget: "NGÂN SÁCH",
    moneyOpinion: "QUAN ĐIỂM VỀ TIỀN BẠC",
    habit: "THÓI QUEN SINH HOẠT",
    timeActivate: "GIỜ GIẤC",
    hobby: "SỞ THÍCH",
    hygiene: "VỆ SINH",
    outsider: "NGƯỜI NGOÀI",
    pet: "THÚ CƯNG",
    cooking: "NẤU ĂN",
    vehicle: "PHƯƠNG TIỆN DI CHUYỂN",
    region: "KHU VỰC ƯU TIÊN",
    sharingWay: "CÁCH CHIA SẺ KHÔNG GIAN",
  };
  return titles[category] || category;
};

const YourPreferenceForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [preferences, setPreferences] = useState({});
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);
  const options = {
    purpose: [
      "Chỉ cần ở chung",
      "Cùng học tập, hỗ trợ nhau",
      "Cùng làm việc, tạo động lực",
      "Chia sẻ sở thích",
      "Tìm bạn trọ lâu dài",
      "Không có nhu cầu giao tiếp",
    ],
    budget: [
      "Càng rẻ càng tốt",
      "Dưới 1 triệu đồng",
      "1 triệu đến 3 triệu đồng",
      "3 triệu đến 5 triệu đồng",
      "5 triệu đồng trở lên",
      "Thoải mái về giá cả",
    ],
    moneyOpinion: [
      "Rõ ràng, thẳng thắn",
      "Có thể linh hoạt, hỗ trợ nhau khi cần",
      "Tự chi trả",
      "Chia đều",
      "Thoải mái về giá cả",
      "Không tính toán nhỏ nhặt",
    ],
    habit: [
      "Ngăn nắp, sạch sẽ, thích gọn gàng",
      "Thoải mái",
      "Giờ giấc linh hoạt",
      "Muốn không gian yên tĩnh, ít ồn ào",
      "Thích đông vui, trò chuyện nhiều",
      "Học tập tại phòng, cần yên tĩnh",
    ],
    timeActivate: [
      "Ngủ sớm, dậy sớm",
      "Thức khuya",
      "Linh hoạt",
      "Tôn trọng, riêng biệt thời gian",
      "Đi sớm về khuya",
      "Làm đêm",
    ],
    hobby: [
      "Nghệ thuật, âm nhạc",
      "Thể thao, vận động",
      "Game, công nghệ",
      "Nấu ăn, thử món mới",
      "Du lịch, khám phá",
      "Quay TikTok",
    ],
    hygiene: [
      "Dọn dẹp thường xuyên",
      "Phân chia lịch dọn",
      "Chỉ cần không quá bừa bộn",
      "Không quan trọng",
      "Thuê người dọn định kỳ",
      "Tự dọn của mình",
    ],
    outsider: [
      "Hạn chế người lạ đến phòng",
      "Đến vào khung giờ nhất định",
      "Chỉ cần không quá bừa bộn",
      "Không quan trọng",
      "Không cho người lạ vào",
      "Thoải mái",
    ],
    pet: [
      "Không nuôi thú cưng",
      "Chỉ nuôi thú nhỏ",
      "Nuôi chó/mèo",
      "Dị ứng lông động vật",
      "Sẵn sàng chia sẻ việc chăm sóc",
      "Thoả thuận trước",
    ],
    cooking: [
      "Tự nấu ăn",
      "Ăn ngoài",
      "Chia sẻ cùng nhau",
      "Tự ăn riêng",
      "Không thích mùi đồ ăn trong phòng",
      "Phân chia bếp riêng",
    ],
    vehicle: [
      "Xe máy",
      "Xe đạp",
      "Đi bộ",
      "Ô tô",
      "Phương tiện công cộng",
      "Không có phương tiện di chuyển",
    ],
    region: [
      "Gần trường học/ làm việc",
      "Gần trung tâm",
      "Khu yên tĩnh",
      "Nhiều tiện ích xung quanh",
      "Không quan trọng, miễn phòng tốt",
      "An ninh tốt",
    ],
    sharingWay: [
      "Thoải mái, có thể dùng chung đồ",
      "Khu vực riêng, hạn chế dùng chung",
      "Căn riêng tư",
      "Thoải mái",
      "Giường riêng",
      "Chung giường",
    ],
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  useEffect(() => {
    clientToken
      .get("/criterias")
      .then((res) => {
        if (res.data?.criteria) {
          navigate("/");
        }
      })
      .catch(() => {
        navigate("/500");
      });
  }, [navigate]);

  const handleChange = (category, value) => {
    setPreferences((prev) => ({ ...prev, [category]: value }));
    localStorage.setItem(
      "roommate_preferences",
      JSON.stringify({ ...preferences, [category]: value })
    );
  };

  const validateForm = () => {
    const missingFields = Object.keys(options).filter(
      (field) => !preferences[field]
    );
    if (missingFields.length > 0) {
      message.error("Vui lòng chọn đầy đủ các tiêu chí");
      return false;
    }
    return true;
  };

  const onFinish = () => {
    if (validateForm()) {
      clientToken
        .post("/criterias", preferences)
        .then(() => {
          showNotification("success", "Thêm tiêu chí thành công!");
          navigate("/");
        })
        .catch(() => {
          showNotification("error", "Đã có lỗi xảy ra!");
          navigate("/500");
        });
    }
  };

  return (
    <div className="card-critera">
      <Card className="roommate-preference-form">
        <div style={{ margin: 15 }}>
          <Title level={2} className="title">
            TIÊU CHÍ VỀ BẢN THÂN
          </Title>
          <Paragraph className="description">
            Chọn những tiêu chí về bản thân bạn
          </Paragraph>
        </div>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          {Object.keys(options).map((category) => (
            <Form.Item key={category} label={getCategoryTitle(category)}>
              <Select
                placeholder="Chọn một tùy chọn"
                onChange={(value) => handleChange(category, value)}
              >
                {options[category].map((option, index) => (
                  <Option key={index} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ))}
          <div className="action-buttons">
            <Button
              type="link"
              className="title"
              onClick={() => navigate("/quiz")}
            >
              LÀM TRẮC NGHIỆM TÍNH CÁCH
            </Button>
            <Button
              type="primary"
              className="confirm-button"
              style={{
                backgroundColor: "#F95B01",
                color: "white",
                width: "150px",
              }}
              shape="round"
              size="large"
              loading={loading}
              htmlType="submit"
            >
              XÁC NHẬN
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default YourPreferenceForm;
