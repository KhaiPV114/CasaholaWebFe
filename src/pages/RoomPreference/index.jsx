import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  Typography,
  Row,
  Col,
  Button,
  message,
  Form,
  Checkbox,
} from "antd";
import { useNavigate } from "react-router-dom";
import "./roompreference.scss";
import { clientToken } from "@/api";
import Guess from "../Suggest_friend";
import { UseNotification } from "@/context/useNotification";

const { Title, Paragraph } = Typography;

const PreferenceSection = ({ title, options, selectedOption, onChange }) => {
  const handleSelect = (option) => {
    onChange(selectedOption === option ? "" : option);
  };

  return (
    <div className="preference-section">
      <Title level={5} style={{ marginBottom: 16 }}>
        {title}
      </Title>
      <Row gutter={[16, 16]}>
        {options.map((option, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6} xl={4}>
            <Button
              type="default"
              shape="round"
              className={selectedOption === option ? "selected-option" : ""}
              onClick={() => handleSelect(option)}
            >
              {option}
            </Button>
          </Col>
        ))}
      </Row>
    </div>
  );
};

const RoomPreferenceForm = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [friend, setFriend] = useState();
  const [form] = Form.useForm();
  const [matchPersonality, setMatchPersonality] = useState(false); // ✅ Thêm checkbox trạng thái
  const { showNotification } = useContext(UseNotification);
  const [preferences, setPreferences] = useState({
    purpose: "",
    budget: "",
    moneyOpinion: "",
    habit: "",
    timeActivate: "",
    hobby: "",
    hygiene: "",
    outsider: "",
    pet: "",
    cooking: "",
    vehicle: "",
    region: "",
    sharingWay: "",
  });

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
      "Không cho người ngoài vào",
    ],
    pet: [
      "Không nuôi thú cưng",
      "Chỉ nuôi thú nhỏ (chuột hamster, cá, ...)",
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
      "Không có phương tiện đi chuyển",
    ],
    region: [
      "Gần trường học/ làm việc",
      "Gần trung tâm",
      "Khu yên tĩnh, ít ồn ào",
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

  const handlePreferenceChange = (category, newSelectedOption) => {
    setPreferences((prev) => ({ ...prev, [category]: newSelectedOption }));
  };

  const onFinish = () => {
    const fields = Object.keys(options);
    let data = {};

    fields.forEach((f) => {
      if (preferences[f] !== "") {
        data[f] = preferences[f];
      }
    });

    clientToken.put("/criterias/find-room-match", data).then((res) => {
      console.log(res.data);
      if (res.data.length > 0) {
        setFriend(res.data);
        setShow(true);
      } else {
        showNotification("warning", "Không có người nào!");
      }
    });
  };

  const handleGoBack = () => {
    navigate("/quiz");
  };

  return !show ? (
    <Card className="roommate-preference-form">
      <div style={{ margin: 15 }}>
        <Title level={2} className="title">
          NHU CẦU BẠN TRỌ
        </Title>
        <Paragraph className="description">
          Bạn mong muốn tìm bạn trọ đáp ứng những tiêu chí nào?
        </Paragraph>
      </div>

      <Form
        form={form}
        layout="vertical"
        name="roommate_preference_form"
        onFinish={onFinish}
      >
        {Object.keys(options).map((category) => (
          <PreferenceSection
            key={category}
            title={category.toUpperCase()}
            options={options[category]}
            selectedOption={preferences[category]}
            onChange={(newSelectedOption) =>
              handlePreferenceChange(category, newSelectedOption)
            }
          />
        ))}

        <div className="personality-checkbox">
          <Checkbox
            checked={matchPersonality}
            onChange={(e) => setMatchPersonality(e.target.checked)}
          >
            Tìm bạn có tính cách tương thích
          </Checkbox>
        </div>

        <div className="action-buttons">
          <div className="back-link" onClick={handleGoBack}>
            LÀM TRẮC NGHIỆM TÍNH CÁCH
          </div>
          <Button
            className="next-button"
            shape="round"
            size="large"
            htmlType="submit"
          >
            TÌM KIẾM
          </Button>
        </div>
      </Form>
    </Card>
  ) : (
    <Guess friend={friend || []} />
  );
};

export default RoomPreferenceForm;
