"use client";
import { useState, useEffect, useRef } from "react";
// NOTICE: The 'c' is now lowercase to match your new folder
import Countdown from "@/components/Countdown";
import BirthdayCard from "@/components/BirthdayCard";

export default function Home() {
  const [showCelebration, setShowCelebration] = useState(false);
  const audioRef = useRef(null);

  // --- CONFIGURATION ---
  // Target Date: April 25, 2026
  const targetDate = new Date("2026-04-25T00:00:00");

  useEffect(() => {
    if (new Date() >= targetDate) {
      setShowCelebration(true);
    }
  }, [targetDate]);

  const handleCountdownComplete = () => {
    setShowCelebration(true);
    if (audioRef.current) {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-pink-50">
        <audio ref={audioRef} src="/birthday-song.mp3" loop />

        {!showCelebration ? (
            <Countdown targetDate={targetDate} onComplete={handleCountdownComplete} />
        ) : (
            <BirthdayCard />
        )}
    </main>
  );
}