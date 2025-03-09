import "@/assets/styles/global.scss";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import { ConfigProvider } from "antd";
import "antd/dist/reset.css";
import { UserProvider } from "./context/authContext";
import { NotificationProvider } from "./context/notificationContext";
import AppRoutes from "./routes/AppRoutes";
const App = () => {
  return (
    <Provider store={store}>
      <UserProvider>
          <ConfigProvider theme={{ token: { colorPrimary: "#1890ff" } }}>
            <NotificationProvider>
              <AppRoutes />
            </NotificationProvider>
          </ConfigProvider>
      </UserProvider>
    </Provider>
  );
};

export default App;
