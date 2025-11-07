
import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = () => {
    return(
<section 
        id="about" 
        className="relative bg-gradient-to-b from-amber-50 via-white to-white pt-12 pb-8 md:pb-16 overflow-hidden -mb-px"
        data-section="about"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-amber-700/5 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-200/10 rounded-full -mr-32 -mb-32"></div>
        <div className="absolute top-1/2 left-0 w-32 h-32 bg-amber-100/20 rounded-full -ml-16 -mt-16"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-amber-700 bg-amber-100 rounded-full mb-3">
              The Visionary
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
              Meet <span className="text-amber-600">Shivam</span>
            </h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div 
              className="relative group p-1"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative transform transition-all duration-500"
                style={{
                  borderRadius: '1rem',
                  padding: '4px',
                  background: 'linear-gradient(135deg, #FFB800, #FF8A00)',
                  boxShadow: '0 25px 50px -12px rgba(255, 184, 0, 0.25), 0 8px 24px -8px rgba(255, 138, 0, 0.15), 0 0 48px -4px rgba(0, 0, 0, 0.1), inset 0 2px 4px rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease-in-out'
                }}
              >
                <div className="relative overflow-hidden rounded-lg">
                  <img 
                    src="/Shivam.jpg" 
                    alt="Shivam — Founder & Lead Event Planner" 
                    className="w-full h-auto max-h-[32rem] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <div className="text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-sm font-medium text-amber-300">Event Maestro</p>
                    <p className="text-xs text-amber-100">Creating magic since 2015</p>
                  </div>
                </div>
              </div>
              <div className="hidden md:block absolute -right-6 -bottom-6 w-40 h-40 bg-amber-100 rounded-full -z-10"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <span className="text-sm uppercase tracking-wider font-medium text-amber-600">Founder & Lead Event Planner</span>
                <h3 className="mt-2 text-2xl md:text-3xl font-serif font-semibold text-gray-900">
                  Crafting Unforgettable Experiences
                </h3>
                
                <div className="mt-6 space-y-5 text-gray-700">
                  <p className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-amber-400 before:rounded-full">
                    With a keen eye for detail and a passion for perfection, I transform ordinary spaces into extraordinary experiences that leave lasting impressions.
                  </p>
                  <p className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-amber-400 before:rounded-full">
                    My journey in event planning has taken me through hundreds of celebrations, each teaching me that the magic lies in the details and the personal touch.
                  </p>
                  <p className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-amber-400 before:rounded-full">
                    I believe in creating events that are not just seen but felt—where every element tells a story and every moment is a memory in the making.
                  </p>
                </div>

                <div className="mt-8 p-6 bg-amber-50 rounded-xl border-l-4 border-amber-400">
                  <div className="flex">
                    <svg className="w-6 h-6 text-amber-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <div>
                      <p className="italic text-gray-800">"My mission is to turn your vision into reality, creating events that are as unique as they are memorable. Every detail tells a story—let's write yours together."</p>
                      <p className="mt-2 text-sm font-medium text-amber-700">— Shivam, Founder</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      )
}

export default AboutSection;
