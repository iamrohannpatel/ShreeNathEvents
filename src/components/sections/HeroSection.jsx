
import React from 'react';
import { motion } from 'framer-motion';

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

  export default HeroSection;
