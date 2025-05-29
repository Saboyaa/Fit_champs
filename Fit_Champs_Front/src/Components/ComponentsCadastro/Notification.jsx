import React from "react";

const Notification = ({ notification }) => {
  if (!notification.visible) return null;

  return (
    <div
      className={`p-4 mb-6 text-center rounded-xl shadow-lg ${
        notification.type === "error"
          ? "bg-gradient-to-r from-red-600 to-red-700 text-white"
          : "bg-gradient-to-r from-green-600 to-green-700 text-white"
      } transform animate-pulse`}
    >
      {notification.message}
    </div>
  );
};

export default Notification;
