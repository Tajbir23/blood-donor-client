import React from 'react';

interface LoadingProps {
  size?: 'small' | 'medium' | 'large' | number;
  color?: string;
  text?: string;
  fullScreen?: boolean;
  className?: string;
  textClass?: string;
}

const Loading: React.FC<LoadingProps> = ({ 
  size = 'medium', 
  color = '#dc2626', // red-600
  text,
  fullScreen = false,
  className = '',
  textClass = ''
}) => {
  // Calculate spinner size based on prop
  const getSize = () => {
    if (typeof size === 'number') return size;
    
    switch(size) {
      case 'small': return 24;
      case 'large': return 64;
      case 'medium':
      default: return 40;
    }
  };

  const spinnerSize = getSize();
  
  const spinnerStyles = {
    width: `${spinnerSize}px`,
    height: `${spinnerSize}px`,
    borderColor: `${color} transparent transparent transparent`,
  };

  const content = (
    <div className={`flex items-center justify-center flex-col ${className}`}>
      <div className="relative">
        <div className="animate-spin rounded-full border-4 border-solid" style={spinnerStyles}></div>
        <div 
          className="absolute top-0 left-0 animate-ping rounded-full opacity-75" 
          style={{
            width: `${spinnerSize/4}px`,
            height: `${spinnerSize/4}px`,
            backgroundColor: color,
            transform: `translate(${spinnerSize*0.75/2}px, ${spinnerSize*0.75/2}px)`,
          }}
        ></div>
      </div>
      
      {text && (
        <p className={`mt-3 text-gray-700 ${textClass}`}>{text}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
        {content}
      </div>
    );
  }

  return content;
};

export default Loading;
