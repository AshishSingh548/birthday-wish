import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Gift, Heart } from "lucide-react";

const BirthdayCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    // Fire confetti
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-50 overflow-hidden">
      <AnimatePresence>
        {!isOpen ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            onClick={handleOpen}
            className="cursor-pointer bg-gradient-to-br from-pink-400 to-purple-500 text-white p-10 rounded-2xl shadow-2xl flex flex-col items-center gap-4 text-center"
          >
            <h1 className="text-3xl font-bold">Happy Birthday! 🎂</h1>
            <h2 className="text-xl">To My Cutiepie</h2>
            <p className="text-sm opacity-80 mt-2">Tap to open your card</p>
            <Gift size={64} className="animate-bounce mt-4" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white p-8 rounded-2xl shadow-xl max-w-md text-center border-4 border-pink-200"
          >
            <h1 className="text-4xl font-bold text-pink-600 mb-4">Happy Birthday!</h1>
            <div className="flex justify-center mb-4">
                <Heart className="text-red-500 fill-red-500 animate-pulse" size={48} />
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Just wanted to remind you—you're my favorite person. My days are better,
              smiles are wider, and life is sweeter because of you.
              I hope your birthday is full of love, magic, and everything that makes you smile.
            </p>
            <p className="font-handwriting text-2xl text-purple-600 mt-4">
              Let's always stay like this... together, forever ♾️
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BirthdayCard;