import React, { useContext, useEffect } from "react";
import { Button, Row } from "antd";
import s from "./styles.module.scss";
import { AuthContext } from "@/context/authContext";
import { useNavigate } from "react-router-dom";

const ResultPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  });
  return (
    <div className={s.resultContainer}>
      <h2 className={s.title}>KẾT QUẢ CỦA BẠN</h2>
      <p className={s.description}>
        Chào mừng bạn đến với bài kiểm tra Enneagram miễn phí của CasaHola!
        Enneagram không chỉ là một hệ thống tính cách - nó là một công cụ mạnh
        mẽ để hiểu rõ những động lực cốt lõi thúc đẩy bạn. Hãy dành thời gian,
        trả lời một cách chân thành, và để hành trình này dẫn dắt bạn đến một sự
        hiểu biết sâu sắc hơn về con người bạn và cách bạn liên hệ với thế giới
        xung quanh.
      </p>

      <h3 className={s.congrats}>XIN CHÚC MỪNG! BẠN LÀ</h3>

      <div className={s.avatarSection}>
        <div className={s.avatarIcon}>
          <img src="/images/genitive/nguoiThachThuc.png" alt="Nhóm 4" />
        </div>
      </div>

      <h3 className={s.groupTitle}>NHÓM 4</h3>
      <p className={s.groupTitle}>Người Cá Tính</p>

      <div className={s.groupDescription}>
        <p>
          Enneagram type 1 – người cầu toàn (The perfectionist), là những người
          thực dụng, có trách nhiệm và nghiêm túc. Động lực lớn nhất của họ là
          tìm ra mục đích sống, đặc biệt là khả năng cải thiện phúc lợi của con
          người và làm cho mọi thứ trở nên tốt đẹp hơn.
        </p>
      </div>

      <div className={s.groupfeature}>
        <h1>Nhóm tính cách 1 - Người Cầu Toàn</h1>
        <p>
          <strong>Điểm mạnh:</strong> Chính trực, đạo đức, đáng tin cậy, kỷ
          luật, lý trí.
        </p>
        <p>
          <strong>Điểm yếu:</strong> Quá cầu toàn, dễ bị căng thẳng, hay chỉ
          trích bản thân và người khác.
        </p>
        <p>
          <strong>Động lực:</strong> Mong muốn sự hoàn hảo, chính trực và công
          bằng.
        </p>
        <p>
          <strong>Nỗi sợ:</strong> Bị coi là xấu xa, hư hỏng, sai trái.
        </p>
        <p>
          <strong>Điểm mạnh:</strong> Học cách chấp nhận sự không hoàn hảo, tập
          trung vào những điều tích cực, đối xử tốt với bản thân.
        </p>
      </div>

      <Row className={s.compatibility}>
        <div>
          <h1>Tương thích với:</h1>
        </div>
        <div className={s.compatibilityIcons}>
          <div className={s.avatarIconMini}>
            <img src="/images/genitive/nguoiThachThuc.png" alt="Nhóm 1" />
          </div>
          <div className={s.avatarIconMini}>
            <img src="/images/genitive/nguoiThachThuc.png" alt="Nhóm 1" />
          </div>
          <div className={s.avatarIconMini}>
            <img src="/images/genitive/nguoiThachThuc.png" alt="Nhóm 1" />
          </div>
        </div>
      </Row>

      <div className={s.buttons}>
        <Button className={s.retryBtn}>LÀM LẠI TRẮC NGHIỆM</Button>
        <Button className={s.retryBtn}>TIẾP TỤC</Button>
      </div>
    </div>
  );
};

export default ResultPage;
