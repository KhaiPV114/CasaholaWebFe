import Footer from "@/components/Footer";
import HeaderLayout from "@/components/HeaderLayout";
import NavbarLayout from "@/components/NavbarLayout";
import { AuthContext } from "@/context/authContext";
import { Layout } from "antd";
import { useContext, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
const MainLayout = () => {
  const { user, remember } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "" || location.pathname === "/") return;
    if (!user) {
      remember();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="main-layout">
      <Layout>
        <HeaderLayout />
        <Layout
          style={{
            display: "flex",
            flexGrow: 1,
            transition: "margin-left 0.3s",
          }}
        >
          <NavbarLayout />
          <Outlet />
        </Layout>
        <Footer />
      </Layout>
    </div>
  );
};

export default MainLayout;
