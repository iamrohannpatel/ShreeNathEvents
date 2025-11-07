
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactSection = () => {
    const [form, setForm] = useState({ name: '', email: '', phone: '', eventType: '', message: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    return(
        <section id="contact" className="relative bg-gradient-to-br from-amber-50 to-white py-16 md:py-24 overflow-hidden" data-section="contact">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-20"></div>
        <div className="absolute top-1/4 -right-20 w-64 h-64 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-1/4 -left-20 w-64 h-64 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block text-amber-600 text-sm font-medium mb-3">Get In Touch</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Let's Create Something <span className="text-amber-500">Amazing</span> Together</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-200 mx-auto rounded-full"></div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/20 p-8">
              <form className="space-y-5">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name='name'
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      name='email'
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name='phone'
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      id="message"
                      name='message'
                      rows="4"
                      value={form.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300"
                      placeholder="Tell us about your event..."
                    ></textarea>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
            
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800">Contact Information</h3>
                <p className="text-gray-600">Have questions or ready to plan your next event? Reach out to us through any of these channels.</p>
                
                <div className="space-y-5">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Email Us</p>
                      <p className="text-sm text-amber-600">info@sreenathevents.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Call Us</p>
                      <p className="text-sm text-amber-600">+91 98765 43210</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Visit Us</p>
                      <p className="text-sm text-gray-600">123 Event Street, Connaught Place</p>
                      <p className="text-sm text-gray-600">New Delhi, 110001</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                      <span className="sr-only">Facebook</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                      <span className="sr-only">Instagram</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                      <span className="sr-only">Pinterest</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12.017 0C5.38 0 .004 5.37.004 11.99c0 5.016 3.097 9.31 7.477 11.126-.105-.949-.198-2.41.042-3.44.218-.937 1.406-5.965 1.406-5.965s-.359-.72-.359-1.78c0-1.667.965-2.914 2.17-2.914 1.025 0 1.517.77 1.517 1.689 0 1.027-.653 2.566-.997 3.99-.288 1.19.6 2.16 1.771 2.16 2.13 0 3.768-2.246 3.768-5.49 0-2.873-2.065-4.88-5.01-4.88-3.41 0-5.41 2.56-5.41 5.19 0 1.03.397 2.14.89 2.737.098.12.11.225.083.345-.09.375-.293 1.199-.33 1.363-.053.225-.18.27-.42.164-1.57-.732-2.55-3.02-2.55-4.855 0-3.94 2.86-7.55 8.25-7.55 4.33 0 7.69 3.09 7.69 7.21 0 4.3-2.71 7.76-6.48 7.76-1.28 0-2.47-.66-2.88-1.45l-.79 3.01c-.28 1.1-1.05 2.47-1.56 3.31.93.29 1.93.44 2.96.44 6.63 0 11.98-5.37 11.98-11.99C23.996 5.37 18.637 0 12.017 0z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="bg-amber-50 rounded-2xl p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Business Hours</h3>
                <dl className="space-y-3">
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600">Monday - Friday</dt>
                    <dd className="text-sm font-medium text-gray-900">9:00 AM - 7:00 PM</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600">Saturday</dt>
                    <dd className="text-sm font-medium text-gray-900">10:00 AM - 6:00 PM</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600">Sunday</dt>
                    <dd className="text-sm font-medium text-gray-900">By Appointment</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}

export default ContactSection;
