import { clientToken } from "@/api";
import { UseNotification } from "@/context/useNotification";
import { useContext, useEffect, useState } from "react";
import { data, useLocation, useNavigate } from "react-router-dom";

export const VnPayReturn = () => {
  // Get the current location (URL)
  const location = useLocation();
  const navigate = useNavigate();
  const { showNotification } = useContext(UseNotification);

  useEffect(() => {
    clientToken
      .get("vnpay/return", {
        params: new URLSearchParams(location.search),
        signal: new AbortController().signal,
        headers: {
          "Cache-Control": "no-cache", // Ngừng cache
        },
      })
      .then((res) => {
        showNotification(res.data.status, res.data.message);
      })
      .catch(() => {
        showNotification("error", "Thanh toan that bai");
      })
      .finally(() => {
        navigate("/");
      });
  }, []);

  return <div></div>;
};
