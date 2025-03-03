import { notification } from "antd";
import { createContext } from "react";

export const UseNotification = createContext();

export const NotificationProvider = ({children}) => {

    const showNotification = (type, msg) => {
        notification[type]({
          message: msg,
        });
      };

    return (
        <UseNotification.Provider value={{ showNotification }}>
          {children}
        </UseNotification.Provider>
      );
}