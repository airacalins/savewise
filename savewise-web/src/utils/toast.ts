import { toast, ToastOptions } from "react-toastify";

const commonOptions: ToastOptions = {
  position: "bottom-right",
  closeButton: false,
  autoClose: 3000,
  draggable: false,
  hideProgressBar: true,
  icon: false,
};

const showToast = (
  message: string,
  toastFunction: (message: string, options: ToastOptions) => void
): void => {
  toastFunction(message, { ...commonOptions });
};

export const showDefaultToast = (message: string): void => {
  showToast(message, toast);
};

export const showSuccessToast = (message: string): void => {
  showToast(message, toast.success);
};

export const showErrorToast = (message: string): void => {
  showToast(message, toast.error);
};
