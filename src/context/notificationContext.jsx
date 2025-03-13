import { notification } from "antd";
import { createContext } from "react";

export const NotificationContext = createContext();

export const NotificationProvider = ({children}) => {

    const showNotification = (type, msg) => {
        notification[type]({
          message: msg,
        });
      };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
          {children}
        </NotificationContext.Provider>
      );
}