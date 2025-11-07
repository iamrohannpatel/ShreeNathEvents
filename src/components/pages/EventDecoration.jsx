import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiChevronRight, FiSearch, FiX, FiPlus } from 'react-icons/fi';

const eventTypes = [
  { 
    id: 'stage-entry', 
    name: 'Stage and Entry',
    description: 'Stunning stage designs and grand entryway decorations to create a lasting first impression.',
    image: 'https://images.unsplash.com/photo-1519671482749-5b9eaf14d6b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  { 
    id: 'mandap', 
    name: 'Mandap Decoration',
    description: 'Elegant and traditional mandap designs adorned with flowers and fabrics for your special day.',
    image: 'https://images.unsplash.com/photo-1600697233275-18a3749e9a0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  { 
    id: 'haldi', 
    name: 'Haldi Ceremony',
    description: 'Vibrant and cheerful decorations to celebrate the auspicious Haldi ceremony.',
    image: 'https://images.unsplash.com/photo-1600701714838-1c1b0a0c0d9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  { 
    id: 'mehandi', 
    name: 'Mehandi Function',
    description: 'Beautifully decorated spaces with traditional elements for the Mehandi ceremony.',
    image: 'https://images.unsplash.com/photo-1600697233275-18a3749e9a0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  { 
    id: 'sangeet', 
    name: 'Sangeet Night',
    description: 'Glamorous and lively decorations for a night of music and dance celebrations.',
    image: 'https://images.unsplash.com/photo-1519671482749-5b9eaf14d6b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  { 
    id: 'birthday', 
    name: 'Birthday Party',
    description: 'Fun and creative themes to make birthdays extra special and memorable.',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  { 
    id: 'engagement', 
    name: 'Engagement',
    description: 'Elegant and romantic decorations to celebrate your engagement ceremony.',
    image: 'https://images.unsplash.com/photo-1600697233275-18a3749e9a0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  { 
    id: 'baby-shower', 
    name: 'Baby Shower',
    description: 'Adorable decorations to welcome the little one in a heartwarming celebration.',
    image: 'https://images.unsplash.com/photo-1600701714838-1c1b0a0c0d9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  { 
    id: 'anniversary', 
    name: 'Wedding Anniversaries',
    description: 'Romantic and elegant decorations to celebrate years of togetherness.',
    image: 'https://images.unsplash.com/photo-1519671482749-5b9eaf14d6b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  { 
    id: 'corporate', 
    name: 'Corporate Events',
    description: 'Professional and sophisticated decor for all your corporate gatherings.',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  { 
    id: 'reception', 
    name: 'Wedding Reception',
    description: 'Grand and luxurious decorations to celebrate your special day in style.',
    image: 'https://images.unsplash.com/photo-1600697233275-18a3749e9a0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  { 
    id: 'cocktail', 
    name: 'Cocktail Party',
    description: 'Chic and stylish decor for an unforgettable cocktail evening.',
    image: 'https://images.unsplash.com/photo-1519671482749-5b9eaf14d6b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  }
];

const EventDecoration = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [ripple, setRipple] = useState({ x: 0, y: 0, isRippling: false });
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const searchInputRef = useRef(null);
  const buttonRefs = useRef({});
  const modalRef = useRef(null);

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowRequestForm(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredEvents = eventTypes.filter(event => 
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Use filteredEvents when searching, otherwise use all events
  const displayEvents = searchTerm ? filteredEvents : eventTypes;

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (!showSearch && searchInputRef.current) {
      // Focus the search input when it becomes visible
      setTimeout(() => searchInputRef.current.focus(), 100);
    } else {
      // Clear search when closing
      setSearchTerm('');
    }
  };

  const handleRipple = (event, id) => {
    const button = buttonRefs.current[id];
    if (!button) return;
    
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    setRipple({ x, y, isRippling: true });
    setTimeout(() => setRipple(prev => ({ ...prev, isRippling: false })), 600);
  };


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/#services" className="text-amber-600 hover:text-amber-700 mr-4">
                <FiArrowRight className="w-6 h-6 transform rotate-180" />
              </Link>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Event & Decoration</h1>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Request Event Button */}
              <button 
                onClick={() => setShowRequestForm(true)}
                className="hidden sm:flex items-center space-x-1 px-3 py-2 text-sm font-medium text-amber-700 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors"
              >
                <FiPlus className="w-4 h-4" />
                <span>Request Event</span>
              </button>
              
              {/* Mobile Request Button */}
              <button 
                onClick={() => setShowRequestForm(true)}
                className="sm:hidden p-2 text-amber-600 hover:bg-amber-100 rounded-full transition-colors"
                aria-label="Request custom event"
              >
                <FiPlus className="w-5 h-5" />
              </button>
              
              {/* Search Toggle Button */}
              <button 
                onClick={toggleSearch}
                className="p-2 text-gray-500 hover:text-amber-600 transition-colors"
                aria-label={showSearch ? 'Close search' : 'Open search'}
              >
                {showSearch ? <FiX className="w-6 h-6" /> : <FiSearch className="w-6 h-6" />}
              </button>
            </div>
          </div>
          
          {/* Search Bar */}
          {showSearch && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-4 mb-2"
            >
              <div className="relative max-w-2xl mx-auto">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search events..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label="Clear search"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-400">
            Event Decoration Services
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select an event type to explore our decoration packages and transform your special occasion
          </p>
        </motion.div>

        <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {displayEvents.map((event, index) => (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { 
                    type: 'spring',
                    stiffness: 100,
                    damping: 15,
                    delay: index * 0.03 
                  }
                }}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="relative overflow-hidden group bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                {/* Event Image */}
                <div className="h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Event Content */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{event.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 mt-4">
                    <button 
                      className="flex-1 px-3 py-2 text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors"
                      onClick={() => setSelectedEvent(event)}
                    >
                      View Work
                    </button>
                    <button 
                      className="flex-1 px-3 py-2 text-xs font-medium text-white bg-amber-500 hover:bg-amber-600 rounded-lg transition-colors"
                      onClick={() => setSelectedEvent(event)}
                    >
                      Event Gallery
                    </button>
                    <button 
                      className="flex-1 px-3 py-2 text-xs font-medium text-white bg-amber-700 hover:bg-amber-800 rounded-lg transition-colors"
                      onClick={() => setSelectedEvent(event)}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
                
                {/* Subtle floating animation */}
                <motion.div 
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent via-transparent to-amber-50/30 -z-10"
                  animate={{
                    y: [0, 5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: index * 0.1
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Custom Event Request Modal */}
        <AnimatePresence>
          {showRequestForm && (
            <motion.div 
              className="fixed inset-0 z-50 overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start justify-center min-h-screen p-4 sm:p-6">
                {/* Backdrop */}
                <motion.div 
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                  onClick={() => setShowRequestForm(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                
                {/* Modal Content */}
                <motion.div 
                  ref={modalRef}
                  className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl transform transition-all my-8"
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.98 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 500 }}
                >
                  {/* Header */}
                  <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-md mb-4 mx-auto">
                          <FiPlus className="w-8 h-8 text-amber-600" />
                        </div>
                        <h2 className="text-2xl font-bold">Can't Find Your Event?</h2>
                        <p className="text-amber-100 mt-1">
                          Don't see your specific event type listed? Let us know what you're looking for, and we'll create a custom decoration package just for you!
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowRequestForm(false);
                        }}
                        className="p-1.5 rounded-full hover:bg-amber-400/20 transition-colors"
                        aria-label="Close form"
                      >
                        <FiX className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Form */}
                  <div className="p-6 sm:p-8">
                    <form className="space-y-5">
                      <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-2 -mr-2">
                        <div className="space-y-1.5">
                          <label htmlFor="event-type" className="block text-sm font-medium text-gray-700">
                            Event Type
                          </label>
                          <input
                            type="text"
                            id="event-type"
                            placeholder="e.g., Corporate Gala, Baby Naming Ceremony"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                          />
                        </div>
                        
                        <div className="space-y-1.5">
                          <label htmlFor="event-date" className="block text-sm font-medium text-gray-700">
                            Event Date
                          </label>
                          <input
                            type="date"
                            id="event-date"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                          />
                        </div>
                        
                        <div className="space-y-1.5">
                          <label htmlFor="contact-info" className="block text-sm font-medium text-gray-700">
                            Contact Information
                          </label>
                          <input
                            type="email"
                            id="contact-info"
                            placeholder="Your email or phone number"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                          />
                        </div>
                        
                        <div className="space-y-1.5">
                          <label htmlFor="special-requests" className="block text-sm font-medium text-gray-700">
                            Special Requests
                          </label>
                          <textarea
                            id="special-requests"
                            rows="2"
                            placeholder="Tell us about your event and any specific decoration ideas you have in mind..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all resize-none"
                          ></textarea>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-100 mt-4">
                        <button
                          type="submit"
                          className="w-full px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                        >
                          Submit Request
                        </button>
                        
                        <p className="text-xs text-gray-500 mt-4 text-center">
                          We'll get back to you within 24 hours with a personalized quote and decoration ideas.
                        </p>
                      </div>
                    </form>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default EventDecoration;
