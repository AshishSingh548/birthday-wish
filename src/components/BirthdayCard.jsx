import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Gift, Heart, Sparkles } from "lucide-react";

const BirthdayCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    const duration = 5000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          // CLOSED CARD
          <motion.div
            key="closed"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            onClick={handleOpen}
            className="cursor-pointer bg-gradient-to-r from-pink-400 to-purple-500 text-white p-10 rounded-3xl shadow-2xl flex flex-col items-center text-center border-4 border-white"
          >
            {/* WIGGLING HEADING (Happy Birthday) */}
            <motion.h1
                animate={{ y: [0, -5, 0], rotate: [0, -2, 2, 0] }}
                transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0], transition: { duration: 0.3, repeat: Infinity } }}
                className="text-3xl font-bold font-serif mb-2 select-none"
            >
                Happy Birthday!
            </motion.h1>

            <div className="flex gap-2 text-yellow-300 mb-4">
                <Gift /> <Sparkles /> <Heart fill="currentColor" />
            </div>

             {/* WIGGLING HEADING (To My Doremi) */}
             <motion.h2
                animate={{ x: [0, -3, 3, 0] }} // Gentle side-to-side wiggle
                transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                className="text-xl font-bold text-pink-100 select-none"
            >
                To My Doremi
            </motion.h2>

            <div className="bg-white/20 p-4 rounded-xl mt-6 w-full backdrop-blur-sm">
                <p className="text-lg font-medium">Tap to open your card</p>
                <Gift size={48} className="mx-auto animate-bounce mt-2" />
            </div>
          </motion.div>
        ) : (
          // OPEN CARD
          <motion.div
            key="open"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-3xl shadow-2xl text-center border-8 border-pink-200"
          >
             {/* WIGGLING HEADING (Big Happy Birthday) */}
             <motion.h1
                animate={{ scale: [1, 1.05, 1], rotate: [0, -2, 2, 0] }}
                transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0], transition: { duration: 0.3, repeat: Infinity } }}
                className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-6 select-none"
             >
                Happy Birthday! Beta🎂
             </motion.h1>

            <p className="text-gray-700 text-lg leading-relaxed font-medium mb-6">
              May every wish you make today come true. You deserve the world, and I'll always be here to annoy/irritate and support you.
            </p>

            <p className="text-xl text-purple-600 font-bold mt-4">
              Let's always annoy each other like this... together, forever 🫶
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BirthdayCard;