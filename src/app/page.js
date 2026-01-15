"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Countdown from "@/components/Countdown";
import BirthdayCard from "@/components/BirthdayCard";
import PhotoGallery from "@/components/PhotoGallery"; // Import the new component

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showMemories, setShowMemories] = useState(false); // New State
  const [targetDate, setTargetDate] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    // 15 Second Test Timer
    setTargetDate(new Date(Date.now() + 15000));

    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);

    if (audioRef.current) {
        audioRef.current.play().catch(error => console.log("Autoplay prevented"));
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
        className="flex min-h-screen flex-col items-center justify-center bg-pink-50 overflow-x-hidden cursor-pointer"
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
                    <motion.h1
                        animate={{ y: [0, -10, 0], rotate: [0, -2, 2, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="text-3xl font-bold text-pink-600 mb-4 select-none"
                    >
                        Loading something special...
                    </motion.h1>
                    <div className="flex gap-2 text-4xl">
                        <span>✨</span><span>🎂</span><span>🎁</span>
                    </div>
                </motion.div>
            ) : (
                // LOGIC: Countdown -> Card -> Memories
                !showCelebration ? (
                    <Countdown key="countdown" targetDate={targetDate} onComplete={handleCountdownComplete} />
                ) : !showMemories ? (
                    // Pass the function to switch to memories
                    <BirthdayCard key="card" onViewMemories={() => setShowMemories(true)} />
                ) : (
                    <PhotoGallery key="gallery" />
                )
            )}
        </AnimatePresence>
    </main>
  );
}