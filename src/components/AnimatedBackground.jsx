import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  // Generate random positions for floating elements
  const generateRandomPosition = () => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 40 + 20,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10,
    opacity: Math.random() * 0.3 + 0.1
  });

  const floatingElements = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    ...generateRandomPosition(),
    type: i % 3 === 0 ? 'circle' : i % 2 === 0 ? 'square' : 'triangle',
  }));

  // Color palette
  const colors = {
    primary: '#F59E0B', // Amber-500
    primaryLight: '#FCD34D', // Amber-300
    primaryDark: '#D97706', // Amber-600
    secondary: '#8B5CF6', // Violet-500
    accent: '#EC4899', // Pink-500
  };

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Main background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-amber-100" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Floating elements */}
      {floatingElements.map((el) => (
        <motion.div
          key={el.id}
          className={`absolute rounded-full ${el.type === 'square' ? 'rounded-lg' : 'rounded-full'}`}
          style={{
            width: el.size,
            height: el.size,
            backgroundColor: 
              el.type === 'circle' 
                ? `${colors.primary}${Math.floor(el.opacity * 255).toString(16).padStart(2, '0')}`
                : 'transparent',
            border: `2px solid ${el.type === 'square' ? colors.secondary : 'transparent'}`,
            top: el.top,
            left: el.left,
            opacity: el.opacity,
          }}
          animate={{
            y: [0, -100],
            x: [0, (Math.random() - 0.5) * 100],
            rotate: 360,
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
            delay: el.delay,
          }}
        />
      ))}

      {/* Subtle shine effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear',
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
