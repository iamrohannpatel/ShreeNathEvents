import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiCamera, FiPenTool, FiSmile, FiCoffee, FiX, FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const services = [
  {
    id: 1,
    title: 'Event & Decoration',
    shortDescription: 'Stunning event setups and decorations for all occasions',
    description: 'Transform your special occasions with our exquisite decoration services. We create stunning setups for weddings, parties, and corporate events.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    icon: <FiCalendar className="w-8 h-8 text-amber-500" />,
    isPrimary: true
  },
  {
    id: 2,
    title: 'Photography & Videography',
    shortDescription: 'Professional photography and videography services',
    description: 'Capture your precious moments with our professional photography and videography services.',
    image: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    icon: <FiCamera className="w-8 h-8 text-amber-500" />,
    isPrimary: false
  },
  {
    id: 3,
    title: 'Mehandi Artist',
    shortDescription: 'Intricate and beautiful mehandi designs',
    description: 'Intricate and beautiful mehandi designs that enhance your celebration.',
    image: 'https://images.unsplash.com/photo-1603532648955-039310d7847d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80',
    icon: <FiPenTool className="w-8 h-8 text-amber-500" />,
    isPrimary: false
  },
  {
    id: 4,
    title: 'Makeup Artist',
    shortDescription: 'Professional makeup for all occasions',
    description: 'Professional makeup services for bridal, party, and special occasions.',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    icon: <FiSmile className="w-8 h-8 text-amber-500" />,
    isPrimary: false
  },
  {
    id: 5,
    title: 'Catering & More',
    shortDescription: 'Complete catering and event solutions',
    description: 'Complete event solutions including catering and entertainment services.',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    icon: <FiCoffee className="w-8 h-8 text-amber-500" />,
    isPrimary: false
  }
];

const ServiceCard = ({ service, index, onLearnMore }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  
  const handleLearnMore = (serviceTitle) => {
    if (serviceTitle === 'Event & Decoration') {
      navigate('/event-decoration');
    } else {
      // Call the parent's handleLearnMore function
      onLearnMore(serviceTitle);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center">
            <div className="bg-white/90 backdrop-blur-sm p-2 rounded-lg mr-3">
              {service.icon}
            </div>
            <h3 className="text-xl font-bold text-white">{service.title}</h3>
            {service.isPrimary && (
              <span className="ml-3 bg-amber-100 text-amber-800 text-xs font-medium px-2 py-1 rounded-full">
                Popular
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-600 mb-4">{service.shortDescription}</p>
        <motion.button
          whileHover={{ x: 5 }}
          className="flex items-center text-amber-600 font-medium group"
          onClick={() => handleLearnMore(service.title)}
        >
          {service.title === 'Event & Decoration' ? 'Explore Packages' : 'Learn more'}
          <FiArrowRight className="w-4 h-4 ml-2 transition-transform transform group-hover:translate-x-1" />
        </motion.button>
      </div>
    </motion.div>
  );
};

const ComingSoonModal = ({ isOpen, onClose, serviceName }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-2xl max-w-md w-full p-8 relative"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <FiX className="w-6 h-6" />
          </button>
          
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-amber-100 mb-4">
              <svg className="h-8 w-8 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon!</h3>
            <p className="text-gray-600 mb-6">
              Our {serviceName} service will be available soon. We're working hard to bring you the best experience.
            </p>
            <p className="text-sm text-gray-500">
              In the meantime, feel free to explore our <span className="text-amber-600 font-medium">Event & Decoration</span> services or contact us for more information.
            </p>
            
            <div className="mt-6">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors"
              >
                Got it, thanks!
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Services = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [showEventDecoration, setShowEventDecoration] = useState(false);

  const filteredServices = activeFilter === 'all' 
    ? services 
    : services.filter(service => 
        activeFilter === 'featured' ? service.isPrimary : true
      );

  const handleLearnMore = (serviceTitle) => {
    if (serviceTitle !== 'Event & Decoration') {
      setSelectedService(serviceTitle);
      setModalOpen(true);
    }
  };

  if (showEventDecoration) {
    return <EventDecoration />;
  }

  return (
    <section id="services" className="pt-10 pb-16 md:pb-24 bg-gray-50 -mt-2">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-amber-600 text-sm font-semibold mb-3">
            OUR SERVICES
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Transform Your Events Into <span className="text-amber-600">Unforgettable</span> Experiences
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto my-6"></div>
          <p className="text-gray-800 text-lg">
            We specialize in creating magical moments that last a lifetime. From intimate gatherings to grand celebrations, we bring your vision to life with precision and creativity.
          </p>
          <div className="mt-6 inline-flex items-center bg-amber-50 border-l-4 border-amber-500 text-amber-700 p-4 rounded-r">
            <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium text-gray-900">Event and Decoration is our primary service.</span>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {['all', 'featured'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {filter === 'all' ? 'All Services' : 'Featured'}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredServices.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              index={index} 
              onLearnMore={(serviceTitle) => handleLearnMore(serviceTitle)}
            />
          ))}
          
          <ComingSoonModal 
            isOpen={modalOpen} 
            onClose={() => setModalOpen(false)} 
            serviceName={selectedService}
          />
        </motion.div>

        <div className="mt-16 bg-gradient-to-r from-amber-50 to-amber-100 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Ready to plan your event?
          </h3>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Let's create something extraordinary together. Our team is ready to help you plan your event with our expert event planning and decoration services.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-amber-600 text-white rounded-xl font-medium hover:bg-amber-700 transition-colors shadow-lg hover:shadow-amber-200"
            >
              Schedule Event
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-amber-600 border-2 border-amber-200 rounded-xl font-medium hover:bg-amber-50 transition-colors"
            >
              View Events
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
