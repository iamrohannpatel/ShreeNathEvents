import React from 'react';
import { motion } from 'framer-motion';



// A simple component for the animated background blobs
const AnimatedBackground = () => (
    <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-white"></div>
        {/* Optional: grid background */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        {/* NEW: Animated Blobs for depth */}
        <motion.div
            className="absolute top-1/4 left-1/4 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40"
            animate={{
                x: [0, 50, 0],
                y: [0, -30, 0],
            }}
            transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
            }}
        />
        <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
            animate={{
                x: [0, -40, 0],
                y: [0, 60, 0],
            }}
            transition={{
                duration: 12,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 2,
            }}
        />
    </div>
);

// Framer Motion Variants for staggered animations
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2, // This will make children animate one by one
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    },
};


const HeroSection = ({ translations, language, scrollTo }) => (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden" data-section="home">
        <AnimatedBackground />
      
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                
                {/* --- Left Column: Text Content --- */}
                <motion.div
                    className="text-center lg:text-left"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible" // Animate when the component mounts
                >
                    <motion.span 
                        className="inline-block px-4 py-2 mb-6 text-sm font-semibold tracking-wider text-amber-800 bg-amber-100 rounded-full shadow-sm"
                        variants={itemVariants}
                    >
                        {translations[language].elevatingEvents}
                    </motion.span>
                    
                    <motion.h1 
                        className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6"
                        variants={itemVariants}
                    >
                        <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent leading-snug">
                            {translations[language].beautifulEvents}
                        </span>
                        <span className="block mt-2">{translations[language].everyTime}</span>
                    </motion.h1>
                    
                    <motion.p 
                        className="text-lg text-gray-600 mb-10 max-w-xl mx-auto lg:mx-0"
                        variants={itemVariants}
                    >
                        {translations[language].transformEvents}
                    </motion.p>
                    
                    <motion.div 
                        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        variants={itemVariants}
                    >
                        <motion.button 
                            whileHover={{ scale: 1.05, y: -2, boxShadow: '0 10px 20px -5px rgba(245, 158, 11, 0.4)' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => scrollTo('contact')}
                            className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-lg shadow-lg transition-all transform"
                        >
                            {translations[language].planYourEvent}
                        </motion.button>
                        <motion.button 
                            // IMPROVED: Added 'group' class for the icon animation to work
                            className="group flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-gray-800 font-semibold rounded-lg border-2 border-amber-400 hover:bg-amber-50 transition-all"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => scrollTo('services')}
                        >
                            <span>{translations[language].explore}</span>
                            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </motion.button>
                    </motion.div>
                </motion.div>

                {/* --- Right Column: Visual Element --- */}
                <motion.div 
                    className="hidden lg:block relative"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="relative w-full h-full">
                        <div className="absolute -top-8 -left-8 w-full h-full bg-amber-200 rounded-3xl transform -rotate-6"></div>
                        <img 
                            src="/path/to/your/event-image.jpg" // IMPORTANT: Replace with your image
                            alt="Beautifully organized event"
                            className="relative w-full h-auto object-cover rounded-3xl shadow-2xl"
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    </section>
);

export default HeroSection;