import React from 'react';

const themes = ['vs','vs-dark', 'hc-black', 'hc-light'];

const ThemeSelector = ({ theme, onSelect }) => {
  return (
    <select
      value={theme}
      onChange={(e) => onSelect(e.target.value)}
      className="cursor-pointer bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-max p-1.5 m-1 ml-2 text-m"
    >
      {themes.map((thm) => (
        <option key={thm} value={thm}>
          {thm}
        </option>
      ))}
    </select>
  );
};

export default ThemeSelector;