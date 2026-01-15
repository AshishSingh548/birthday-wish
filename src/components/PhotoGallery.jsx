import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const photos = [
  "/memories/1.jpeg",
  "/memories/2.jpeg",
  "/memories/3.jpeg",
  "/memories/4.jpeg",
  "/memories/5.jpeg",
  "/memories/6.jpeg",
  "/memories/7.jpeg",
  "/memories/8.jpeg",
  "/memories/9.jpg",
  "/memories/10.jpg",
  "/memories/11.jpg",
  "/memories/12.jpg",
  "/memories/13.jpg",
  "/memories/14.jpg",
  "/memories/15.jpg",
  "/memories/16.jpg",
  "/memories/17.jpeg",
  "/memories/18.jpeg",
  "/memories/19.jpg",
  // Add more paths here if you have more photos!
];

const PhotoGallery = () => {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="min-h-screen p-8 pb-20">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center text-pink-600 mb-10 font-serif"
      >
        Our Memories 📸
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            layoutId={`card-${index}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
            onClick={() => setSelectedId(index)}
            className="cursor-pointer bg-white p-2 rounded-2xl shadow-xl transform"
          >
             {/* Uses standard img tag - ensure photos exist in public/memories/ */}
            <img
                src={photo}
                alt="Memory"
                className="w-full aspect-square object-cover rounded-xl"
            />
          </motion.div>
        ))}
      </div>

      {/* POPUP VIEW WHEN CLICKED */}
      <AnimatePresence>
        {selectedId !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              layoutId={`card-${selectedId}`}
              className="bg-white p-4 rounded-3xl max-w-lg w-full"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
            >
              <img
                src={photos[selectedId]}
                alt="Memory"
                className="w-full max-h-[80vh] object-contain rounded-2xl"
              />
              <button
                onClick={() => setSelectedId(null)}
                className="mt-4 w-full py-2 bg-pink-500 text-white rounded-xl font-bold"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center mt-12">
        <p className="text-purple-600 font-medium">I hope we make a million more... ❤️</p>
      </div>
    </div>
  );
};

export default PhotoGallery;