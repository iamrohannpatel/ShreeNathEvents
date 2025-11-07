
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiHome, FiUser, FiStar, FiImage, FiMail, FiChevronRight, FiCalendar } from 'react-icons/fi';

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

  export default MobileMenu;
