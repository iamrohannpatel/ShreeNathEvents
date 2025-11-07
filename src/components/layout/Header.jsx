
import React from 'react';
import { FiX, FiMenu } from 'react-icons/fi';

const cls = (...classes) => classes.filter(Boolean).join(' ');

const LanguageToggle = ({ language, setLanguage, mobile = false }) => (
    <button
      onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
      aria-label={language === 'en' ? 'Switch to Hindi' : 'Switch to English'}
      className={`flex items-center gap-1.5 ${mobile ? 'px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 active:bg-amber-200' : 'px-4 py-2 rounded-lg border border-amber-200 hover:border-amber-300'} text-amber-700 text-sm font-medium transition-all`}
    >
      <span className="leading-none">{language === 'en' ? 'हिंदी' : 'English'}</span>
      <svg className="w-4 h-4 text-amber-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 12h20" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 2c2.5 3 2.5 7 0 12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );

const Header = ({ scrolled, menuOpen, setMenuOpen, enhancedScrollTo, language, setLanguage, translations }) => {
    return (
      <header className={cls('fixed top-0 inset-x-0 z-50 transition-all duration-300', scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/80 backdrop-blur-sm')}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <button 
              onClick={() => enhancedScrollTo('home')} 
              className="flex items-center gap-2 group transition-transform hover:scale-105 -translate-x-2 sm:translate-x-0"
            >
              <span className="text-lg sm:text-xl font-serif font-bold bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent">Sree Nath Events</span>
            </button>
            
            <nav className="hidden md:flex items-center gap-1">
              {['about', 'services', 'events', 'contact'].map((item) => (
                <div key={item} className="relative group">
                  <button 
                    onClick={() => enhancedScrollTo(item)} 
                    className={cls('px-4 py-2 text-sm font-medium text-gray-600 hover:text-amber-600 transition-colors duration-200')}
                  >
                    {translations[language].nav[item]}
                  </button>
                  <span className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-amber-500 transition-all duration-300 transform -translate-x-1/2 group-hover:w-[70%]"></span>
                </div>
              ))}
              <div className="w-px h-6 bg-gray-200 mx-2"></div>
              <LanguageToggle language={language} setLanguage={setLanguage} />
            </nav>
  
            <div className="flex items-center gap-3 md:hidden">
              <LanguageToggle language={language} setLanguage={setLanguage} mobile />
              <button 
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 active:bg-amber-200 text-amber-700 transition-all"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              >
                {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  };

  export default Header;
