import React from 'react';

export const Input = ({ label, value, onChange, placeholder, type = 'text', className = '' }) => (
  <div className={`mb-4 ${className}`}>
    {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
);

export const IconLink = ({ href, label, children, className = '' }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors ${className}`}
  >
    {children}
    <span>{label}</span>
  </a>
);
