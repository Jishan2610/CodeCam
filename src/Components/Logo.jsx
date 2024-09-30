import React from 'react';

const Logo = ({ width = '0.5em', height = '0.5em', className = '', style = {} }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 200 200" 
      width={width} 
      height={height}
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}
    >
      <g>
        {/* Background circle */}
        <circle cx="100" cy="100" r="90" fill="#3498db" />
        
        {/* Stylized "A" */}
        <path d="M100 30 L40 170 L160 170 Z" fill="none" stroke="#ecf0f1" strokeWidth="12" />
        
        {/* Horizontal line */}
        <line x1="70" y1="120" x2="130" y2="120" stroke="#ecf0f1" strokeWidth="12" />
        
        {/* Decorative elements */}
        <circle cx="100" cy="90" r="10" fill="#ecf0f1" />
        <rect x="85" y="140" width="30" height="10" fill="#ecf0f1" />
      </g>
    </svg>
  );
};

export default Logo;