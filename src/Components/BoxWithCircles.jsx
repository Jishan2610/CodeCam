import React from 'react';

const FloatingCircle = ({ text }) => {
  return (
    <div className="w-32 h-32 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl animate-bounce">
      <span>{text}</span>
    </div>
  );
};

const BoxWithCircles = ({text1,text2}) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
        <div className="flex flex-col space-y-8 items-center">
          <FloatingCircle text={text1} />
          <FloatingCircle text={text2} />
        </div>
      </div>
    </div>
  );
};

export default BoxWithCircles;