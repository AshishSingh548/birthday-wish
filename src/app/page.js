"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Countdown from "@/components/Countdown";
import BirthdayCard from "@/components/BirthdayCard";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showCelebration, setShowCelebration] = useState(false);
  const [targetDate, setTargetDate] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    // 1. Set timer for 15 seconds from NOW (Test Mode)
    setTargetDate(new Date(Date.now() + 15000));

    // 2. Play Loading Animation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);

    // 3. ATTEMPT TO PLAY SONG IMMEDIATELY
    if (audioRef.current) {
        audioRef.current.play().catch(error => {
            console.log("Autoplay prevented by browser.");
        });
    }

    return () => clearTimeout(timer);
  }, []);

  const handleCountdownComplete = () => {
    setShowCelebration(true);
  };

  const enableAudio = () => {
    if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch(e => console.log(e));
    }
  };

  if (!targetDate) return null;

  return (
    <main
        onClick={enableAudio}
        className="flex min-h-screen flex-col items-center justify-center bg-pink-50 overflow-hidden cursor-pointer"
    >
        <audio ref={audioRef} src="/birthday-song.m4a" loop />

        <AnimatePresence mode="wait">
            {loading ? (
                <motion.div
                    key="loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center text-center"
                >
                    {/* WIGGLING HEADING */}
                    <motion.h1
                        animate={{
                            y: [0, -10, 0], // Float up and down
                            rotate: [0, -2, 2, 0] // Tilt slightly
                        }}
                        transition={{
                            duration: 4, // Slow and gentle motion
                            ease: "easeInOut",
                            repeat: Infinity // Repeat forever
                        }}
                        whileHover={{ // Wiggle faster and bounce on hover/tap
                            scale: 1.1,
                            rotate: [0, -5, 5, 0],
                            transition: { duration: 0.3, repeat: Infinity }
                        }}
                        className="text-3xl font-bold text-pink-600 mb-4 select-none"
                    >
                        Loading something special...
                    </motion.h1>
                    <div className="flex gap-2 text-4xl">
                        <motion.span animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }}>✨</motion.span>
                        <motion.span animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}>🎂</motion.span>
                        <motion.span animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}>🎁</motion.span>
                    </div>
                    <p className="text-gray-400 text-sm mt-8 animate-pulse">(Tap anywhere for music)</p>
                </motion.div>
            ) : (
                !showCelebration ? (
                    <Countdown key="countdown" targetDate={targetDate} onComplete={handleCountdownComplete} />
                ) : (
                    <BirthdayCard key="card" />
                )
            )}
        </AnimatePresence>
    </main>
  );
}