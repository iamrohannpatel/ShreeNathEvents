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
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

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
                        lang={language}
                    >
                        {translations[language].elevatingEvents}
                    </motion.span>

                    <motion.h1
                        className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6"
                        variants={itemVariants}
                    >
                        <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent leading-snug" lang={language}>
                            {translations[language].beautifulEvents}
                        </span>
                        <span className="block mt-2" lang={language}>{translations[language].everyTime}</span>
                    </motion.h1>

                    <motion.p
                        className="text-lg text-gray-600 mb-10 max-w-xl mx-auto lg:mx-0"
                        variants={itemVariants}
                        lang={language}
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
                            lang={language}
                        >
                            {translations[language].planYourEvent}
                        </motion.button>
                        <motion.button
                            // IMPROVED: Added 'group' class for the icon animation to work
                            className="group flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-gray-800 font-semibold rounded-lg border-2 border-amber-400 hover:bg-amber-50 transition-all"
                            lang={language}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => scrollTo('services')}
                        >
                            <span>{translations[language].explore}</span>
                            <svg className="w-5 h-5 text-amber-500 animate-bounce" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </motion.button>
                    </motion.div>
                </motion.div>

                {/* --- Right Column: Uniform 3x3 Grid with Background Design --- */}
                <motion.div
                    className="relative z-10 max-w-md lg:max-w-2xl mx-auto lg:mr-0"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Decorative Backplate (Glassmorphism) */}
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-md rounded-3xl -rotate-3 scale-105 shadow-2xl border border-white/50 -z-10"></div>
                    <div className="absolute inset-0 bg-amber-100/30 rounded-3xl rotate-2 scale-105 -z-20"></div>

                    {/* The Grid */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 p-3 bg-white/20 rounded-2xl border border-white/40 shadow-inner">
                        {[
                            { src: "/img1.jpg", alt: "Wedding Couple" },
                            { src: "/img2.jpg", alt: "Decor Setup" },
                            { src: "/img3.jpg", alt: "Ceremony Ritual" },
                            { src: "/img4.jpg", alt: "Floral Arrangement" },
                            { src: "/img5.jpg", alt: "Table Setting" },
                            { src: "/img6.jpg", alt: "Evening Party" },
                            { src: "/img7.jpg", alt: "Stage Design" },
                            { src: "/img8.jpg", alt: "Entrance Decor" },
                            { src: "/img9.jpg", alt: "Candid Moment" },
                        ].map((img, index) => (
                            <motion.div
                                key={index}
                                className="relative aspect-square lg:aspect-[3/2] overflow-hidden rounded-lg shadow-sm group"
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, zIndex: 10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                            </motion.div>
                        ))}
                    </div>

                    {/* Floating Decorative Elements */}
                    <div className="absolute -top-8 -right-8 w-20 lg:w-24 h-20 lg:h-24 bg-gradient-to-br from-amber-300 to-orange-300 rounded-full blur-xl opacity-60 animate-pulse"></div>
                    <div className="absolute -bottom-6 -left-6 w-24 lg:w-28 h-24 lg:h-28 bg-gradient-to-tr from-amber-200 to-white rounded-full blur-xl opacity-50"></div>
                </motion.div>

            </div>
        </div>
    </section>
);

export default HeroSection;
