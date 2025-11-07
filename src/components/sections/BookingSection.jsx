
import React, { useState } from 'react';
import Calendar from '../ui/Calendar';
import {Input} from '../ui/FormElements';


const Check = () => (
    <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );

const BookingSection = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [bookingStep, setBookingStep] = useState(1);
    const [form, setForm] = useState({ name: '', phone: '', email: '', type: '', venue: '', guests: '', budget: '' });
    const [confirmOpen, setConfirmOpen] = useState(false);

    return (
        <section id="booking" className="bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl">Book a Consultation</h2>
              <p className="mt-2 text-gray-600">We work with a limited number of clients each month to preserve quality. Share a few details to begin.</p>

              <div className="mt-8 space-y-10">
                <div className="bg-white border rounded-xl p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-500">Step 1</div>
                      <div className="font-medium">Select a Date</div>
                    </div>
                    {selectedDate && <span className="text-sm text-gray-600">{selectedDate.toDateString()}</span>}
                  </div>
                  <Calendar selected={selectedDate} onSelect={(d) => { setSelectedDate(d); setBookingStep(2) }} />
                </div>

                {bookingStep >= 2 && (
                  <div className="bg-white border rounded-xl p-5">
                    <div className="text-xs text-gray-500">Step 2</div>
                    <div className="font-medium">Event Details</div>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                      <Input label="Phone Number" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                      <Input label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                      <Input label="Event Type" value={form.type} onChange={(v) => setForm({ ...form, type: v })} placeholder="Wedding, Gala, Party" />
                      <Input label="Venue" value={form.venue} onChange={(v) => setForm({ ...form, venue: v })} />
                      <Input label="Guest Count" value={form.guests} onChange={(v) => setForm({ ...form, guests: v })} />
                      <div className="sm:col-span-2">
                        <label className="text-sm text-gray-700">Estimated Budget</label>
                        <select value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className="mt-1 w-full rounded-md border-gray-300">
                          <option value="">Select a range</option>
                          <option>₹50,000 - ₹1,00,000</option>
                          <option>₹1,00,000 - ₹2,50,000</option>
                          <option>₹2,50,000 - ₹5,00,000</option>
                          <option>₹5,00,000+</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button onClick={() => setBookingStep(3)} className="px-5 py-2.5 rounded-full bg-amber-500 text-white shadow hover:shadow-md transition" disabled={!selectedDate || !form.name || !form.phone || !form.email || !form.type || !form.venue || !form.guests || !form.budget}>Proceed</button>
                    </div>
                  </div>
                )}

                {bookingStep >= 3 && (
                  <div className="bg-white border rounded-xl p-5">
                    <div className="text-xs text-gray-500">Step 3</div>
                    <div className="font-medium">Confirmation</div>
                    <p className="mt-2 text-gray-700">Review your details and submit your request. Our team will reach out within 24 hours.</p>
                    <button onClick={() => setConfirmOpen(true)} className="mt-4 px-5 py-2.5 rounded-full bg-amber-500 text-white shadow hover:shadow-md transition">Proceed to Consultation Fee</button>
                  </div>
                )}
              </div>
            </div>

            <aside className="bg-white border rounded-2xl p-6 sticky top-24">
              <h3 className="font-medium">Why Clients Choose Us</h3>
              <ul className="mt-4 space-y-3 text-gray-700">
                <li className="flex gap-2"><Check /> Bespoke concepts, never templates</li>
                <li className="flex gap-2"><Check /> Precision execution and on‑site direction</li>
                <li className="flex gap-2"><Check /> Discreet, high‑touch client service</li>
                <li className="flex gap-2"><Check /> Transparent costing and timelines</li>
              </ul>
              <div className="mt-6 text-sm text-gray-600">Packages typically range from <span className="font-medium">₹50,000</span> to <span className="font-medium">₹2,50,000+</span> depending on scope and scale.</div>
            </aside>
          </div>
        </div>
        {confirmOpen && (
        <div className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl">Request Received</h3>
              <button onClick={() => setConfirmOpen(false)} className="p-2 rounded-full hover:bg-gray-100" aria-label="Close"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" /></svg></button>
            </div>
            <p className="mt-4 text-gray-700">Thank you, <span className="font-medium">{form.name || 'Client'}</span>! Your consultation request for <span className="font-medium">{form.type || 'Event'}</span> has been received. Our team will contact you within 24 hours.</p>
            <div className="mt-6 flex justify-end"><button onClick={() => setConfirmOpen(false)} className="px-5 py-2.5 rounded-full bg-amber-500 text-white">Close</button></div>
          </div>
        </div>
      )}
      </section>
    )
}

export default BookingSection;
