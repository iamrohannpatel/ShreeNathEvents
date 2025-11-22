import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Calendar from '../ui/Calendar';
import { Input } from '../ui/FormElements';

// Reusing the AnimatedBackground for consistency
const AnimatedBackground = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-white"></div>
    <div className="absolute inset-0 bg-[url('/grid.svg')] [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-40"></div>
    <motion.div
      className="absolute top-0 left-1/4 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
      animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
      transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
    />
    <motion.div
      className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
      animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
      transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", delay: 2 }}
    />
  </div>
);

const StepIndicator = ({ currentStep }) => (
  <div className="flex items-center justify-center space-x-4 mb-8">
    {[1, 2, 3].map((step) => (
      <div key={step} className="flex items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${step === currentStep
            ? 'bg-amber-500 text-white shadow-lg shadow-amber-200 scale-110'
            : step < currentStep
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 text-gray-400'
          }`}>
          {step < currentStep ? (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          ) : step}
        </div>
        {step < 3 && (
          <div className={`w-12 h-1 mx-2 rounded-full transition-colors duration-300 ${step < currentStep ? 'bg-green-500' : 'bg-gray-200'}`}></div>
        )}
      </div>
    ))}
  </div>
);

const BookingSection = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [form, setForm] = useState({ name: '', phone: '', email: '', type: '', venue: '', guests: '', budget: '' });
  const [confirmOpen, setConfirmOpen] = useState(false);

  const nextStep = () => setBookingStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setBookingStep(prev => Math.max(prev - 1, 1));

  return (
    <section id="booking" className="relative py-20 md:py-28 overflow-hidden" data-section="booking">
      <AnimatedBackground />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-wider text-amber-800 uppercase bg-amber-100 rounded-full"
          >
            Start Your Journey
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Schedule your Event
          </motion.h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We accept a limited number of commissions each season to ensure every event receives our undivided attention.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Booking Wizard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8"
          >
            <div className="bg-white/80 backdrop-blur-xl border border-white p-8 rounded-3xl shadow-xl">
              <StepIndicator currentStep={bookingStep} />

              <AnimatePresence mode="wait">
                {bookingStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center mb-8">
                      <h3 className="font-serif text-2xl text-gray-900">Select a Date</h3>
                      <p className="text-sm text-gray-500 mt-1">Choose a preferred date for your initial consultation.</p>
                    </div>
                    <div className="max-w-md mx-auto">
                      <Calendar selected={selectedDate} onSelect={(d) => { setSelectedDate(d); setTimeout(nextStep, 500); }} />
                    </div>
                  </motion.div>
                )}

                {bookingStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center mb-8">
                      <h3 className="font-serif text-2xl text-gray-900">Event Details</h3>
                      <p className="text-sm text-gray-500 mt-1">Tell us a bit more about your vision.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <Input label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                      <Input label="Phone Number" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                      <Input label="Email Address" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                      <Input label="Event Type" value={form.type} onChange={(v) => setForm({ ...form, type: v })} placeholder="e.g. Wedding, Gala" />
                      <Input label="Venue (if known)" value={form.venue} onChange={(v) => setForm({ ...form, venue: v })} />
                      <Input label="Estimated Guests" value={form.guests} onChange={(v) => setForm({ ...form, guests: v })} />

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Budget</label>
                        <select
                          value={form.budget}
                          onChange={(e) => setForm({ ...form, budget: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                        >
                          <option value="">Select a range</option>
                          <option>₹2,000 - ₹3,000</option>
                          <option>₹3,000 - ₹5,000</option>
                          <option>₹5,000 - ₹7,000</option>
                          <option>₹7,000 - ₹10,000</option>
                          <option>₹10,000 - ₹20,000</option>
                          <option>₹20,000+</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-between">
                      <button onClick={prevStep} className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium">Back</button>
                      <button
                        onClick={nextStep}
                        disabled={!form.name || !form.phone || !form.email}
                        className="px-8 py-3 bg-amber-500 text-white rounded-xl font-medium shadow-lg shadow-amber-200 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        Continue
                      </button>
                    </div>
                  </motion.div>
                )}

                {bookingStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="text-center"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-serif text-3xl text-gray-900 mb-4">Ready to Submit?</h3>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                      Please review your details. By clicking submit, you agree to our consultation terms. Our team will review your request and contact you within 24 hours.
                    </p>

                    <div className="bg-gray-50 rounded-xl p-6 text-left max-w-md mx-auto mb-8 border border-gray-100">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-500">Date:</span>
                        <span className="font-medium text-gray-900">{selectedDate?.toDateString()}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-500">Name:</span>
                        <span className="font-medium text-gray-900">{form.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Event:</span>
                        <span className="font-medium text-gray-900">{form.type}</span>
                      </div>
                    </div>

                    <div className="flex justify-center gap-4">
                      <button onClick={prevStep} className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium">Back</button>
                      <button
                        onClick={() => setConfirmOpen(true)}
                        className="px-10 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-bold shadow-xl shadow-amber-200 hover:scale-105 transition-transform"
                      >
                        Submit Request
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Side Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-4 space-y-6"
          >
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-amber-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full -mr-8 -mt-8"></div>
              <h3 className="font-serif text-xl font-bold text-gray-900 mb-6 relative z-10">The Sree Nath Promise</h3>
              <ul className="space-y-5 relative z-10">
                {[
                  { title: 'Bespoke Concepts', desc: 'Never templates, always unique.' },
                  { title: 'Precision Execution', desc: 'Flawless on-site direction.' },
                  { title: 'White-Glove Service', desc: 'Discreet and attentive.' },
                  { title: 'Transparent Pricing', desc: 'No hidden costs.' }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-3xl shadow-lg text-white relative overflow-hidden">
              <div className="absolute bottom-0 right-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
                <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-bold mb-4">Consultation Fee</h3>
              <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                To ensure serious inquiries, we charge a nominal consultation fee which is fully adjustable against your final booking.
              </p>
              <div className="text-3xl font-bold text-amber-400 mb-2">₹500</div>
              <p className="text-xs text-gray-400">Adjustable against final bill</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {confirmOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white max-w-md w-full rounded-3xl p-8 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-orange-500"></div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2">Request Received!</h3>
                <p className="text-gray-600 mb-8">
                  Thank you, <span className="font-bold text-gray-900">{form.name}</span>. We have received your request for a <span className="font-bold text-gray-900">{form.type}</span> consultation.
                </p>
                <button
                  onClick={() => setConfirmOpen(false)}
                  className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default BookingSection;
