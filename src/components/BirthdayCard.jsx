import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Gift, Heart, Sparkles, Image as ImageIcon } from "lucide-react";

// Accept the new prop here -----------------------v
const BirthdayCard = ({ onViewMemories }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    const duration = 3000;
    const end = Date.now() + duration;
    const colors = ['#bb0000', '#ffffff'];

    (function frame() {
      confetti({ particleCount: 2, angle: 60, spread: 55, origin: { x: 0 }, colors: colors });
      confetti({ particleCount: 2, angle: 120, spread: 55, origin: { x: 1 }, colors: colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    }());
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
            <motion.h1
                animate={{ y: [0, -5, 0], rotate: [0, -2, 2, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-3xl font-bold font-serif mb-2 select-none"
            >
                Happy Birthday!
            </motion.h1>

            <div className="flex gap-2 text-yellow-300 mb-4">
                <Gift /> <Sparkles /> <Heart fill="currentColor" />
            </div>

            <motion.h2
                animate={{ x: [0, -3, 3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
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
             <motion.h1
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-6 select-none"
             >
                Happy Birthday! Beta🎂
             </motion.h1>

            <p className="text-gray-700 text-lg leading-relaxed font-medium mb-6">
              May every wish you make today come true. You deserve the world, and I'll always be here to Annoy/Irritate and support you.
            </p>

            <p className="text-xl text-purple-600 font-bold mb-8">
              Let's always Annoy each other like this... together, forever 🫶
            </p>

            {/* NEW MEMORIES BUTTON */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onViewMemories}
                className="flex items-center justify-center gap-2 w-full py-3 bg-pink-500 text-white rounded-xl font-bold shadow-lg hover:bg-pink-600 transition-colors"
            >
                <ImageIcon size={20} />
                See our Memories
            </motion.button>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BirthdayCard;