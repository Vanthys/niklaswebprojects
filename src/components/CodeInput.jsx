import React from 'react';

const CodeInput = ({ value, onChange, placeholder = 'Type here...' }) => {
  return (
    <textarea
      className="
        w-full h-48 p-4 
        font-mono text-sm
        bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md
        text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        transition duration-150 ease-in-out
        resize-vertical
      "
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default CodeInput;