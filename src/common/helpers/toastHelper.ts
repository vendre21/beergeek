import { toast } from 'react-toast'


export const toastError = (message: string) => {
  toast.error(message);
};

export const toastWarning = (message: string) => {
  toast.warn(message);
};

export const toastSuccess = (message: string) => {
  toast.success(message);
};
