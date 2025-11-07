import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
            Crafting Unforgettable Experiences
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mb-12"></div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src="/img7.jpg" 
                alt="About Sree Nath Events" 
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute -z-10 -right-6 -bottom-6 w-40 h-40 bg-amber-100 rounded-full"></div>
            </div>
            
            <div className="text-left">
              <h3 className="text-2xl font-serif font-semibold mb-4">Our Story</h3>
              <p className="text-gray-700 mb-4">
                Founded with a passion for creating magical moments, Sree Nath Events has been at the forefront of event planning and design, transforming ordinary occasions into extraordinary experiences.
              </p>
              <p className="text-gray-700 mb-6">
                Our team of creative professionals brings together expertise in design, coordination, and execution to deliver seamless events that exceed expectations.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
                      <svg className="w-3 h-3 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <p className="ml-3 text-gray-700">Over 100+ successful events organized</p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
                      <svg className="w-3 h-3 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <p className="ml-3 text-gray-700">Award-winning event planning team</p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
                      <svg className="w-3 h-3 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <p className="ml-3 text-gray-700">Personalized service for every client</p>
                </div>
              </div>
              
              <button className="mt-8 px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full font-medium hover:from-amber-600 hover:to-amber-700 transition-all transform hover:-translate-y-0.5 shadow-md hover:shadow-lg">
                Learn More About Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
