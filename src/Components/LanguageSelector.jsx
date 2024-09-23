import React from 'react';
import {LanguageOptions} from "../Constants/LanguageOptions";

const LanguageSelector = ({ language, handleLanguageChange }) => {
  return (
    <select
      value={language}
      onChange={(e) => handleLanguageChange(e.target.value)}
      className="cursor-pointer bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-max p-1.5 m-1 ml-2 text-m"
    >
      {LanguageOptions.map((lang) => (
        <option key={lang.name} value={lang.name}>
          {lang.name.charAt(0).toUpperCase() + lang.name.slice(1)}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;