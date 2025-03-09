import Footer from "@/components/Footer";
import HeaderLayout from "@/components/HeaderLayout";
import NavbarLayout from "@/components/NavbarLayout";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
const MainLayout = () => {
  
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
