import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const AnimatedBackground = () => {
  const [init, setInit] = useState(false);

  // Initialize tsparticles
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particleOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
          resize: true,
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 100,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#d97706", // Amber-600
        },
        links: {
          color: "#d97706",
          distance: 150,
          enable: true,
          opacity: 0.2,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 60, // Adjust number of particles
        },
        opacity: {
          value: 0.3,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-amber-100" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(to right, #d97706 1px, transparent 1px), linear-gradient(to bottom, #d97706 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Framer Motion Gradient Blobs */}
      <motion.div
        className="absolute top-0 left-0 w-[500px] h-[500px] bg-amber-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-20"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-20"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-100 rounded-full mix-blend-multiply filter blur-[120px] opacity-10"
        animate={{
          scale: [1, 1.5, 1],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* TSParticles Layer */}
      {init && (
        <Particles
          id="tsparticles"
          options={particleOptions}
          className="absolute inset-0 w-full h-full"
        />
      )}
    </div>
  );
};

export default AnimatedBackground;
