"use client";
import { useState, useEffect, useRef } from "react";
// We use lowercase 'components' to match your folder
import Countdown from "@/components/Countdown";
import BirthdayCard from "@/components/BirthdayCard";

export default function Home() {
  const [showCelebration, setShowCelebration] = useState(false);
  const audioRef = useRef(null);

  // --- CONFIGURATION ---
  // Change this date to test it!
  // Example for testing: Set this to YESTERDAY to see the card immediately.
  // Real date example: "2026-04-25T00:00:00"
  const targetDate = new Date("2026-04-25T00:00:00");

  useEffect(() => {
    // If today is AFTER the target date, show celebration immediately
    if (new Date() >= targetDate) {
      setShowCelebration(true);
    }
  }, [targetDate]);

  const handleCountdownComplete = () => {
    setShowCelebration(true);
    // Try to play audio (browsers might block this without user interaction first)
    if (audioRef.current) {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-pink-50">
        {/* Make sure 'birthday-song.mp3' is inside your 'public' folder */}
        <audio ref={audioRef} src="/birthday-song.mp3" loop />

        {!showCelebration ? (
            <Countdown targetDate={targetDate} onComplete={handleCountdownComplete} />
        ) : (
            <BirthdayCard />
        )}
    </main>
  );
}