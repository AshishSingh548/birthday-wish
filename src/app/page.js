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
    // 1. Set the timer for 15 seconds from NOW (Test Mode)
    setTargetDate(new Date(Date.now() + 15000));

    // 2. Play Loading Animation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);

    // 3. ATTEMPT TO PLAY SONG IMMEDIATELY
    if (audioRef.current) {
        audioRef.current.play().catch(error => {
            console.log("Autoplay prevented by browser. Waiting for user interaction.");
        });
    }

    return () => clearTimeout(timer);
  }, []);

  const handleCountdownComplete = () => {
    setShowCelebration(true);
  };

  // 4. This function ensures sound starts if the browser blocked the autoplay
  const enableAudio = () => {
    if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch(e => console.log(e));
    }
  };

  if (!targetDate) return null;

  return (
    // We add onClick here so ANY tap on the screen starts the music
    <main
        onClick={enableAudio}
        className="flex min-h-screen flex-col items-center justify-center bg-pink-50 overflow-hidden cursor-pointer"
    >
        {/* Audio is now ALWAYS here, so it can play during loading */}
        <audio ref={audioRef} src="/birthday-song.m4a" loop />

        <AnimatePresence mode="wait">
            {loading ? (
                // LOADING SCREEN
                <motion.div
                    key="loader"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center text-center"
                >
                    <h1 className="text-3xl font-bold text-pink-600 mb-4">
                        Loading something special...
                    </h1>
                    <div className="flex gap-2 text-4xl">
                        <motion.span animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }}>✨</motion.span>
                        <motion.span animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}>🎂</motion.span>
                        <motion.span animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}>🎁</motion.span>
                    </div>
                    <p className="text-gray-400 text-sm mt-8 animate-pulse">(click kr dio screen p music k liye khi bhi)</p>
                </motion.div>
            ) : (
                // MAIN APP
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