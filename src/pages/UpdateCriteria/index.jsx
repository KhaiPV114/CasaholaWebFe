import React, { useContext, useEffect, useState } from "react";
import { Card, Button, Select, Form, Typography, Row, Col } from "antd";
import { LeftOutlined, HomeOutlined, SaveOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/useContext";

const { Title } = Typography;
const { Option } = Select;

const UpdateCriteriaPage = () => {
  const navigate = useNavigate();
  
  // Danh sách các tùy chọn
  const options = {
    purpose: [ "Chỉ cần ở chung", "Cùng học tập, hỗ trợ nhau", "Cùng làm việc, tạo động lực", "Chia sẻ sở thích", "Tìm bạn trọ lâu dài", "Không có nhu cầu giao tiếp"],
    budget: [ "Càng rẻ càng tốt", "Dưới 1 triệu đồng", "1 triệu đến 3 triệu đồng", "3 triệu đến 5 triệu đồng", "5 triệu đồng trở lên", "Thoải mái về giá cả"],
    moneyOpinion: [ "Rõ ràng, thẳng thắn", "Có thể linh hoạt, hỗ trợ nhau khi cần", "Tự chi trả", "Chia đều", "Thoải mái về giá cả", "Không tính toán nhỏ nhặt"],
    habit: [ "Ngăn nắp, sạch sẽ, thích gọn gàng", "Thoải mái", "Giờ giấc linh hoạt", "Muốn không gian yên tĩnh, ít ồn ào", "Thích đông vui, trò chuyện nhiều", "Học tập tại phòng, cần yên tĩnh"],
    timeActivate: [ "Ngủ sớm, dậy sớm", "Thức khuya", "Linh hoạt", "Tôn trọng, riêng biệt thời gian", "Đi sớm về khuya", "Làm đêm"],
    hobby: [ "Nghệ thuật, âm nhạc", "Thể thao, vận động", "Game, công nghệ", "Nấu ăn, thử món mới", "Du lịch, khám phá", "Quay TikTok"],
    hygiene: [ "Dọn dẹp thường xuyên, có lịch rõ ràng", "Phân chia lịch dọn", "Chỉ cần không quá bừa bộn", "Không quan trọng", "Thuê người dọn định kỳ", "Tự dọn của mình"],
    outsider: [ "Hạn chế người lạ đến phòng", "Đến vào khung giờ nhất định", "Thoải mái", "Hạn chế người khác qua đêm", "Tự dọn của mình"],
    pet: [ "Không nuôi thú cưng", "Chỉ nuôi thú nhỏ (chuột hamster, cá, ...)", "Nuôi chó/mèo", "Dị ứng lông động vật", "Sẵn sàng chia sẻ việc chăm sóc", "Thoả thuận trước"],
    cooking: [ "Tự nấu ăn", "Ăn ngoài", "Chia sẻ cùng nhau", "Tự ăn riêng", "Không thích mùi đồ ăn trong phòng", "Phân chia bếp riêng"],
    vehicle: [ "Xe máy", "Xe đạp", "Đi bộ", "Ô tô", "Phương tiện công cộng", "Không có phương tiện đi chuyển"],
    region: [ "Gần trường học/ làm việc", "Gần trung tâm", "Khu yên tĩnh, ít ồn ào", "Nhiều tiện ích xung quanh", "Không quan trọng, miễn phòng tốt", "An ninh tốt"],
    sharingWay: [ "Thoải mái, có thể dùng chung đồ", "Khu vực riêng, hạn chế dùng chung", "Căn riêng tư", "Thoải mái", "Giường riêng", "Chung giường"]
  };

  // State lưu dữ liệu đã chọn
  const [selectedValues, setSelectedValues] = useState({});
  const {user} = useContext(AuthContext);

  useEffect(() => {
    if(!user) {
      navigate("/login")
    }
  })

  useEffect(() => {
    // Lấy dữ liệu từ localStorage nếu có
    const storedData = JSON.parse(localStorage.getItem("selectedInfo")) || {};
    setSelectedValues(storedData);
  }, []);

  const handleChange = (key, value) => {
    setSelectedValues({ ...selectedValues, [key]: value });
  };

  const handleSave = () => {
    localStorage.setItem("selectedInfo", JSON.stringify(selectedValues));
    alert("Đã lưu thông tin!");
  };

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", textAlign: "center" }}>
      <Card 
        style={{ background: "white", borderRadius: 10, padding: 20, boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}
      >
        <Title level={3} style={{ color: "#F95B01" }}>Cập Nhật Thông Tin</Title>
        
        <Form layout="vertical">
          <Row gutter={16}>
            {Object.keys(options).map((key, index) => (
              <Col span={12} key={key}>
                <Form.Item label={<b>{key.toUpperCase()}</b>}>
                  <Select 
                    value={selectedValues[key] || undefined}
                    onChange={(value) => handleChange(key, value)}
                    placeholder="Chọn một tùy chọn"
                    style={{ width: "100%" }}
                  >
                    {options[key].map((option) => (
                      <Option key={option} value={option}>{option}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            ))}
          </Row>
        </Form>

        <div style={{ marginTop: 20 }}>
          <Button 
            type="primary" 
            icon={<SaveOutlined />} 
            onClick={handleSave}
            style={{ marginRight: 10, backgroundColor: "#FFA401", borderColor: "#FFA401" }}
          >
            Lưu
          </Button>
          <Button 
            type="primary" 
            icon={<LeftOutlined />} 
            onClick={() => navigate(-1)}
            style={{ marginRight: 10, backgroundColor: "#FFA401", borderColor: "#FFA401" }}
          >
            Quay lại
          </Button>
          <Button 
            type="primary" 
            icon={<HomeOutlined />} 
            onClick={() => navigate("/")} 
            style={{ backgroundColor: "#F95B01", borderColor: "#F95B01" }}
          >
            Trang chủ
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default UpdateCriteriaPage;
