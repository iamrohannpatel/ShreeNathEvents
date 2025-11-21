import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const GalleryPage = () => {
    const navigate = useNavigate();

    const images = [
        { src: "/img1.jpg", alt: "Wedding Couple" },
        { src: "/img2.jpg", alt: "Decor Setup" },
        { src: "/img3.jpg", alt: "Ceremony Ritual" },
        { src: "/img4.jpg", alt: "Floral Arrangement" },
        { src: "/img5.jpg", alt: "Table Setting" },
        { src: "/img6.jpg", alt: "Evening Party" },
        { src: "/img7.jpg", alt: "Stage Design" },
        { src: "/img8.jpg", alt: "Entrance Decor" },
        { src: "/img9.jpg", alt: "Candid Moment" },
        // Duplicating for a fuller gallery feel if needed, or just keeping 9
        { src: "/img1.jpg", alt: "Wedding Couple" },
        { src: "/img2.jpg", alt: "Decor Setup" },
        { src: "/img3.jpg", alt: "Ceremony Ritual" },
    ];

    return (
        <div className="min-h-screen bg-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900">Event Gallery</h1>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors font-semibold shadow-md"
                    >
                        Back to Home
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((img, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative group overflow-hidden rounded-xl shadow-lg aspect-[4/3]"
                        >
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GalleryPage;
