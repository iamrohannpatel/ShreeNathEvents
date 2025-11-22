import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/layout/Header';
import MobileMenu from './components/layout/MobileMenu';
import Footer from './components/layout/Footer';

import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ContactSection from './components/sections/ContactSection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import BookingSection from './components/sections/BookingSection';

import Services from './components/Services';
import Events from './components/Events';
import GalleryPage from './pages/GalleryPage';
import EventDecoration from './pages/EventDecoration';

const translations = {
  en: {
    elevatingEvents: 'ELEVATING EVENTS TO ART FORMS',
    beautifulEvents: 'Beautiful Events, Every Single Time.',
    everyTime: '',
    transformEvents: 'We transform ordinary events into extraordinary experiences. Sree Nath Events, a luxury event design studio, crafts immersive and unforgettable celebrations across India.',
    planYourEvent: 'Plan Your Event',
    explore: 'Explore',
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      events: 'Events',
      contact: 'Contact'
    },
  },
  hi: {
    elevatingEvents: 'कला के रूपों में घटनाओं को ऊपर उठाना',
    beautifulEvents: 'खूबसूरत घटनाएँ, हर एक बार।',
    everyTime: '',
    transformEvents: 'हम साधारण घटनाओं को असाधारण अनुभवों में बदलते हैं। श्री नाथ इवेंट्स, एक लक्ज़री इवेंट डिज़ाइन स्टूडियो, पूरे भारत में यादगार समारोहों का निर्माण करता है।',
    planYourEvent: 'अपनी घटना की योजना बनाएं',
    explore: 'अन्वेषण करना',
    nav: {
      home: 'घर',
      about: 'हमारे बारे में',
      services: 'सेवाएं',
      events: 'आयोजन',
      contact: 'संपर्क'
    },
  }
};

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const location = useLocation();

  const isEventDecorationPage = location.pathname === '/event-decoration';

  const enhancedScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80; // Adjusted for header height
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white antialiased text-gray-900">
      {!isEventDecorationPage && (
        <>
          <Header
            scrolled={scrolled}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            enhancedScrollTo={enhancedScrollTo}
            language={language}
            setLanguage={setLanguage}
            translations={translations}
          />
          <MobileMenu
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            enhancedScrollTo={enhancedScrollTo}
            translations={translations}
            language={language}
          />
        </>
      )}

      <main>
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection
                translations={translations}
                language={language}
                scrollTo={enhancedScrollTo}
              />
              <AboutSection />
              <Services scrollTo={enhancedScrollTo} />
              <Events scrollTo={enhancedScrollTo} />
              <BookingSection />
              <TestimonialsSection />
              <ContactSection />
            </>
          } />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/event-decoration" element={<EventDecoration />} />
        </Routes>
      </main>

      {!isEventDecorationPage && <Footer enhancedScrollTo={enhancedScrollTo} />}
    </div>
  );
}

export default App;
