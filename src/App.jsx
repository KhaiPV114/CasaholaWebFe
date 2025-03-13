import "@/assets/styles/global.scss";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import { ConfigProvider } from "antd";
import "antd/dist/reset.css";
import { UserProvider } from "./context/authContext";
import { NotificationProvider } from "./context/notificationContext";
import AppRoutes from "./routes/AppRoutes";
import { SocketProvider } from "./context/socketContext";
const App = () => {
  return (
    <Provider store={store}>
      <UserProvider>
        <NotificationProvider>
          <SocketProvider>
            <ConfigProvider theme={{ token: { colorPrimary: "#1890ff" } }}>
              <AppRoutes />
            </ConfigProvider>
          </SocketProvider>
        </NotificationProvider>
      </UserProvider>
    </Provider>
  );
};

export default App;
