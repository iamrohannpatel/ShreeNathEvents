
import React from 'react';
import { 
    FiMail, 
    FiMapPin, 
  } from 'react-icons/fi';

  function IconLink({ href, label, children }) {
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center text-amber-600 hover:text-amber-700"
      >
        {children}
        <span className="ml-1">{label}</span>
      </a>
    );
  }

function PhoneIcon() { return (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.9.3 1.77.57 2.61a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.47-1.08a2 2 0 0 1 2.11-.45c.84.27 1.71.45 2.61.57A2 2 0 0 1 22 16.92z"/></svg>) }
function MailIcon() { return (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16v16H4z"/><path d="M22 6l-10 7L2 6"/></svg>) }
function MapPinIcon() { return (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s7-4.35 7-11a7 7 0 1 0-14 0c0 6.65 7 11 7 11z"/><circle cx="12" cy="11" r="3"/></svg>) }
function InstagramIcon() { return (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>) }
function PinterestIcon() { return (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a9.93 9.93 0 0 0-3.53 19.23c-.05-.82-.1-2.08.02-2.98.11-.76.73-4.85.73-4.85s-.19-.38-.19-.95c0-.9.52-1.57 1.18-1.57.55 0 .81.41.81.9 0 .55-.35 1.36-.53 2.12-.15.64.31 1.17.94 1.17 1.13 0 2-1.19 2-2.9 0-1.51-1.09-2.57-2.64-2.57-1.8 0-2.86 1.35-2.86 2.75 0 .54.21 1.11.47 1.42.05.06.06.11.05.17-.05.18-.16.57-.18.65-.03.1-.09.13-.2.08-.74-.35-1.2-1.46-1.2-2.35 0-1.92 1.39-3.68 4.02-3.68 2.11 0 3.75 1.5 3.75 3.5 0 2.1-1.32 3.79-3.14 3.79-.61 0-1.18-.32-1.38-.71l-.38 1.44c-.14.55-.52 1.24-.77 1.66A10 10 0 1 0 12 2z"/></svg>) }
function FacebookIcon() { return (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.5 9.87v-6.99H7.9V12h2.6V9.8c0-2.57 1.53-4 3.87-4 1.12 0 2.3.2 2.3.2v2.52h-1.3c-1.28 0-1.68.8-1.68 1.62V12h2.85l-.46 2.88h-2.39v6.99A10 10 0 0 0 22 12z"/></svg>) }

const Footer = ({ enhancedScrollTo }) => {
    return(
<footer className="bg-white border-t">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="font-serif text-xl">Sree Nath Events</div>
            <p className="mt-3 text-gray-600">A luxury event design studio crafting immersive experiences across India.</p>
          </div>
          <div>
            <div className="font-medium">Quick Links</div>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              <li><button onClick={() => enhancedScrollTo('home')} className="hover:text-gray-900">Home</button></li>
              <li><button onClick={() => enhancedScrollTo('about')} className="hover:text-gray-900">About</button></li>
              <li><button onClick={() => enhancedScrollTo('services')} className="hover:text-gray-900">Services</button></li>
              <li><button onClick={() => enhancedScrollTo('booking')} className="hover:text-gray-900">Book a Consultation</button></li>
            </ul>
          </div>
          <div>
            <div className="font-medium">Follow Us</div>
            <div className="mt-3 flex gap-3">
              <IconLink label="Instagram" href="#"><InstagramIcon /></IconLink>
              <IconLink label="Pinterest" href="#"><PinterestIcon /></IconLink>
              <IconLink label="Facebook" href="#"><FacebookIcon /></IconLink>
            </div>
          </div>
          <div>
            <div className="font-medium">Contact Us</div>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              <li className="flex gap-2"><PhoneIcon /> +91 98765 43210</li>
              <li className="flex gap-2"><MailIcon /> hello@sreenathevents.in</li>
              <li className="flex gap-2"><MapPinIcon /> Jaipur, Rajasthan, India</li>
            </ul>
          </div>
        </div>
        <div className="py-6 text-center text-xs text-gray-500">2023 Sree Nath Events. All rights reserved.</div>
      </footer>
    )
}

export default Footer;
