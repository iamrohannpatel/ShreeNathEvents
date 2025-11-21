import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiSearch, FiX, FiPlus } from 'react-icons/fi';

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
    const [searchTerm, setSearchTerm] = useState('');
    const [showRequestForm, setShowRequestForm] = useState(false);
    const modalRef = useRef(null);
    const navigate = useNavigate();

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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

    const displayEvents = searchTerm ? filteredEvents : eventTypes;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Navigation Bar */}
            <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-full transition-all duration-300 group"
                    >
                        <FiArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Back</span>
                    </button>

                    <div className="flex items-center gap-4">
                        <div className="relative hidden sm:block">
                            <input
                                type="text"
                                placeholder="Search events..."
                                className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-full focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all w-64"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>

                        <button
                            onClick={() => setShowRequestForm(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors shadow-md hover:shadow-lg"
                        >
                            <FiPlus className="w-5 h-5" />
                            <span className="hidden sm:inline">Request Custom</span>
                        </button>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                        Event Decoration Services
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Explore our curated collection of decoration themes. From intimate gatherings to grand celebrations, we bring your vision to life.
                    </p>
                </motion.div>

                {/* Mobile Search Bar */}
                <div className="sm:hidden mb-8">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search events..."
                            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <AnimatePresence>
                        {displayEvents.map((event, index) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        type: 'spring',
                                        stiffness: 50,
                                        damping: 15,
                                        delay: index * 0.05
                                    }
                                }}
                                whileHover={{ y: -8 }}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100"
                            >
                                {/* Image Container */}
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={event.image}
                                        alt={event.name}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                                    <div className="absolute bottom-4 left-4 right-4 text-white">
                                        <h3 className="text-2xl font-bold mb-1">{event.name}</h3>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <p className="text-gray-600 mb-6 line-clamp-2 h-12">{event.description}</p>

                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            className="px-4 py-2.5 text-sm font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors border border-amber-100"
                                            onClick={() => setSelectedEvent(event)}
                                        >
                                            View Details
                                        </button>
                                        <button
                                            className="px-4 py-2.5 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors shadow-md hover:shadow-lg"
                                            onClick={() => setSelectedEvent(event)}
                                        >
                                            Book Now
                                        </button>
                                    </div>
                                </div>
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
                            <div className="flex items-center justify-center min-h-screen p-4">
                                <motion.div
                                    className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                                    onClick={() => setShowRequestForm(false)}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                />

                                <motion.div
                                    ref={modalRef}
                                    className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                                >
                                    <div className="bg-amber-600 p-6 text-white flex justify-between items-center">
                                        <h2 className="text-2xl font-bold">Request Custom Event</h2>
                                        <button onClick={() => setShowRequestForm(false)} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                                            <FiX className="w-6 h-6" />
                                        </button>
                                    </div>

                                    <div className="p-6">
                                        <form className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                                                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" placeholder="e.g. Graduation Party" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                                <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Info</label>
                                                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Email or Phone" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
                                                <textarea rows="3" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Tell us more..."></textarea>
                                            </div>
                                            <button type="submit" className="w-full py-3 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-700 transition-colors shadow-lg">
                                                Submit Request
                                            </button>
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
