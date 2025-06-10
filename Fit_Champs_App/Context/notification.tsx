import { useState, useRef } from 'react';

export const useNotificationState = () => {
  const [notification, setNotification] = useState({
    message: "",
    type: "",
    visible: false,
  });
  
  const timeoutRef = useRef(null);

  const showNotification = (message, type = "info", duration = 4000) => {
    // Limpar timeout anterior se existir
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setNotification({
      message,
      type,
      visible: true,
    });

    // Esconder notificação após o tempo especificado
    timeoutRef.current = setTimeout(() => {
      setNotification((prev) => ({ ...prev, visible: false }));
    }, duration);
  };

  const hideNotification = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setNotification((prev) => ({ ...prev, visible: false }));
  };

  return { 
    notification, 
    showNotification, 
    hideNotification 
  };
};
