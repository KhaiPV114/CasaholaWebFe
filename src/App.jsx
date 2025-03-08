import "@/assets/styles/global.scss";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import AppRoutes from "./routes/AppRoutes";

import "antd/dist/reset.css";
import { useAxiosInterceptors } from "./api";
import { NotificationProvider } from "./context/useNotification";
import { UserProvider } from "./context/useContext";
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
