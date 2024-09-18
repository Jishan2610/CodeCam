import React from 'react';

const languages = ['javascript','typescript', 'python', 'java', 'csharp', 'php','c','cpp'];

const LanguageSelector = ({ language, onSelect }) => {
  return (
    <select
      value={language}
      onChange={(e) => onSelect(e.target.value)}
      className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-max p-1.5 m-1 ml-2 text-m"
    >
      {languages.map((lang) => (
        <option key={lang} value={lang}>
          {lang.charAt(0).toUpperCase() + lang.slice(1)}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;