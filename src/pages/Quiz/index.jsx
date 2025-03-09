import React, { useContext, useEffect, useState } from 'react';
import { Radio, Button, Progress, Form } from 'antd';
import './quiz.scss';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { NotificationContext } from '@/context/notificationContext';

const questionsData = [
  {
    id: 1,
    text: "Tôi luôn cố gắng làm mọi thứ một cách hoàn hảo nhất có thể."
  },
  {
    id: 2,
    text: "Tôi dễ dàng nhập từ lỗi của người khác và muốn giúp họ sửa chữa."
  },
  {
    id: 3,
    text: "Tôi tin rằng những nguyên tắc và kỷ luật cần được tuân thủ."
  },
  {
    id: 4,
    text: "Tôi tin rằng những nguyên tắc và kỷ luật cần được tuân thủ."
  },
  {
    id: 5,
    text: "Tôi tin rằng những nguyên tắc và kỷ luật cần được tuân thủ."
  },
  {
    id: 6,
    text: "Tôi tin rằng những nguyên tắc và kỷ luật cần được tuân thủ."
  },
  {
    id: 7,
    text: "Tôi tin rằng những nguyên tắc và kỷ luật cần được tuân thủ."
  },
  {
    id: 8,
    text: "Tôi tin rằng những nguyên tắc và kỷ luật cần được tuân thủ."
  }
];

const radioOptions = [
  { value: 1, label: "Hoàn toàn không đúng", scale: 4 },
  { value: 2, label: "Hiếm khi", scale: 3 },
  { value: 3, label: "Lúc này lúc kia", scale: 2 },
  { value: 4, label: "Thường xuyên", scale: 3 },
  { value: 5, label: "Hoàn toàn đúng", scale: 4 }
];

const Quiz = () => {
  const [answers, setAnswers] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const questionsPerPage = 5;
  const totalQuestions = questionsData.length;
  const totalPages = Math.ceil(totalQuestions / questionsPerPage);

  const startIndex = (currentPage - 1) * questionsPerPage;
  const endIndex = Math.min(startIndex + questionsPerPage, totalQuestions);
  const currentQuestions = questionsData.slice(startIndex, endIndex);

  const {user} = useContext(AuthContext); 
  const {showNotification} = useContext(NotificationContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("quzi", user)
    if(!user) {
      navigate("/login")
    }
  },[])

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const progress = (Object.keys(answers).length / totalQuestions) * 100;

  const onFinish = () => {
    if ( progress < 100) {
      showNotification('warning','Vui lòng chọn làm hết các câu hỏi!!!')
      return;
    }

    console.log(answers)
  }

  return (
    <Form className="quiz-container">
      <div className="quiz-header">
        <h1 style={{ fontSize: 30, fontFamily: 'Anton', fontWeight: '800', transform: 'scaleY(1.3)', marginTop: 50 }}>TRẮC NGHIỆM ENNEAGRAM MIỄN PHÍ</h1>
        <p>
          Chào mừng bạn đến với bài kiểm tra Enneagram miễn phí của CasaHola! Enneagram không chỉ là một hệ thống
          tính cách - nó là một công cụ mạnh mẽ để hiểu rõ những động lực cốt lõi thúc đẩy bạn. Hãy dành thời gian,
          trả lời một cách chân thành, và để hành trình này dẫn dắt bạn đến một sự hiểu biết sâu sắc hơn về con người bạn
          và cách bạn liên hệ với thế giới xung quanh.
        </p>
      </div>

      <Progress
        percent={progress.toFixed(2)}
        status="active"
        style={{ margin: '0 auto 20px', width: '80%', display: 'flex', textAlign: 'center', color: 'white' }}
      />

      {currentQuestions.map((question) => (
        <div className="question-card" key={question.id}>
          <div style={{ fontSize: "18px", display: 'flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center', fontWeight: "700", marginTop: 10, marginBottom: 60 }}>{question.text}</div>
          <div className="radio-container">
            <Radio.Group
              onChange={(e) => handleAnswer(question.id, e.target.value)}
              value={answers[question.id]}
            >
              {radioOptions.map((option) => (
                <div key={option.value} className="radio-item">
                  <Radio value={option.value} />
                  <span className="radio-label" style={{ marginTop: 50 }}>{option.label}</span>
                </div>
              ))}
            </Radio.Group>
          </div>
        </div>
      ))}

      <div style={{ maxWidth: 800, margin: '20px auto', display: 'flex', justifyContent: 'space-between' }}>
        <Button
          className="pag-button"
          type="primary"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Trang trước
        </Button>
        <span style={{ color: 'white', fontSize: 15 }}>
          Trang {currentPage}/{totalPages}
        </span>
        <Button
          className="pag-button"
          type="primary"
          style={{ backgroundColor: '#f0f0f0' }}
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Trang tiếp
        </Button>
      </div>
      <div className="button-container-x">
        <Button className="quiz-button" onClick={() => window.location.reload()}>
          LÀM LẠI TRẮC NGHIỆM
        </Button>
        <Button className="quiz-button" type="submit" onClick={onFinish}>
          GỬI KẾT QUẢ
        </Button>
      </div>
    </Form>
  );
};

export default Quiz;