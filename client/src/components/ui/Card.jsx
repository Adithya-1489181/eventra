import React from 'react';

const Card = ({ 
  children, 
  className = '',
  padding = true,
  hover = false,
  ...props 
}) => {
  const baseStyles = 'bg-white rounded-xl shadow-sm border border-gray-200';
  const paddingClass = padding ? 'p-6' : '';
  const hoverClass = hover ? 'hover:shadow-md transition-shadow duration-200' : '';
  
  return (
    <div 
      className={`${baseStyles} ${paddingClass} ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
