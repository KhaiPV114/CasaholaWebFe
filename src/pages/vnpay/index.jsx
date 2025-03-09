import { client, clientToken } from "@/api";
import { AuthContext } from "@/context/authContext";
import { NotificationContext } from "@/context/notificationContext";
import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const VnPayReturn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signIn, signOut } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);

  useEffect(() => {
    clientToken
      .get("vnpay/return", {
        params: new URLSearchParams(location.search),
        signal: new AbortController().signal,
        headers: {
          "Cache-Control": "no-cache",
        },
      })
      .then((res) => {
        showNotification(res.data.status, res.data.message);
      })
      .catch(() => {
        showNotification("error", "Thanh toán thất bại");
      })
      .finally(() => {
        const token =
          localStorage.getItem("accessToken") ||
          localStorage.getItem("refreshToken");
        client
          .post("auth/account-remember", { token })
          .then((res) => {
            const { user, accessToken, refreshToken } = res.data;
            signIn(user, accessToken, refreshToken);
          })
          .catch(() => {
            signOut();
          });
        navigate("/");
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>hiha</div>;
};

export default VnPayReturn;
