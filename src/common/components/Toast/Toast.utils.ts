import { toast } from "react-toastify";

const showToast = (
  message: string,
  type: "success" | "error" | "info" | "warning",
) => {
  toast(message, { type });
};

export { showToast };
