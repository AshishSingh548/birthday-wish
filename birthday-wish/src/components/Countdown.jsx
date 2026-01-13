import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Countdown = ({ targetDate, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
        // Trigger completion if time is up
        if(onComplete) onComplete();
    }
    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

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
        Just a little more... A small gift for my favorite person 🌹
      </p>
    </div>
  );
};

export default Countdown;
