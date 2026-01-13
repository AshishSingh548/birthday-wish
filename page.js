"use client";
import { useState, useEffect, useRef } from "react";
import Countdown from "@/components/Countdown";
import BirthdayCard from "@/components/BirthdayCard";

export default function Home() {
  const [showCelebration, setShowCelebration] = useState(false);
  const audioRef = useRef(null);

  // SET YOUR TARGET DATE HERE (Year, MonthIndex 0-11, Day, Hour, Min)
  // Example: April 25, 2025 at Midnight
  const targetDate = new Date("2026-04-25T00:00:00");

  useEffect(() => {
    // Check if birthday has already arrived
    if (new Date() >= targetDate) {
      setShowCelebration(true);
    }
  }, []);

  const handleCountdownComplete = () => {
    setShowCelebration(true);
    if (audioRef.current) {
        audioRef.current.play().catch(e => console.log("Audio play failed (browser restriction):", e));
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-pink-50">
        {/* Hidden Audio Element */}
        <audio ref={audioRef} src="/birthday-song.mp3" loop />

        {!showCelebration ? (
            <Countdown targetDate={targetDate} onComplete={handleCountdownComplete} />
        ) : (
            <BirthdayCard />
        )}
    </main>
  );
}