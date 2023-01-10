import { ReactNode, useContext, useState } from 'react';
import { ToastContext, ToastContextType, ToastView } from './ToastContext';
import Toast from './Toast';
import './Toast.css';

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<object[]>([]);
  const showToast = (
    message: string = '',
    type: ToastView = 'success',
    delay: number = 0,
    fontSize: string = '1.2rem',
  ) => {
    const newToast = { message, type, delay, fontSize };
    setToasts([...toasts, newToast]);
    if (delay) {
      setTimeout(
        () => setToasts(toasts.filter((toast) => toast !== newToast)),
        delay,
      );
    }
  };
  const toastContext: ToastContextType = {
    toast: showToast,
  };
  const deleteToast = (id: number) => {
    const filtered = toasts.filter((toast, index) => index !== id);
    setToasts(filtered);
  };
  return (
    <ToastContext.Provider value={toastContext}>
    <div className="toast-up-container ">
      {toasts.map((toast, i) => (
          <Toast data={toast} id={i} key={i} deleteToast={deleteToast} />
))}
  </div>
  {children}
  </ToastContext.Provider>
);
};

export const useToast = () => useContext(ToastContext);