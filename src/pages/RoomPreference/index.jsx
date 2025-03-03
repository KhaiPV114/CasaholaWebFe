import React, { useState, useEffect } from 'react';
import { Card, Typography, Row, Col, Button, message, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import './roompreference.scss'; 
import axios from 'axios';

const { Title, Paragraph } = Typography;

const PreferenceSection = ({ title, options, selectedOption, onChange }) => {
  const handleSelect = (option) => {
    if (selectedOption === option) {
      onChange('');
    } else {
      onChange(option);
    }
  };

  return (
    <div className="preference-section">
      <Title level={5} style={{ marginBottom: 16 }}>{title}</Title>
      <Row gutter={[16, 16]}>
        {options.map((option, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6} xl={4}>
            <Button 
              type="default" variant="text"
              shape="round"
              className={selectedOption === option ? 'selected-option' : ''}
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
  const [form] = Form.useForm();
  const [preferences, setPreferences] = useState({
    purpose: '',
    budget: '',
    moneyOpinion: '',
    habit: '',
    timeActivate: '',
    hobby: '',
    hygiene:'',
    outsider:'',
    pet:'',
    cooking: '',
    vehicle: '',
    region: '',
    sharingWay: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState({
    purpose: [ // MỤC TIÊU
      'Chỉ cần ở chung',
      'Cùng học tập, hỗ trợ nhau',
      'Cùng làm việc, tạo động lực',
      'Chia sẻ sở thích',
      'Tìm bạn trọ lâu dài',
      'Không có nhu cầu giao tiếp'
    ],
    budget: [ // NGÂN SÁCH
      'Càng rẻ càng tốt',
      'Dưới 1 triệu đồng',
      '1 triệu đến 3 triệu đồng',
      '3 triệu đến 5 triệu đồng',
      '5 triệu đồng trở lên',
      'Thoải mái về giá cả'
    ],
    moneyOpinion: [ // QUAN ĐIỂM VỀ TIỀN BẠC
      'Rõ ràng, thẳng thắn',
      'Có thể linh hoạt, hỗ trợ nhau khi cần',
      'Tự chi trả',
      'Chia đều',
      'Thoải mái về giá cả',
      'Không tính toán nhỏ nhặt'
    ],
    habit: [ // THÓI QUEN SINH HOẠT
      'Ngăn nắp, sạch sẽ, thích gọn gàng',
      'Thoải mái',
      'Giờ giấc linh hoạt',
      'Muốn không gian yên tĩnh, ít ồn ào',
      'Thích đông vui, trò chuyện nhiều',
      'Học tập tại phòng, cần yên tĩnh'
    ],
    timeActivate: [ // GIỜ GIẤC
      'Ngủ sớm, dậy sớm',
      'Thức khuya',
      'Linh hoạt',
      'Tôn trọng, riêng biệt thời gian',
      'Đi sớm về khuya',
      'Làm đêm'
    ],
    hobby: [ // SỞ THÍCH
      'Nghệ thuật, âm nhạc',
      'Thể thao, vận động',
      'Game, công nghệ',
      'Nấu ăn, thử món mới',
      'Du lịch, khám phá',
      'Quay TikTok'
    ],
    hygiene: [ // VỆ SINH
      'Dọn dẹp thường suyên, có lịch rõ ràng',
      'Phân chia lịch dọn',
      'Chỉ cần không quá bừa bộn',
      'Không quan trọng',
      'Thuê người dọn định kỳ',
      'Tự dọn của mình'
    ],
    outsider: [ // NGƯỜI NGOÀI
      'Hạn chế người lạ đến phòng',
      'Đến vào khung giờ nhất định',
      'Chỉ cần không quá bừa bộn',
      'Không quan trọng',
      'Thuê người dọn định kỳ',
      'Tự dọn của mình'
    ],
    pet: [ // THÚ CƯNG
      'Không nuôi thú cưng',
      'Chỉ nuôi thú nhỏ (chuột hamster, cá, ...)',
      'Nuôi chó/mèo',
      'Dị ứng lông động vật',
      'Sẵn sàng chia sẻ việc chăm sóc',
      'Thoả thuận trước'
    ],
    cooking: [ // NẤU ĂN
      'Tự nấu ăn',
      'Ăn ngoài',
      'Chia sẻ cùng nhau',
      'Tự ăn riêng',
      'Không thích mùi đồ ăn trong phòng',
      'Phân chia bếp riêng'
    ],
    vehicle: [ // PHƯƠNG TIỆN DI CHUYỂN
      'Xe máy',
      'Xe đạp',
      'Đi bộ',
      'Ô tô',
      'Phương tiện công cộng',
      'Không có phương tiện đi chuyển'
    ],
    region: [ // KHU VỰC ƯU TIÊN
     'Gần trường học/ làm việc',
      'Gần trung tâm',
      'Khu yên tĩnh, ít ồn ào',
      'Nhiều tiện ích xung quanh (siêu thị, quán ăn, gym...)',
      'Không quan trọng, miễn phòng tốt',
      'An ninh tốt'
    ],
    sharingWay: [ // CÁCH CHIA SẺ KHÔNG GIAN
      'Thoải mái, có thể dùng chung đồ',
      'Khu vực riêng, hạn chế dùng chung',
      'Căn riêng tư',
      'Thoải mái',
      'Giường riêng',
      'Chung giường'
    ]
  });
  

  useEffect(() => {
    
  }, []);

  const handlePreferenceChange = (category, newSelectedOption) => {
    const updatedPreferences = {
      ...preferences,
      [category]: newSelectedOption
    };
    
    setPreferences(updatedPreferences);
    
    // Lưu tạm vào localStorage - bạn sẽ thay thế bằng API call thực tế
    localStorage.setItem('roommate_preferences', JSON.stringify(updatedPreferences));
  };

  const validateForm = () => {

    const requiredFields = [
      'purpose', 
      'budget', 
      'moneyOpinion', 
      'habit',
      'timeActivate',
      'hobby',
      'hygiene',
      'outsider',
      'pet',
      'cooking',
      'vehicle',
      'region',
      'sharingWay'
    ];
    
    const missingFields = requiredFields.filter(field => !preferences[field]);
    
    if (missingFields.length > 0) {
      const missingFieldTitles = missingFields.map(field => getCategoryTitle(field));
      message.error(`Vui lòng chọn: ${missingFieldTitles.join(', ')}`);
      return false;
    }
    
    return true;
  };

  const onFinish =  (values) => {
    console.log("Values: ", preferences);
    
  };
  
  const handleGoBack = () => {
    console.log('Quay lại trang quiz');
    navigate('/quiz');
  };

  function getCategoryTitle(category) {
    const titles = {
      purpose: 'PURPOSE',
      budget: 'BUDGET',
      moneyOpinion: 'MONEY OPINION',
      habit: 'LIVING HABITS',
      timeActivate: 'TIME SCHEDULE',
      hobby: 'HOBBIES',
      hygiene: 'HYGIENE',
      outsider: 'VISITORS',
      pet: 'PETS',
      cooking: 'COOKING',
      vehicle: 'TRANSPORTATION',
      region: 'PREFERRED AREA',
      sharingWay: 'SPACE SHARING'
    };
    return titles[category] || category;
  }
  return (
    <Card className="roommate-preference-form">
      <div style={{margin: 15}}>
        <Typography.Title level={2} className="title" >
          NHU CẦU BẠN TRỌ
        </Typography.Title>
        <Paragraph className="description" >
        Bạn mong muốn tìm bạn trọ đáp ứng những tiêu chí nào?
        </Paragraph>
      </div>
      
      <Form form={form} layout="vertical" name="roommate_preference_form" onFinish={onFinish}>
        {Object.keys(options).map((category) => (
          <PreferenceSection
            key={category}
            title={getCategoryTitle(category)}
            options={options[category]}
            selectedOption={preferences[category]}
            onChange={(newSelectedOption) => handlePreferenceChange(category, newSelectedOption)}
          />
        ))}

        <div className="action-buttons">
          <div className="back-link" onClick={handleGoBack}>
            LÀM TRẮC NGHIỆM TÍNH CÁCH
          </div>
          <Button
            className="next-button"
            shape="round"
            size="large"
            loading={loading}
            htmlType='submit'
          >
            TIẾP THEO
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default RoomPreferenceForm;