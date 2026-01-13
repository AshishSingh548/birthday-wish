import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Countdown = ({ targetDate, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isClient, setIsClient] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false); // Track if time is up

  function calculateTimeLeft(target) {
    const difference = +new Date(target) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(targetDate);
      setTimeLeft(newTimeLeft);

      // If time is up, show the "It's Time" screen
      if (Object.keys(newTimeLeft).length === 0) {
        setIsTimeUp(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!isClient) return null;

  // --- "IT'S TIME" SCREEN (Matches your snapshot) ---
  if (isTimeUp) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold text-pink-600 mb-6">
          Your Special Day is Almost Here ❤️
        </h1>

        <h2 className="text-2xl font-bold text-purple-600 mb-6">It's time!</h2>

        <div className="bg-pink-100 p-6 rounded-2xl w-full mb-8 shadow-inner">
           <p className="text-purple-700 text-lg">
             Just a little more... A small gift for my favorite Sissy(Guu) ❤️
           </p>
           <div className="flex justify-center gap-2 mt-2">
             <span className="h-3 w-3 bg-pink-400 rounded-full animate-bounce"></span>
             <span className="h-3 w-3 bg-pink-400 rounded-full animate-bounce delay-100"></span>
             <span className="h-3 w-3 bg-pink-400 rounded-full animate-bounce delay-200"></span>
           </div>
        </div>

        <button
          onClick={onComplete}
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-8 rounded-full shadow-xl hover:scale-105 transition-transform flex items-center gap-2"
        >
          For you <span>➔</span>
        </button>
      </div>
    );
  }

  // --- NORMAL COUNTDOWN SCREEN ---
  return (
    <div className="text-center p-10">
      <h1 className="text-4xl font-bold text-pink-600 mb-8">
        Your Special Day is Almost Here ❤️
      </h1>
      <div className="flex justify-center gap-5 text-purple-700">
        {Object.keys(timeLeft).map((interval) => (
          <motion.div
            key={interval}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col items-center bg-white p-4 rounded-xl shadow-lg w-24"
          >
            <span className="text-4xl font-bold">{timeLeft[interval] || 0}</span>
            <span className="capitalize text-sm text-gray-500">{interval}</span>
          </motion.div>
        ))}
      </div>
      <p className="mt-8 text-lg text-gray-600">
        Counting down every second... ⏳
      </p>
    </div>
  );
};

export default Countdown;