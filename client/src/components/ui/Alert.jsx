import React from 'react';
import { FiAlertCircle, FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi';

const Alert = ({ 
  type = 'info', 
  title,
  message,
  onClose,
  className = '' 
}) => {
  const types = {
    success: {
      container: 'bg-green-50 border-green-200',
      icon: <FiCheckCircle className="text-green-600" size={20} />,
      title: 'text-green-800',
      message: 'text-green-700',
    },
    error: {
      container: 'bg-red-50 border-red-200',
      icon: <FiXCircle className="text-red-600" size={20} />,
      title: 'text-red-800',
      message: 'text-red-700',
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-200',
      icon: <FiAlertCircle className="text-yellow-600" size={20} />,
      title: 'text-yellow-800',
      message: 'text-yellow-700',
    },
    info: {
      container: 'bg-blue-50 border-blue-200',
      icon: <FiInfo className="text-blue-600" size={20} />,
      title: 'text-blue-800',
      message: 'text-blue-700',
    },
  };
  
  const style = types[type];
  
  return (
    <div className={`border rounded-lg p-4 ${style.container} ${className}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {style.icon}
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={`text-sm font-medium ${style.title}`}>
              {title}
            </h3>
          )}
          {message && (
            <div className={`text-sm ${title ? 'mt-1' : ''} ${style.message}`}>
              {message}
            </div>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-3 flex-shrink-0 inline-flex text-gray-400 hover:text-gray-600"
          >
            <FiXCircle size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
