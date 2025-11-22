import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Footer = ({ enhancedScrollTo }) => {
  const currentYear = new Date().getFullYear();
  const [showContent, setShowContent] = useState(false);

  return (
    <footer className="relative bg-neutral-900 pt-24 pb-12 overflow-hidden min-h-[60vh] flex flex-col justify-center">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-70"></div>

      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.03]">
        <h1 className="text-[15vw] font-serif font-bold text-white whitespace-nowrap">SREE NATH</h1>
      </div>

      <AnimatePresence mode="wait">
        {!showContent ? (
          <motion.div
            key="intro"
            className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4 bg-neutral-900"
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true }}
            onViewportEnter={() => {
              setTimeout(() => setShowContent(true), 3500);
            }}
          >
            <motion.div
              className="flex flex-wrap justify-center gap-x-3 gap-y-2 max-w-4xl"
              variants={{
                hidden: { opacity: 1 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.2,
                  },
                },
                exit: {
                  opacity: 0,
                  transition: {
                    staggerChildren: 0.1,
                    staggerDirection: 1,
                    when: "afterChildren",
                  },
                },
              }}
            >
              {["Designed,", "Developed,", "&", "Deployed"].map((word, i) => (
                <motion.span
                  key={i}
                  className="text-4xl md:text-6xl font-black text-white tracking-tight"
                  variants={{
                    hidden: { opacity: 0, x: -50, filter: "blur(10px)" },
                    visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { type: "spring", damping: 12, stiffness: 100 } },
                    exit: { opacity: 0, x: 50, filter: "blur(10px)", transition: { duration: 0.4 } }
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-wrap justify-center gap-x-3 gap-y-2 mt-4"
              variants={{
                hidden: { opacity: 1 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 1.0, // Delay after first line
                  },
                },
                exit: {
                  opacity: 0,
                  transition: {
                    staggerChildren: 0.1,
                    staggerDirection: 1,
                  },
                },
              }}
            >
              {["by", "Rohan", "Patel"].map((word, i) => (
                <motion.span
                  key={i}
                  className="text-3xl md:text-5xl font-black text-amber-500 tracking-tight"
                  variants={{
                    hidden: { opacity: 0, x: -50, filter: "blur(10px)" },
                    visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { type: "spring", damping: 12, stiffness: 100 } },
                    exit: { opacity: 0, x: 50, filter: "blur(10px)", transition: { duration: 0.4 } }
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
          >
            {/* Newsletter Section */}
            <div className="mb-20 text-center max-w-3xl mx-auto">
              <h3 className="font-serif text-3xl text-white mb-4">Join Our Exclusive List</h3>
              <p className="text-gray-400 mb-8 font-light">Be the first to know about our latest curations and event inspirations.</p>
              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="flex-grow px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                />
                <button
                  type="button"
                  className="px-8 py-4 bg-amber-600 text-white font-medium tracking-wider uppercase rounded-lg hover:bg-amber-500 transition-colors duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16 border-t border-white/10 pt-16">

              {/* Brand Column */}
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">Sree Nath Events</h2>
                  <div className="w-12 h-1 bg-amber-500 mt-2 rounded-full"></div>
                </div>
                <p className="text-gray-400 leading-relaxed font-light">
                  Crafting immersive and unforgettable celebrations across India. We turn your vision into a masterpiece of elegance and luxury.
                </p>
                <div className="flex space-x-4">
                  {['Facebook', 'Instagram', 'Pinterest', 'Twitter'].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all duration-300"
                    >
                      <span className="sr-only">{social}</span>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="2" />
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="font-serif text-lg font-bold text-white mb-6 tracking-wide">Quick Links</h3>
                <ul className="space-y-4">
                  {[
                    { label: 'Home', id: 'home' },
                    { label: 'About Us', id: 'about' },
                    { label: 'Our Services', id: 'services' },
                    { label: 'Gallery', id: 'events' },
                    { label: 'Book Consultation', id: 'booking' }
                  ].map((link) => (
                    <li key={link.id}>
                      <button
                        onClick={() => enhancedScrollTo(link.id)}
                        className="text-gray-400 hover:text-amber-400 hover:translate-x-1 transition-all duration-300 flex items-center group"
                      >
                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div>
                <h3 className="font-serif text-lg font-bold text-white mb-6 tracking-wide">Our Expertise</h3>
                <ul className="space-y-4">
                  <li className="text-gray-400 hover:text-white transition-colors cursor-default">Luxury Weddings</li>
                  <li className="text-gray-400 hover:text-white transition-colors cursor-default">Corporate Galas</li>
                  <li className="text-gray-400 hover:text-white transition-colors cursor-default">Social Celebrations</li>
                  <li className="text-gray-400 hover:text-white transition-colors cursor-default">Destination Management</li>
                  <li className="text-gray-400 hover:text-white transition-colors cursor-default">Event Design & Decor</li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="font-serif text-lg font-bold text-white mb-6 tracking-wide">Contact Us</h3>
                <ul className="space-y-6">
                  <li className="flex items-start group">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-amber-500 mt-1 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-xs font-bold text-amber-500 uppercase tracking-wide mb-1">Visit</p>
                      <p className="text-gray-400 text-sm leading-relaxed group-hover:text-white transition-colors">123 Event Street, Connaught Place<br />New Delhi, 110001</p>
                    </div>
                  </li>
                  <li className="flex items-start group">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-amber-500 mt-1 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-xs font-bold text-amber-500 uppercase tracking-wide mb-1">Call</p>
                      <p className="text-gray-400 text-sm group-hover:text-white transition-colors">+91 98765 43210</p>
                    </div>
                  </li>
                  <li className="flex items-start group">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-amber-500 mt-1 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-xs font-bold text-amber-500 uppercase tracking-wide mb-1">Email</p>
                      <p className="text-gray-400 text-sm group-hover:text-white transition-colors">hello@sreenathevents.in</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-500 text-center md:text-left mb-4 md:mb-0">
                &copy; {currentYear} Sree Nath Events. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm text-gray-500">
                <a href="#" className="hover:text-amber-500 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-amber-500 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-amber-500 transition-colors">Sitemap</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  )
}

export default Footer;
