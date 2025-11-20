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

const FloatingImage = ({ src, alt, className, delay = 0 }) => (
    <motion.div
        className={`relative overflow-hidden rounded-2xl shadow-xl shadow-amber-100/50 ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay }}
    >
        <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: delay * 2 // Offset the float animation
            }}
            className="h-full w-full"
        >
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
        </motion.div>
    </motion.div>
);

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
                            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </motion.button>
                    </motion.div>
                </motion.div>

                {/* --- Right Column: Floating Staggered Gallery --- */}
                <div className="relative hidden lg:block h-[600px]">
                    {/* Column 1 */}
                    <div className="absolute top-0 left-0 w-1/3 pr-2 space-y-4">
                        <FloatingImage src="/img1.jpg" alt="Wedding" className="h-48 w-full" delay={0} />
                        <FloatingImage src="/img4.jpg" alt="Decor" className="h-64 w-full" delay={0.2} />
                    </div>

                    {/* Column 2 - Shifted Down */}
                    <div className="absolute top-12 left-1/3 w-1/3 px-2 space-y-4">
                        <FloatingImage src="/img2.jpg" alt="Reception" className="h-64 w-full" delay={0.4} />
                        <FloatingImage src="/img5.jpg" alt="Details" className="h-48 w-full" delay={0.6} />
                    </div>

                    {/* Column 3 */}
                    <div className="absolute top-0 right-0 w-1/3 pl-2 space-y-4">
                        <FloatingImage src="/img3.jpg" alt="Ceremony" className="h-48 w-full" delay={0.8} />
                        <FloatingImage src="/img6.jpg" alt="Party" className="h-64 w-full" delay={1.0} />
                    </div>
                </div>

                {/* Mobile Fallback: Simple Carousel or Grid */}
                <div className="lg:hidden grid grid-cols-2 gap-3">
                    <img src="/img1.jpg" alt="Event" className="rounded-xl shadow-md" />
                    <img src="/img2.jpg" alt="Event" className="rounded-xl shadow-md mt-8" />
                    <img src="/img3.jpg" alt="Event" className="rounded-xl shadow-md" />
                    <img src="/img4.jpg" alt="Event" className="rounded-xl shadow-md mt-8" />
                </div>

            </div>
        </div>
    </section>
);

export default HeroSection;
