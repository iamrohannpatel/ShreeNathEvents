
import React from 'react';

export function Input({ label, value, onChange, placeholder }) {
    return (
      <label className="block">
        <span className="text-sm text-gray-700">{label}</span>
        <input 
          value={value} 
          onChange={(e) => onChange(e.target.value)} 
          placeholder={placeholder} 
          className="mt-1 w-full rounded-md border-gray-300 focus:border-amber-500 focus:ring-amber-500" 
        />
      </label>
    );
  }
