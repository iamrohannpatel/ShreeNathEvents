import React, { useState } from 'react';

const events = [
  {
    id: 1,
    title: 'Summer Garden Wedding',
    date: 'JUN 15, 2024',
    location: 'Udaipur, Rajasthan',
    image: '/img1.jpg',
    category: 'Wedding'
  },
  {
    id: 2,
    title: 'Corporate Gala Night',
    date: 'JUL 5, 2024',
    location: 'Mumbai, Maharashtra',
    image: '/img2.jpg',
    category: 'Corporate'
  },
  {
    id: 3,
    title: 'Destination Birthday Bash',
    date: 'AUG 22, 2024',
    location: 'Goa',
    image: '/img3.jpg',
    category: 'Celebration'
  },
  {
    id: 4,
    title: 'Charity Fundraiser',
    date: 'SEP 10, 2024',
    location: 'Delhi NCR',
    image: '/img4.jpg',
    category: 'Charity'
  },
  {
    id: 5,
    title: 'Wedding Anniversary',
    date: 'OCT 5, 2024',
    location: 'Jaipur, Rajasthan',
    image: '/img5.jpg',
    category: 'Celebration'
  },
  {
    id: 6,
    title: 'Product Launch',
    date: 'NOV 18, 2024',
    location: 'Bangalore, Karnataka',
    image: '/img6.jpg',
    category: 'Corporate'
  }
];

const categories = ['All', 'Wedding', 'Corporate', 'Celebration', 'Charity'];

const Events = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredEvent, setHoveredEvent] = useState(null);

  const filteredEvents = activeCategory === 'All' 
    ? events 
    : events.filter(event => event.category === activeCategory);

  return (
    <section id="events" className="pt-0 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center pt-6 pb-2">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-3">Upcoming Events</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Discover our upcoming events and join us for unforgettable experiences.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8 mt-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div 
              key={event.id}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              onMouseEnter={() => setHoveredEvent(event.id)}
              onMouseLeave={() => setHoveredEvent(null)}
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredEvent === event.id ? 'scale-110' : 'scale-100'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-white/90 text-amber-600 px-3 py-1 rounded-full text-xs font-medium">
                  {event.category}
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-sm text-amber-300 mb-1">{event.date}</p>
                <h3 className="text-xl font-bold mb-2 group-hover:text-amber-300 transition-colors">
                  {event.title}
                </h3>
                <div className="flex items-center text-sm text-gray-200">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  {event.location}
                </div>
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="px-6 py-2 bg-white text-amber-600 rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center">
                  View Details
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full font-medium hover:from-amber-600 hover:to-amber-700 transition-all transform hover:-translate-y-0.5 shadow-md hover:shadow-lg inline-flex items-center">
            View All Events
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Events;
