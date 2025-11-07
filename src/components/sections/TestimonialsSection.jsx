
import React, { useState } from 'react';

const cls = (...classes) => classes.filter(Boolean).join(' ');

const TestimonialsSection = () => {
    const [testimonialIndex, setTestimonialIndex] = useState(0);
    const testimonials = [
        {
          quote: "Sree Nath Events transformed our wedding into a fairytale. Every detail was perfect, and their team was a joy to work with.",
          name: "Priya & Rohan Sharma",
          event: "Wedding in Jaipur"
        },
        {
          quote: "The corporate event was a massive success, thanks to Sree Nath Events. Their professionalism and creativity are unmatched.",
          name: "Amit Singh",
          event: "Corporate Gala in Delhi"
        },
        {
          quote: "Our anniversary celebration was simply magical. The decorations, the ambiance, everything was just perfect!",
          name: "Anjali & Vikram Mehra",
          event: "25th Anniversary in Udaipur"
        }
      ];

    return (
<section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="font-serif text-3xl sm:text-4xl text-center">What Clients Say</h2>
          <div className="mt-8 relative overflow-hidden">
            <div className="flex transition-transform duration-700" style={{ transform: `translateX(-${testimonialIndex * 100}%)` }}>
              {testimonials.map((t, i) => (
                <div key={i} className="min-w-full px-2">
                  <div className="bg-gradient-to-b from-amber-50 to-white rounded-2xl p-8 border text-center">
                    <svg className="w-8 h-8 text-gold mx-auto" viewBox="0 0 24 24" fill="currentColor"><path d="M7.17 6A5.17 5.17 0 0 0 2 11.17V22h8v-8H6.79a3 3 0 0 1 3-3H12V6H7.17Zm9 0A5.17 5.17 0 0 0 11 11.17V22h8v-8h-3.21a3 3 0 0 1 3-3H22V6h-5.83Z"/></svg>
                    <p className="mt-4 text-lg italic text-gray-800">“{t.quote}”</p>
                    <p className="mt-4 font-medium">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.event}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-center gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setTestimonialIndex(i)} className={cls('w-2.5 h-2.5 rounded-full', i === testimonialIndex ? 'bg-amber-500' : 'bg-gray-300')} aria-label={`Go to testimonial ${i+1}`} />
              ))}
            </div>
          </div>
        </div>
      </section>
    )
}

export default TestimonialsSection;
