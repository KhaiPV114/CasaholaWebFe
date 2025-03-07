import React from 'react';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { store } from './redux/store';
import AppRoutes from './routes/AppRoutes';
import "@/assets/styles/global.scss";


import 'antd/dist/reset.css';
import { UserProvider } from './context/useContext';
import { NotificationProvider } from './context/useNotification';
const App = () => (
  
  <Provider store={store}>
    <ConfigProvider theme={{ token: { colorPrimary: '#1890ff' } }}>
      <NotificationProvider>
        <UserProvider>
          <AppRoutes />
        </UserProvider>
      </NotificationProvider>
    </ConfigProvider>
  </Provider>
);

export default App;
