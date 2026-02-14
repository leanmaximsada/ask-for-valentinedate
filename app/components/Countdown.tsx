"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TARGET_DATE = new Date("2026-03-01T00:00:00").getTime();

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = TARGET_DATE - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  const FlipCard = ({ value, label }: { value: number; label: string }) => {
    const displayValue = value.toString().padStart(2, "0");

    return (
      <div className="flex flex-col items-center gap-2">
        <div className="relative">
          {/* Flip card container */}
          <motion.div
            key={displayValue}
            initial={{ rotateX: -90 }}
            animate={{ rotateX: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative h-20 w-24 overflow-hidden rounded-none border-4 border-[#ff6b9d] bg-[#1a0a2e] sm:h-24 sm:w-28"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Top half */}
            <div className="absolute inset-x-0 top-0 flex h-1/2 items-end justify-center border-b-2 border-[#ff6b9d] bg-[#2d1b4e] pb-1">
              <span
                className="text-3xl font-bold text-[#ffb3d9] sm:text-4xl"
                style={{
                  fontFamily: "monospace",
                  textShadow: "0 0 10px rgba(255, 179, 217, 0.8)",
                }}
              >
                {displayValue}
              </span>
            </div>
            {/* Bottom half */}
            <div className="absolute inset-x-0 bottom-0 flex h-1/2 items-start justify-center border-t-2 border-[#ff6b9d] bg-[#1a0a2e] pt-1">
              <span
                className="text-3xl font-bold text-[#ffb3d9] sm:text-4xl"
                style={{
                  fontFamily: "monospace",
                  textShadow: "0 0 10px rgba(255, 179, 217, 0.8)",
                }}
              >
                {displayValue}
              </span>
            </div>
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
          </motion.div>
          {/* Shadow */}
          <div className="absolute -bottom-1 left-0 right-0 h-2 bg-black/30 blur-sm" />
        </div>
        <span className="text-xs sm:text-sm text-[#ffb3d9] uppercase tracking-wider">
          {label}
        </span>
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8 text-center"
      >
        <h2 className="mb-2 text-2xl sm:text-3xl md:text-4xl text-[#ffb3d9] drop-shadow-[0_0_10px_rgba(255,179,217,0.8)]">
          Time Until Our Date
        </h2>
        <p className="text-sm sm:text-base text-[#ff6b9d]">
          Here is the countdown to our next anniversary on March 01, 2026! as 1 year, 3 months. 
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: "spring" }}
        className="flex flex-wrap items-center justify-center gap-4 sm:gap-6"
      >
        <FlipCard value={timeLeft.days} label="Days" />
        <div className="text-3xl text-[#ff6b9d]">:</div>
        <FlipCard value={timeLeft.hours} label="Hours" />
        <div className="text-3xl text-[#ff6b9d]">:</div>
        <FlipCard value={timeLeft.minutes} label="Minutes" />
        <div className="text-3xl text-[#ff6b9d]">:</div>
        <FlipCard value={timeLeft.seconds} label="Seconds" />
      </motion.div>
    </div>
  );
}
