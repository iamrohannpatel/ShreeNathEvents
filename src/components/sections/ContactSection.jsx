import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Reusing the AnimatedBackground component for consistency with HeroSection
const AnimatedBackground = () => (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-white"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-50"></div>
        <motion.div
            className="absolute top-1/4 right-0 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
            animate={{
                x: [0, -50, 0],
                y: [0, 50, 0],
            }}
            transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse",
            }}
        />
        <motion.div
            className="absolute bottom-0 left-0 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30"
            animate={{
                x: [0, 40, 0],
                y: [0, -40, 0],
            }}
            transition={{
                duration: 12,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1,
            }}
        />
    </div>
);

const ContactSection = () => {
    const [form, setForm] = useState({ name: '', email: '', phone: '', eventType: '', message: '' });
    const [focused, setFocused] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleFocus = (e) => {
        setFocused(e.target.name);
    }

    const handleBlur = () => {
        setFocused('');
    }

    return (
        <section id="contact" className="relative py-16 md:py-20 overflow-hidden" data-section="contact">
            <AnimatedBackground />

            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 mb-3 text-xs font-bold tracking-wider text-amber-800 uppercase bg-amber-100 rounded-full"
                    >
                        Get In Touch
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-3"
                    >
                        Let's Plan Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Perfect Event</span>
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-400 mx-auto rounded-full"
                    ></motion.div>
                </div>

                <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
                    {/* Contact Info Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-5 space-y-6"
                    >
                        <div className="bg-white/60 backdrop-blur-md border border-white/50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                            <h3 className="font-sans font-bold text-xl text-gray-900 mb-4">Contact Information</h3>
                            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                                Ready to bring your vision to life? Reach out to us for a consultation, and let's start discussing your dream celebration.
                            </p>

                            <div className="space-y-4">
                                <a href="tel:+919876543210" className="flex items-center group p-3 rounded-xl hover:bg-amber-50 transition-colors duration-300">
                                    <div className="w-10 h-10 flex-shrink-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wide">Call Us</p>
                                        <p className="text-base font-medium text-gray-900">+91 98765 43210</p>
                                    </div>
                                </a>

                                <a href="mailto:hello@sreenathevents.in" className="flex items-center group p-3 rounded-xl hover:bg-amber-50 transition-colors duration-300">
                                    <div className="w-10 h-10 flex-shrink-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wide">Email Us</p>
                                        <p className="text-base font-medium text-gray-900">hello@sreenathevents.in</p>
                                    </div>
                                </a>

                                <div className="flex items-center group p-3 rounded-xl hover:bg-amber-50 transition-colors duration-300">
                                    <div className="w-10 h-10 flex-shrink-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wide">Visit Us</p>
                                        <p className="text-base font-medium text-gray-900">Jaipur, Rajasthan, India</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-7"
                    >
                        <div className="bg-white/80 backdrop-blur-xl border border-white p-6 md:p-8 rounded-2xl shadow-xl">
                            <form className="space-y-4" onSubmit={(e) => {
                                e.preventDefault();
                                alert('Thank you! Your message has been sent.');
                                setForm({ name: '', email: '', phone: '', eventType: '', message: '' });
                            }}>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label htmlFor="name" className="text-xs font-medium text-gray-700 ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                            className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all duration-200 text-sm"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label htmlFor="email" className="text-xs font-medium text-gray-700 ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                            className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all duration-200 text-sm"
                                            placeholder="john@example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label htmlFor="phone" className="text-xs font-medium text-gray-700 ml-1">Phone Number</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={form.phone}
                                            onChange={handleChange}
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                            className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all duration-200 text-sm"
                                            placeholder="+91 98765 43210"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label htmlFor="eventType" className="text-xs font-medium text-gray-700 ml-1">Event Type</label>
                                        <div className="relative">
                                            <select
                                                id="eventType"
                                                name="eventType"
                                                value={form.eventType}
                                                onChange={handleChange}
                                                onFocus={handleFocus}
                                                onBlur={handleBlur}
                                                className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all duration-200 appearance-none text-sm"
                                            >
                                                <option value="" disabled>Select an event type</option>
                                                <option value="wedding">Wedding</option>
                                                <option value="corporate">Corporate Event</option>
                                                <option value="social">Social Gathering</option>
                                                <option value="other">Other</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label htmlFor="message" className="text-xs font-medium text-gray-700 ml-1">Your Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="3"
                                        value={form.message}
                                        onChange={handleChange}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                        className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all duration-200 resize-none text-sm"
                                        placeholder="Tell us about your dream event..."
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3 px-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 transform text-sm"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default ContactSection;
