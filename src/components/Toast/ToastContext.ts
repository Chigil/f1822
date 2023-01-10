import { createContext } from 'react';

export type ToastView = 'error' | 'success' | 'info' | 'warning';
export type ToastContextType = {
  toast: (
    message: string,
    type?: ToastView,
    delay?: number,
    fontSize?: string,
  ) => void;
};

export const ToastContext = createContext<ToastContextType>(
  {} as ToastContextType,
);