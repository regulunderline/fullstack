import { useNotificationValue } from "../NotificationContext";
import { Alert } from "@mui/material";

const Notification = () => {
  const notification = useNotificationValue();
  if (notification === null) {
    return null;
  }

  if (notification.type === "success") {
    return <Alert severity="success">{notification.message}</Alert>;
  }
  return <Alert severity="error">{notification.message}</Alert>;
};

export default Notification;
