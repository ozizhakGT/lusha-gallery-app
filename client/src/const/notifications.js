import { toast } from "react-toastify";

const Notification = type => {
  toast.configure({
    bodyClassName: "notification"
  });

  return toast[type];
};

export default Notification;