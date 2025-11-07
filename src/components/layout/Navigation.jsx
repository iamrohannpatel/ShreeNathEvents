import React, { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { useTranslation } from '../../context/TranslationContext';

export const Navigation = ({ scrolled, menuOpen, setMenuOpen, sections }) => {
  const { t } = useTranslation();
  
  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden p-2 text-gray-700 hover:text-blue-600 focus:outline-none"
      >
        {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Navigation links */}
      <nav
        className={`${
          menuOpen ? 'block' : 'hidden'
        } md:block absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none z-50`}
      >
        <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 p-4 md:p-0">
          {Object.entries(t('nav')).map(([key, value]) => (
            <li key={key}>
              <button
                onClick={() => scrollToSection(sections[key])}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                {value}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};
