// src/functions/useNotification.js
import { useState } from "react";

export const useNotificationState = () => {
  const [notification, setNotification] = useState({
    message: "",
    type: "",
    visible: false,
  });

  const showNotification = (message, type = "info", duration = 4000) => {
    setNotification({
      message,
      type,
      visible: true,
    });

    // Esconder notificação após o tempo especificado
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, visible: false }));
    }, duration);
  };

  return { notification, showNotification };
};
