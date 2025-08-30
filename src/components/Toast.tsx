import React from 'react';
import { X, CheckCircle, XCircle, Info } from 'lucide-react';

interface ToastProps {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
  onRemove: (id: number) => void;
}

const Toast: React.FC<ToastProps> = ({ id, message, type, onRemove }) => {
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />
  };

  const bgColors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200'
  };

  return (
    <div className={`flex items-center p-4 rounded-xl border ${bgColors[type]} shadow-lg transition-all duration-300 ease-in-out`}>
      {icons[type]}
      <span className="ml-3 text-sm font-medium text-gray-800">{message}</span>
      <button
        onClick={() => onRemove(id)}
        className="ml-auto text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;