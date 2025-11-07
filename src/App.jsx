import React, { useState, useEffect, useRef, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  FiArrowRight, 
  FiHome, 
  FiUser, 
  FiStar, 
  FiImage, 
  FiMail, 
  FiX, 
  FiMenu, 
  FiChevronRight, 
  FiCalendar,
  FiMapPin 
} from 'react-icons/fi';

// Context
import { TranslationProvider, useTranslation } from './context/TranslationContext';

// Components
import EventDecoration from './pages/EventDecoration';

// Utility function to join class names
const cls = (...classes) => classes.filter(Boolean).join(' ');

// Icons
const Check = () => (
  <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

// Header Component
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

// Language Toggle Component
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

// Mobile Menu Component
const MobileMenu = ({ menuOpen, setMenuOpen, enhancedScrollTo, translations, language }) => (
  <AnimatePresence>
    {menuOpen && (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-x-0 top-[80px] z-50 bg-white/95 backdrop-blur-md shadow-lg max-h-[calc(100vh-80px)] overflow-y-auto"
      >
        <div className="container mx-auto px-4 py-4 space-y-2">
          {[
            { id: 'home', label: 'Home', icon: 'home' },
            { id: 'about', label: translations[language].nav.about, icon: 'user' },
            { id: 'services', label: translations[language].nav.services, icon: 'star' },
            { id: 'events', label: translations[language].nav.events, icon: 'calendar' },
            { id: 'contact', label: translations[language].nav.contact, icon: 'mail' }
          ].map((item) => (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                enhancedScrollTo(item.id);
                setMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-4 text-gray-700 hover:bg-amber-50 active:bg-amber-100 rounded-xl transition-all"
            >
              <span className="text-amber-500">
                {item.icon === 'home' && <FiHome size={20} />}
                {item.icon === 'user' && <FiUser size={20} />}
                {item.icon === 'star' && <FiStar size={20} />}
                {item.icon === 'image' && <FiImage size={20} />}
                {item.icon === 'calendar' && <FiCalendar size={20} />}
                {item.icon === 'mail' && <FiMail size={20} />}
              </span>
              <span className="flex-1 text-left font-medium">{item.label}</span>
              <FiChevronRight className="text-amber-400" />
            </motion.button>
          ))}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Hero Section Component
const HeroSection = ({ translations, language, scrollTo }) => (
  <section id="home" className="relative min-h-screen flex items-center pt-20 pb-0 overflow-hidden" data-section="home">
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-white"></div>
      <div className="absolute inset-0 bg-[url('/public/grid.svg')] [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0.5))]"></div>
    </div>
    
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left px-4 sm:px-6 lg:px-0"
        >
          <motion.span 
            className="inline-block px-4 py-2 mb-6 text-xs sm:text-sm font-semibold tracking-wider text-amber-700 bg-amber-100 rounded-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {translations[language].elevatingEvents}
          </motion.span>
          
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent inline-block mb-2">
              {translations[language].beautifulEvents}
            </span>
            <span className="block">{translations[language].everyTime}</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {translations[language].transformEvents}
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start max-w-xs sm:max-w-none mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button 
              whileHover={{ scale: 1.03, boxShadow: '0 10px 25px -5px rgba(245, 158, 11, 0.3)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollTo('contact')}
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              {translations[language].planYourEvent}
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98, borderColor: '#D4AF37' }}
              onClick={() => scrollTo('services')}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 font-semibold rounded-lg border border-gray-200 hover:bg-gray-50 transition-all text-center"
            >
              <span>{translations[language].explore}</span>
              <svg 
                className="w-4 h-4 transition-transform group-hover:translate-y-0.5" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M7 13l5 5 5-5M7 6l5 5 5-5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
);

// Main App Content Component
function AppContent() {
  const location = useLocation();
  const { t, language, setLanguage } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const sections = {
    home: useRef(null),
    about: useRef(null),
    services: useRef(null),
    events: useRef(null),
    contact: useRef(null),
    booking: useRef(null),
  };

  // Enhanced scrollTo function with smooth behavior and error handling
  const enhancedScrollTo = (key) => {
    if (sections[key]?.current) {
      const yOffset = -80;
      const element = sections[key].current;
      
      if (key === 'contact') {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      } else {
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
      setMenuOpen(false);
    } else {
      console.warn(`Section ${key} not found`);
    }
  };

  // Scroll event listener for header
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`text-gray-800 selection:bg-amber-200 selection:text-gray-900 ${language === 'hi' ? 'font-devanagari' : ''}`}>
      {/* Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@300;400;500;600;700&display=swap');
        
        :root {
          --font-primary: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          --font-devanagari: 'Noto Sans Devanagari', sans-serif;
        }

        * {
          font-family: var(--font-primary);
        }

        .font-devanagari {
          --font-primary: 'Noto Sans Devanagari', sans-serif;
        }

        [lang="hi"] {
          font-family: var(--font-devanagari);
        }
      `}</style>

      {/* Header */}
      <Header 
        scrolled={scrolled}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        enhancedScrollTo={enhancedScrollTo}
        language={language}
        setLanguage={setLanguage}
        translations={t}
      />

      {/* Mobile Menu */}
      <MobileMenu 
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        enhancedScrollTo={enhancedScrollTo}
        translations={t}
        language={language}
      />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/event-decoration" element={<EventDecoration />} />
          <Route path="/" element={
            <div ref={sections.home}>
              {/* Hero Section */}
              <HeroSection 
                translations={t}
                language={language}
                scrollTo={enhancedScrollTo}
              />
              
              {/* Other sections will go here */}
              

          * {
            font-family: var(--font-primary);
          }

          .font-devanagari {
            --font-primary: 'Noto Sans Devanagari', sans-serif;
          }

          /* Specific style for Hindi text */
          [lang="hi"] {
            font-family: var(--font-devanagari);
          }
        `}
      </style>
      {/* Header */}
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
                    className={cls('px-4 py-2 text-sm font-medium text-gray-600 hover:text-amber-600 transition-colors duration-200', activeTab === item ? 'text-amber-600 border-b-2 border-amber-500' : '')}
                  >
                    {translations[language].nav[item]}
                  </button>
                  <span className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-amber-500 transition-all duration-300 transform -translate-x-1/2 group-hover:w-[70%]"></span>
                </div>
              ))}
              <div className="w-px h-6 bg-gray-200 mx-2"></div>
              <button
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                aria-label={language === 'en' ? 'Switch to Hindi' : 'Switch to English'}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-amber-200 hover:border-amber-300 text-amber-700 text-sm font-medium transition-all"
              >
                {/* Text label first, clear translation symbol to the right */}
                <span className="leading-none">{language === 'en' ? 'हिंदी' : 'English'}</span>
                <svg className="w-5 h-5 text-amber-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  {/* simple globe/translate symbol */}
                  <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12h20" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 2c2.5 3 2.5 7 0 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </nav>

            <div className="flex items-center gap-3 md:hidden">
              <button
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                aria-label={language === 'en' ? 'Switch to Hindi' : 'Switch to English'}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 active:bg-amber-200 border border-amber-200 text-amber-700 text-sm font-medium transition-all"
              >
                <span className="leading-none">{language === 'en' ? 'हिंदी' : 'English'}</span>
                <svg className="w-4 h-4 text-amber-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12h20" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 2c2.5 3 2.5 7 0 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
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

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-0 top-[80px] z-50 bg-white/95 backdrop-blur-md shadow-lg max-h-[calc(100vh-80px)] overflow-y-auto"
            >
              <div className="container mx-auto px-4 py-4 space-y-2">
                {[
                  { id: 'home', label: 'Home', icon: 'home' },
                  { id: 'about', label: translations[language].nav.about, icon: 'user' },
                  { id: 'services', label: translations[language].nav.services, icon: 'star' },
                  { id: 'events', label: translations[language].nav.events, icon: 'calendar' },
                  { id: 'contact', label: translations[language].nav.contact, icon: 'mail' }
                ].map((item) => (
                  <motion.button
                    key={item.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      enhancedScrollTo(item.id);
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-4 text-gray-700 hover:bg-amber-50 active:bg-amber-100 rounded-xl transition-all"
                  >
                    <span className="text-amber-500">
                      {item.icon === 'home' && <FiHome size={20} />}
                      {item.icon === 'user' && <FiUser size={20} />}
                      {item.icon === 'star' && <FiStar size={20} />}
                      {item.icon === 'image' && <FiImage size={20} />}
                      {item.icon === 'calendar' && <FiCalendar size={20} />}
                      {item.icon === 'mail' && <FiMail size={20} />}
                    </span>
                    <span className="flex-1 text-left font-medium">{item.label}</span>
                    <FiChevronRight className="text-amber-400" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section ref={sections.home} id="home" className="relative min-h-screen flex items-center pt-20 pb-0 overflow-hidden" data-section="home">
        <AnimatedBackground />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left px-4 sm:px-6 lg:px-0"
            >
              <motion.span 
                className="inline-block px-4 py-2 mb-6 text-xs sm:text-sm font-semibold tracking-wider text-amber-700 bg-amber-100 rounded-full"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {translations[language].elevatingEvents}
              </motion.span>
              
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent inline-block mb-2">{translations[language].beautifulEvents}</span>
                <span className="block">{translations[language].everyTime}</span>
              </motion.h1>
              
              <motion.p 
                className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {translations[language].transformEvents}
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start max-w-xs sm:max-w-none mx-auto"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button 
                  whileHover={{ scale: 1.03, boxShadow: '0 10px 25px -5px rgba(245, 158, 11, 0.3)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollTo('contact')}
                  className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  {translations[language].planYourEvent}
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98, borderColor: '#D4AF37' }}
                  onClick={() => scrollTo('services')}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 font-semibold rounded-lg border border-gray-200 hover:bg-gray-50 transition-all text-center"
                >
                  <span>{translations[language].explore}</span>
                  <svg 
                    className="w-4 h-4 transition-transform group-hover:translate-y-0.5" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <path d="M7 13l5 5 5-5M7 6l5 5 5-5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.button>
              </motion.div>
              
              <motion.div 
                className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((item) => (
                    <motion.img
                      key={item}
                      src={`https://randomuser.me/api/portraits/${item % 2 === 0 ? 'women' : 'men'}/${item}0.jpg`}
                      alt="Happy client"
                      className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                      whileHover={{ y: -5, scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    />
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Rated 4.9/5 from 500+ reviews</p>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Image Showcase */}
            <motion.div 
              className="relative block"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25, duration: 0.8 }}
            >
              <div className="relative w-full max-w-[95vw] sm:max-w-xl mx-auto lg:mx-0 px-4 sm:px-0">
                {/* Gallery Container - keep desktop vertical proportions but increase
                    width on mobile so the container reads larger without expanding
                    vertically. */}
                <div className="relative h-64 sm:h-72 md:h-80 lg:h-[380px]">
                  {/* Decorative border */}
                  <motion.div 
                    className="absolute -top-5 -left-5 w-full h-full border-2 border-amber-400 rounded-2xl -z-10"
                    animate={{
                      borderColor: ['rgba(251, 191, 36, 0.6)', 'rgba(251, 191, 36, 0.8)', 'rgba(251, 191, 36, 0.6)'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Main gallery grid */}
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-1 p-2 bg-white rounded-2xl shadow-2xl">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <motion.div 
                        key={num}
                        className="relative overflow-hidden group"
                        whileHover={{ scale: 1.05, zIndex: 10 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ 
                          type: "spring",
                          stiffness: 300,
                          damping: 20
                        }}
                      >
                        <img
                          src={`/img${num}.jpg`}
                          alt={`Event decoration ${num}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        <motion.div 
                          className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                        >
                          <span className="text-white font-medium text-[13px] sm:text-sm bg-black/60 px-2 py-1 rounded">View</span>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Background decorative circle */}
                  <motion.div 
                    className="absolute -bottom-6 -right-6 w-28 h-28 md:w-48 md:h-48 bg-amber-100 rounded-full -z-10 opacity-30"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.3, 0.4, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
                
                {/* Connected Gallery Button */}
                <div className="relative mt-8 w-full px-4 sm:px-6 lg:px-0 flex flex-col items-center">
                    {/* Animated connection line */}
                    <motion.div 
                      className="absolute top-0 left-1/2 -translate-x-1/2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="w-px h-6 sm:h-8 bg-gradient-to-b from-amber-400/50 to-transparent" />
                    </motion.div>
                  
                    {/* Gallery button */}
                    <motion.button 
                      onClick={() => enhancedScrollTo('services')}
                      whileHover={{ scale: 1.04, boxShadow: '0 6px 20px rgba(245, 158, 11, 0.15)' }}
                      whileTap={{ scale: 0.96 }}
                      className="relative -mt-4 sm:mt-0 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-medium rounded-md shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                  >
                    <span>View Gallery</span>
                    <motion.svg 
                      className="w-4 h-4" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </motion.svg>
                  </motion.button>
                </div>
              </div>
              
              <div className="absolute -bottom-8 -right-8 w-40 h-40 md:w-64 md:h-64 bg-amber-100 rounded-full -z-10 opacity-30"></div>
            </motion.div>
          </div>
        </div>
        
      </section>

      {/* About */}
      <section 
        ref={sections.about} 
        id="about" 
        className="relative bg-gradient-to-b from-amber-50 via-white to-white pt-12 pb-8 md:pb-16 overflow-hidden -mb-px"
        data-section="about"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-amber-700/5 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-200/10 rounded-full -mr-32 -mb-32"></div>
        <div className="absolute top-1/2 left-0 w-32 h-32 bg-amber-100/20 rounded-full -ml-16 -mt-16"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-amber-700 bg-amber-100 rounded-full mb-3">
              The Visionary
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
              Meet <span className="text-amber-600">Shivam</span>
            </h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div 
              className="relative group p-1"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative transform transition-all duration-500"
                style={{
                  borderRadius: '1rem',
                  padding: '4px',
                  background: 'linear-gradient(135deg, #FFB800, #FF8A00)',
                  boxShadow: '0 25px 50px -12px rgba(255, 184, 0, 0.25), 0 8px 24px -8px rgba(255, 138, 0, 0.15), 0 0 48px -4px rgba(0, 0, 0, 0.1), inset 0 2px 4px rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease-in-out'
                }}
              >
                <div className="relative overflow-hidden rounded-lg">
                  <img 
                    src="/Shivam.jpg" 
                    alt="Shivam — Founder & Lead Event Planner" 
                    className="w-full h-auto max-h-[32rem] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <div className="text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-sm font-medium text-amber-300">Event Maestro</p>
                    <p className="text-xs text-amber-100">Creating magic since 2015</p>
                  </div>
                </div>
              </div>
              <div className="hidden md:block absolute -right-6 -bottom-6 w-40 h-40 bg-amber-100 rounded-full -z-10"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <span className="text-sm uppercase tracking-wider font-medium text-amber-600">Founder & Lead Event Planner</span>
                <h3 className="mt-2 text-2xl md:text-3xl font-serif font-semibold text-gray-900">
                  Crafting Unforgettable Experiences
                </h3>
                
                <div className="mt-6 space-y-5 text-gray-700">
                  <p className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-amber-400 before:rounded-full">
                    With a keen eye for detail and a passion for perfection, I transform ordinary spaces into extraordinary experiences that leave lasting impressions.
                  </p>
                  <p className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-amber-400 before:rounded-full">
                    My journey in event planning has taken me through hundreds of celebrations, each teaching me that the magic lies in the details and the personal touch.
                  </p>
                  <p className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-amber-400 before:rounded-full">
                    I believe in creating events that are not just seen but felt—where every element tells a story and every moment is a memory in the making.
                  </p>
                </div>

                <div className="mt-8 p-6 bg-amber-50 rounded-xl border-l-4 border-amber-400">
                  <div className="flex">
                    <svg className="w-6 h-6 text-amber-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <div>
                      <p className="italic text-gray-800">"My mission is to turn your vision into reality, creating events that are as unique as they are memorable. Every detail tells a story—let's write yours together."</p>
                      <p className="mt-2 text-sm font-medium text-amber-700">— Shivam, Founder</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section ref={sections.services} id="services" className="relative pt-0 -mb-8 bg-gradient-to-b from-white to-amber-50 overflow-hidden" data-section="services">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-amber-50 to-transparent"></div>
        <div className="absolute top-1/2 -right-20 w-64 h-64 bg-amber-400/10 rounded-full -mt-32"></div>
        
        {/* Services Component */}
        <Services />
      </section>

      {/* Events */}
      <section ref={sections.events} id="events" className="relative -mt-8 bg-gradient-to-b from-amber-50 to-white overflow-hidden" data-section="events">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-white to-transparent"></div>
        <div className="absolute -left-20 top-1/2 w-80 h-80 bg-amber-300/10 rounded-full -mt-40"></div>
        <Events />
      </section>


      {/* Testimonials */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="font-serif text-3xl sm:text-4xl text-center">What Clients Say</h2>
          <div className="mt-8 relative overflow-hidden">
            <div className="flex transition-transform duration-700" style={{ transform: `translateX(-${testimonialIndex * 100}%)` }}>
              {testimonials.map((t, i) => (
                <div key={i} className="min-w-full px-2">
                  <div className="bg-gradient-to-b from-amber-50 to-white rounded-2xl p-8 border text-center">
                    <svg className="w-8 h-8 text-gold mx-auto" viewBox="0 0 24 24" fill="currentColor"><path d="M7.17 6A5.17 5.17 0 0 0 2 11.17V22h8v-8H6.79a3 3 0 0 1 3-3H12V6H7.17Zm9 0A5.17 5.17 0 0 0 11 11.17V22h8v-8h-3.21a3 3 0 0 1 3-3H22V6h-5.83Z"/></svg>
                    <p className="mt-4 text-lg italic text-gray-800">“{t.quote}”</p>
                    <p className="mt-4 font-medium">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.event}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-center gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setTestimonialIndex(i)} className={cls('w-2.5 h-2.5 rounded-full', i === testimonialIndex ? 'bg-amber-500' : 'bg-gray-300')} aria-label={`Go to testimonial ${i+1}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Booking */}
      <section ref={sections.booking} id="booking" className="bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl">Book a Consultation</h2>
              <p className="mt-2 text-gray-600">We work with a limited number of clients each month to preserve quality. Share a few details to begin.</p>

              <div className="mt-8 space-y-10">
                <div className="bg-white border rounded-xl p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-500">Step 1</div>
                      <div className="font-medium">Select a Date</div>
                    </div>
                    {selectedDate && <span className="text-sm text-gray-600">{selectedDate.toDateString()}</span>}
                  </div>
                  <Calendar selected={selectedDate} onSelect={(d) => { setSelectedDate(d); setBookingStep(2) }} />
                </div>

                {bookingStep >= 2 && (
                  <div className="bg-white border rounded-xl p-5">
                    <div className="text-xs text-gray-500">Step 2</div>
                    <div className="font-medium">Event Details</div>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                      <Input label="Phone Number" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                      <Input label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                      <Input label="Event Type" value={form.type} onChange={(v) => setForm({ ...form, type: v })} placeholder="Wedding, Gala, Party" />
                      <Input label="Venue" value={form.venue} onChange={(v) => setForm({ ...form, venue: v })} />
                      <Input label="Guest Count" value={form.guests} onChange={(v) => setForm({ ...form, guests: v })} />
                      <div className="sm:col-span-2">
                        <label className="text-sm text-gray-700">Estimated Budget</label>
                        <select value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className="mt-1 w-full rounded-md border-gray-300">
                          <option value="">Select a range</option>
                          <option>₹50,000 - ₹1,00,000</option>
                          <option>₹1,00,000 - ₹2,50,000</option>
                          <option>₹2,50,000 - ₹5,00,000</option>
                          <option>₹5,00,000+</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button onClick={() => setBookingStep(3)} className="px-5 py-2.5 rounded-full bg-amber-500 text-white shadow hover:shadow-md transition" disabled={!selectedDate || !form.name || !form.phone || !form.email || !form.type || !form.venue || !form.guests || !form.budget}>Proceed</button>
                    </div>
                  </div>
                )}

                {bookingStep >= 3 && (
                  <div className="bg-white border rounded-xl p-5">
                    <div className="text-xs text-gray-500">Step 3</div>
                    <div className="font-medium">Confirmation</div>
                    <p className="mt-2 text-gray-700">Review your details and submit your request. Our team will reach out within 24 hours.</p>
                    <button onClick={() => setConfirmOpen(true)} className="mt-4 px-5 py-2.5 rounded-full bg-amber-500 text-white shadow hover:shadow-md transition">Proceed to Consultation Fee</button>
                  </div>
                )}
              </div>
            </div>

            <aside className="bg-white border rounded-2xl p-6 sticky top-24">
              <h3 className="font-medium">Why Clients Choose Us</h3>
              <ul className="mt-4 space-y-3 text-gray-700">
                <li className="flex gap-2"><Check /> Bespoke concepts, never templates</li>
                <li className="flex gap-2"><Check /> Precision execution and on‑site direction</li>
                <li className="flex gap-2"><Check /> Discreet, high‑touch client service</li>
                <li className="flex gap-2"><Check /> Transparent costing and timelines</li>
              </ul>
              <div className="mt-6 text-sm text-gray-600">Packages typically range from <span className="font-medium">₹50,000</span> to <span className="font-medium">₹2,50,000+</span> depending on scope and scale.</div>
            </aside>
          </div>
        </div>
      </section>

      {confirmOpen && (
        <div className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl">Request Received</h3>
              <button onClick={() => setConfirmOpen(false)} className="p-2 rounded-full hover:bg-gray-100" aria-label="Close"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" /></svg></button>
            </div>
            <p className="mt-4 text-gray-700">Thank you, <span className="font-medium">{form.name || 'Client'}</span>! Your consultation request for <span className="font-medium">{form.type || 'Event'}</span> has been received. Our team will contact you within 24 hours.</p>
            <div className="mt-6 flex justify-end"><button onClick={() => setConfirmOpen(false)} className="px-5 py-2.5 rounded-full bg-amber-500 text-white">Close</button></div>
          </div>
        </div>
      )}

      {/* Contact Section */}
      <section ref={sections.contact} id="contact" className="relative bg-gradient-to-br from-amber-50 to-white py-16 md:py-24 overflow-hidden" data-section="contact">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-20"></div>
        <div className="absolute top-1/4 -right-20 w-64 h-64 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-1/4 -left-20 w-64 h-64 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block text-amber-600 text-sm font-medium mb-3">Get In Touch</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Let's Create Something <span className="text-amber-500">Amazing</span> Together</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-200 mx-auto rounded-full"></div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/20 p-8">
              <form className="space-y-5">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      id="message"
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300"
                      placeholder="Tell us about your event..."
                    ></textarea>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
            
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800">Contact Information</h3>
                <p className="text-gray-600">Have questions or ready to plan your next event? Reach out to us through any of these channels.</p>
                
                <div className="space-y-5">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Email Us</p>
                      <p className="text-sm text-amber-600">info@sreenathevents.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Call Us</p>
                      <p className="text-sm text-amber-600">+91 98765 43210</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Visit Us</p>
                      <p className="text-sm text-gray-600">123 Event Street, Connaught Place</p>
                      <p className="text-sm text-gray-600">New Delhi, 110001</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                      <span className="sr-only">Facebook</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                      <span className="sr-only">Instagram</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                      <span className="sr-only">Pinterest</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12.017 0C5.38 0 .004 5.37.004 11.99c0 5.016 3.097 9.31 7.477 11.126-.105-.949-.198-2.41.042-3.44.218-.937 1.406-5.965 1.406-5.965s-.359-.72-.359-1.78c0-1.667.965-2.914 2.17-2.914 1.025 0 1.517.77 1.517 1.689 0 1.027-.653 2.566-.997 3.99-.288 1.19.6 2.16 1.771 2.16 2.13 0 3.768-2.246 3.768-5.49 0-2.873-2.065-4.88-5.01-4.88-3.41 0-5.41 2.56-5.41 5.19 0 1.03.397 2.14.89 2.737.098.12.11.225.083.345-.09.375-.293 1.199-.33 1.363-.053.225-.18.27-.42.164-1.57-.732-2.55-3.02-2.55-4.855 0-3.94 2.86-7.55 8.25-7.55 4.33 0 7.69 3.09 7.69 7.21 0 4.3-2.71 7.76-6.48 7.76-1.28 0-2.47-.66-2.88-1.45l-.79 3.01c-.28 1.1-1.05 2.47-1.56 3.31.93.29 1.93.44 2.96.44 6.63 0 11.98-5.37 11.98-11.99C23.996 5.37 18.637 0 12.017 0z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="bg-amber-50 rounded-2xl p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Business Hours</h3>
                <dl className="space-y-3">
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600">Monday - Friday</dt>
                    <dd className="text-sm font-medium text-gray-900">9:00 AM - 7:00 PM</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600">Saturday</dt>
                    <dd className="text-sm font-medium text-gray-900">10:00 AM - 6:00 PM</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600">Sunday</dt>
                    <dd className="text-sm font-medium text-gray-900">By Appointment</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/20"
            >
              <div className="p-8">
                <form className="space-y-5">
                  <motion.div 
                    whileFocus={{ scale: 1.02 }}
                    className="group relative"
                  >
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 peer"
                      placeholder=" "
                    />
                    <label 
                      htmlFor="name" 
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-300 peer-focus:text-xs peer-focus:-top-2 peer-focus:bg-white peer-focus:px-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2"
                    >
                      Full Name
                    </label>
                  </motion.div>

                  <motion.div 
                    whileFocus={{ scale: 1.02 }}
                    className="group relative"
                  >
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 peer"
                      placeholder=" "
                    />
                    <label 
                      htmlFor="email" 
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-300 peer-focus:text-xs peer-focus:-top-2 peer-focus:bg-white peer-focus:px-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2"
                    >
                      Email Address
                    </label>
                  </motion.div>

                  <motion.div 
                    whileFocus={{ scale: 1.02 }}
                    className="group relative"
                  >
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 peer"
                      placeholder=" "
                    />
                    <label 
                      htmlFor="phone" 
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-300 peer-focus:text-xs peer-focus:-top-2 peer-focus:bg-white peer-focus:px-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2"
                    >
                      Phone Number (Optional)
                    </label>
                  </motion.div>

                  <motion.div 
                    whileFocus={{ scale: 1.02 }}
                    className="group relative"
                  >
                    <select
                      id="event-type"
                      name="event-type"
                      className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent appearance-none transition-all duration-300 cursor-pointer"
                    >
                      <option value="" disabled selected>Select Event Type</option>
                      <option>Wedding</option>
                      <option>Corporate Event</option>
                      <option>Birthday Party</option>
                      <option>Anniversary</option>
                      <option>Other</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileFocus={{ scale: 1.02 }}
                    className="group relative pt-2"
                  >
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 resize-none peer"
                      placeholder=" "
                    ></textarea>
                    <label 
                      htmlFor="message" 
                      className="absolute left-3 top-5 text-gray-500 pointer-events-none transition-all duration-300 peer-focus:text-xs peer-focus:top-1 peer-focus:bg-white peer-focus:px-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2"
                    >
                      Your Message
                    </label>
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3.5 px-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-amber-100 transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    <span>Send Message</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </motion.button>
                </form>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800">Contact Information</h3>
                <p className="text-gray-600">Have questions or ready to plan your next event? Reach out to us through any of these channels.</p>
                
                <div className="space-y-5">
                  <motion.a 
                    href="mailto:info@sreenathevents.com" 
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 group-hover:bg-amber-200 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <span className="block text-sm text-gray-500">Email us at</span>
                      <span className="font-medium text-gray-800 group-hover:text-amber-600 transition-colors">info@sreenathevents.com</span>
                    </div>
                  </motion.a>

                  <motion.a 
                    href="tel:+919876543210" 
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 group-hover:bg-amber-200 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                    <div>
                      <span className="block text-sm text-gray-500">Call us at</span>
                      <span className="font-medium text-gray-800 group-hover:text-amber-600 transition-colors">+91 98765 43210</span>
                      <span className="block text-xs text-gray-500 mt-0.5">Mon-Sat, 9:00 AM - 7:00 PM</span>
                    </div>
                  </motion.a>

                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 group-hover:bg-amber-200 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <span className="block text-sm text-gray-500">Visit us at</span>
                      <span className="font-medium text-gray-800">123 Event Street</span>
                      <span className="block text-gray-600">Connaught Place, New Delhi 110001</span>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="pt-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Follow Us</h4>
                <div className="flex items-center gap-3">
                  {[
                    { name: 'Instagram', icon: 'M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 011.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.07 1.407.07 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772 4.915 4.915 0 01-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.407.07-4.122.07-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.5c-2.67 0-2.986.01-4.04.06-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.05 1.055-.06 1.37-.06 4.04 0 2.67.01 2.986.06 4.04.045.977.207 1.505.344 1.858.182.465.398.8.748 1.15.35.35.684.566 1.15.748.353.137.882.3 1.857.344 1.054.05 1.37.06 4.04.06 2.67 0 2.986-.01 4.04-.06.977-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.05-1.055.06-1.37.06-4.04 0-2.67-.01-2.986-.06-4.04-.045-.976-.207-1.504-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.138-.882-.3-1.857-.344-1.054-.05-1.37-.06-4.04-.06zm0 2.5a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm7.5-3a1 1 0 110 2 1 1 0 010-2z' },
                    { name: 'Facebook', icon: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z' },
                    { name: 'Pinterest', icon: 'M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.84 9.49-.1-.79-.19-2.005.04-2.868.2-.82 1.31-5.25 1.31-5.25s-.33-.65-.33-1.6c0-1.5.87-2.62 1.95-2.62.92 0 1.36.69 1.36 1.51 0 .93-.6 2.32-.9 3.6-.26 1.1.55 1.99 1.64 1.99 1.97 0 3.37-2.5 3.37-5.47 0-2.22-1.5-3.89-4.28-3.89-3.03 0-4.9 2.27-4.9 4.85 0 .93.3 1.57.8 2.07.22.26.25.36.17.66-.06.23-.18.8-.21.91-.03.13-.1.16-.23.1-.87-.35-1.4-1.4-1.4-2.5 0-1.85 1.44-4.07 4.2-4.07 2.2 0 3.84 1.56 3.84 3.65 0 2.34-1.34 4.05-3.16 4.05-.62 0-1.2-.32-1.4-.7l-.38 1.45c-.14.53-.43 1.2-.64 1.6.48.15.99.23 1.52.23 5.523 0 10-4.477 10-10S17.523 2 12 2z' },
                  ].map((social) => (
                    <motion.a
                      key={social.name}
                      href="#"
                      whileHover={{ y: -3, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                      aria-label={social.name}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d={social.icon} />
                      </svg>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h3>
                <p className="text-gray-600">Have questions or ready to plan your next event? Reach out to us through any of these channels.</p>
                <p className="text-gray-600 mb-6">Fill out the form or reach out to us through any of the channels below. Our team will get back to you within 24 hours.</p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <svg className="h-5 w-5 text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Email us</p>
                      <p className="text-sm text-amber-600">info@sreenathevents.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <svg className="h-5 w-5 text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Call us</p>
                      <p className="text-sm text-amber-600">+91 98765 43210</p>
                      <p className="text-sm text-gray-500 mt-1">Mon-Sat, 9:00 AM - 7:00 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <svg className="h-5 w-5 text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Visit us</p>
                      <p className="text-sm text-gray-600">123 Event Street, Connaught Place</p>
                      <p className="text-sm text-gray-600">New Delhi, 110001</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Follow us</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                      <span className="sr-only">Facebook</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                      <span className="sr-only">Instagram</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                      <span className="sr-only">Pinterest</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12.017 0C5.38 0 .004 5.37.004 11.99c0 5.016 3.097 9.31 7.477 11.126-.105-.949-.198-2.41.042-3.44.218-.937 1.406-5.965 1.406-5.965s-.359-.72-.359-1.78c0-1.667.965-2.914 2.17-2.914 1.025 0 1.517.77 1.517 1.689 0 1.027-.653 2.566-.997 3.99-.288 1.19.6 2.16 1.771 2.16 2.13 0 3.768-2.246 3.768-5.49 0-2.873-2.065-4.88-5.01-4.88-3.41 0-5.41 2.56-5.41 5.19 0 1.03.397 2.14.89 2.737.098.12.11.225.083.345-.09.375-.293 1.199-.33 1.363-.053.225-.18.27-.42.164-1.57-.732-2.55-3.02-2.55-4.855 0-3.94 2.86-7.55 8.25-7.55 4.33 0 7.69 3.09 7.69 7.21 0 4.3-2.71 7.76-6.48 7.76-1.28 0-2.47-.66-2.88-1.45l-.79 3.01c-.28 1.1-1.05 2.47-1.56 3.31.93.29 1.93.44 2.96.44 6.63 0 11.98-5.37 11.98-11.99C23.996 5.37 18.637 0 12.017 0z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="bg-amber-50 rounded-2xl p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Business Hours</h3>
                <dl className="space-y-3">
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600">Monday - Friday</dt>
                    <dd className="text-sm font-medium text-gray-900">9:00 AM - 7:00 PM</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600">Saturday</dt>
                    <dd className="text-sm font-medium text-gray-900">10:00 AM - 6:00 PM</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600">Sunday</dt>
                    <dd className="text-sm font-medium text-gray-900">By Appointment</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="font-serif text-xl">Sree Nath Events</div>
            <p className="mt-3 text-gray-600">A luxury event design studio crafting immersive experiences across India.</p>
          </div>
          <div>
            <div className="font-medium">Quick Links</div>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              <li><button onClick={() => enhancedScrollTo('home')} className="hover:text-gray-900">Home</button></li>
              <li><button onClick={() => enhancedScrollTo('about')} className="hover:text-gray-900">About</button></li>
              <li><button onClick={() => enhancedScrollTo('services')} className="hover:text-gray-900">Services</button></li>
              <li><button onClick={() => enhancedScrollTo('booking')} className="hover:text-gray-900">Book a Consultation</button></li>
            </ul>
          </div>
          <div>
            <div className="font-medium">Follow Us</div>
            <div className="mt-3 flex gap-3">
              <IconLink label="Instagram" href="#"><InstagramIcon /></IconLink>
              <IconLink label="Pinterest" href="#"><PinterestIcon /></IconLink>
              <IconLink label="Facebook" href="#"><FacebookIcon /></IconLink>
            </div>
          </div>
          <div>
            <div className="font-medium">Contact Us</div>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              <li className="flex gap-2"><PhoneIcon /> +91 98765 43210</li>
              <li className="flex gap-2"><MailIcon /> hello@sreenathevents.in</li>
              <li className="flex gap-2"><MapPinIcon /> Jaipur, Rajasthan, India</li>
            </ul>
          </div>
        </div>
        <div className="py-6 text-center text-xs text-gray-500">2023 Sree Nath Events. All rights reserved.</div>
      </footer>
    </div>
  )}
/>

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

function IconLink({ href, label, children }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="inline-flex items-center text-amber-600 hover:text-amber-700"
    >
      {children}
      <span className="ml-1">{label}</span>
    </a>
  );
}

function Calendar({ selected, onSelect }) {
  const [month, setMonth] = useState(new Date())
  const startOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1)
  const endOfMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0)
  const addMonths = (date, m) => new Date(date.getFullYear(), date.getMonth() + m, 1)
  const isSameDay = (a, b) => a && b && a.toDateString() === b.toDateString()

  const grid = () => {
    const start = startOfMonth(month)
    const end = endOfMonth(month)
    const days = []
    const offset = (start.getDay() + 6) % 7
    for (let i = 0; i < offset; i++) days.push(null)
    for (let d = 1; d <= end.getDate(); d++) days.push(new Date(month.getFullYear(), month.getMonth(), d))
    const rows = []
    for (let i = 0; i < days.length; i += 7) rows.push(days.slice(i, i + 7))
    return rows
  }

  const monthName = month.toLocaleString('default', { month: 'long', year: 'numeric' })

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/event-decoration" element={<EventDecoration />} />
        <Route path="/" element={
          <div className="min-h-screen bg-white">
            <div className="flex items-center justify-between">
              <button onClick={() => setMonth(addMonths(month, -1))} className="p-2 rounded hover:bg-gray-50" aria-label="Prev month"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
              <div className="font-medium">{monthName}</div>
              <button onClick={() => setMonth(addMonths(month, 1))} className="p-2 rounded hover:bg-gray-50" aria-label="Next month"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
            </div>
            <div className="mt-3 grid grid-cols-7 text-center text-xs text-gray-500">
              {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d) => (<div key={d} className="py-1">{d}</div>))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-sm">
              {grid().flat().map((d, i) => (
                <button key={i} disabled={!d} onClick={() => onSelect(d)} className={cls('aspect-square rounded-md flex items-center justify-center', !d && 'opacity-0', d && 'hover:bg-gray-50', isSameDay(d, selected) && 'ring-2 ring-gold')}>{d ? d.getDate() : ''}</button>
              ))}
            </div>
          </div>
        } />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <TranslationProvider>
      <Router>
        <AppContent />
      </Router>
    </TranslationProvider>
  );
}

export default App;

// Icons (inline SVG)
// Check component is already defined above

// IconLink component
function IconLink({ href, label, children }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-gray-500 hover:text-amber-500 transition-colors"
      aria-label={label}
    >
      {children}
    </a>
  );
}
function CoffeeIcon() { return (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8h13a4 4 0 1 1 0 8H3a6 6 0 0 0 6 6h4" /><path d="M3 8v4a6 6 0 0 0 6 6" /></svg>) }
function BoardIcon() { return (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="14" rx="2"/><path d="M7 8h4M7 12h10"/></svg>) }
function ToolsIcon() { return (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 7l-9 9 3 3 9-9M14 7l3 3"/><path d="M2 22l4-1 1-4"/></svg>) }
function StarIcon() { return (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.3 6.9.6-5.2 4.5 1.7 6.6L12 16.9 5.7 20l1.7-6.6L2.2 8.9l6.9-.6L12 2z"/></svg>) }
function PhoneIcon() { return (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.9.3 1.77.57 2.61a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.47-1.08a2 2 0 0 1 2.11-.45c.84.27 1.71.45 2.61.57A2 2 0 0 1 22 16.92z"/></svg>) }
function MailIcon() { return (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16v16H4z"/><path d="M22 6l-10 7L2 6"/></svg>) }
function MapPinIcon() { return (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s7-4.35 7-11a7 7 0 1 0-14 0c0 6.65 7 11 7 11z"/><circle cx="12" cy="11" r="3"/></svg>) }
function InstagramIcon() { return (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>) }
function PinterestIcon() { return (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a9.93 9.93 0 0 0-3.53 19.23c-.05-.82-.1-2.08.02-2.98.11-.76.73-4.85.73-4.85s-.19-.38-.19-.95c0-.9.52-1.57 1.18-1.57.55 0 .81.41.81.9 0 .55-.35 1.36-.53 2.12-.15.64.31 1.17.94 1.17 1.13 0 2-1.19 2-2.9 0-1.51-1.09-2.57-2.64-2.57-1.8 0-2.86 1.35-2.86 2.75 0 .54.21 1.11.47 1.42.05.06.06.11.05.17-.05.18-.16.57-.18.65-.03.1-.09.13-.2.08-.74-.35-1.2-1.46-1.2-2.35 0-1.92 1.39-3.68 4.02-3.68 2.11 0 3.75 1.5 3.75 3.5 0 2.1-1.32 3.79-3.14 3.79-.61 0-1.18-.32-1.38-.71l-.38 1.44c-.14.55-.52 1.24-.77 1.66A10 10 0 1 0 12 2z"/></svg>) }
function FacebookIcon() { return (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.5 9.87v-6.99H7.9V12h2.6V9.8c0-2.57 1.53-4 3.87-4 1.12 0 2.3.2 2.3.2v2.52h-1.3c-1.28 0-1.68.8-1.68 1.62V12h2.85l-.46 2.88h-2.39v6.99A10 10 0 0 0 22 12z"/></svg>) }
