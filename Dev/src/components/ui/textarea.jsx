import React from 'react';

export const Textarea = ({ name, value, onChange, placeholder, rows, required, className }) => {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      required={required}
      className={`w-full bg-gray-700 text-gray-200 border-none focus:ring-primary focus:ring-2 p-4 rounded-md ${className}`}
    />
  );
};

export default Textarea;
