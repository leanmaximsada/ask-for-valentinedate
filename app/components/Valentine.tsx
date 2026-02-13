"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Heart {
  id: number;
  x: number;
  y: number;
  rotation: number;
}

export default function Valentine() {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isAccepted, setIsAccepted] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [hearts, setHearts] = useState<Heart[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonsContainerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const fullText = "Will you be my Valentine and go on a date with me tomorrow?";
  const pickupTime = "7:00 PM";
  const successText = `It's a Date! ❤️ I'll pick you up at ${pickupTime}.`;

  // Typewriter effect
  useEffect(() => {
    if (isAccepted) {
      setDisplayedText(successText);
      return;
    }

    if (isTyping && displayedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    } else if (isTyping) {
      setIsTyping(false);
    }
  }, [displayedText, isTyping, isAccepted, fullText, successText]);

  // Initialize NO button position
  useEffect(() => {
    if (buttonsContainerRef.current && noButtonRef.current) {
      const container = buttonsContainerRef.current;
      const button = noButtonRef.current;
      const maxX = container.offsetWidth - button.offsetWidth;
      const maxY = container.offsetHeight - button.offsetHeight;
      setNoButtonPosition({
        x: Math.max(0, Math.random() * maxX),
        y: Math.max(0, Math.random() * maxY),
      });
    }
  }, []);

  // Handle NO button hover - teleport to random position
  const handleNoButtonHover = () => {
    if (buttonsContainerRef.current && noButtonRef.current && !isAccepted) {
      const container = buttonsContainerRef.current;
      const button = noButtonRef.current;
      const maxX = Math.max(0, container.offsetWidth - button.offsetWidth);
      const maxY = Math.max(0, container.offsetHeight - button.offsetHeight);
      
      setNoButtonPosition({
        x: Math.random() * maxX,
        y: Math.random() * maxY,
      });
    }
  };

  // Generate confetti hearts
  const generateHearts = () => {
    const newHearts: Heart[] = [];
    for (let i = 0; i < 50; i++) {
      newHearts.push({
        id: i,
        x: Math.random() * 100,
        y: -10 - Math.random() * 20,
        rotation: Math.random() * 360,
      });
    }
    setHearts(newHearts);
  };

  const handleYesClick = () => {
    setIsAccepted(true);
    generateHearts();
  };

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center bg-gradient-to-b from-[#1a0a2e] via-[#2d1b4e] to-[#1a0a2e] p-4 sm:p-8"
    >
      {/* Confetti Hearts */}
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-2xl sm:text-3xl"
            initial={{
              x: `${heart.x}vw`,
              y: `${heart.y}vh`,
              rotate: heart.rotation,
              opacity: 1,
            }}
            animate={{
              y: "100vh",
              rotate: heart.rotation + 360,
              opacity: [1, 1, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 3 + Math.random() * 2,
              ease: "easeOut",
            }}
          >
            ❤️
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main Dialogue Box */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="relative w-full max-w-2xl rounded-none border-4 border-[#ff6b9d] bg-[#2d1b4e] p-6 sm:p-8 shadow-[0_0_20px_rgba(255,107,157,0.5),inset_0_0_20px_rgba(255,107,157,0.1)]"
        style={{
          boxShadow: `
            0 0 0 2px #1a0a2e,
            0 0 0 4px #ff6b9d,
            0 0 20px rgba(255, 107, 157, 0.5),
            inset 0 0 20px rgba(255, 107, 157, 0.1)
          `,
        }}
      >
        {/* Pixel border effect */}
        <div className="absolute inset-0 border-2 border-[#ffb3d9] opacity-50" />
        
        {/* Header */}
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 text-center text-xl sm:text-2xl md:text-3xl text-[#ffb3d9] drop-shadow-[0_0_10px_rgba(255,179,217,0.8)]"
        >
          A Wild Valentine Appears!
        </motion.h1>

        {/* Main Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8 min-h-[80px] text-center text-sm sm:text-base md:text-lg text-[#ff6b9d] leading-relaxed"
        >
          {displayedText}
          {isTyping && !isAccepted && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="ml-1"
            >
              |
            </motion.span>
          )}
        </motion.div>

        {/* Buttons Container */}
        {!isAccepted && (
          <div ref={buttonsContainerRef} className="relative min-h-[60px] flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {/* YES Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleYesClick}
              className="relative z-10 rounded-none border-4 border-[#ff6b9d] bg-[#ff6b9d] px-6 py-3 text-sm sm:text-base text-[#1a0a2e] transition-all hover:bg-[#ffb3d9] hover:border-[#ffb3d9] hover:shadow-[0_0_20px_rgba(255,107,157,0.8)]"
              style={{
                boxShadow: `
                  0 0 0 2px #1a0a2e,
                  0 4px 0 #ff6b9d,
                  0 0 10px rgba(255, 107, 157, 0.5)
                `,
              }}
            >
              YES
            </motion.button>

            {/* NO Button - Teleporting */}
            <motion.button
              ref={noButtonRef}
              initial={false}
              animate={{
                x: noButtonPosition.x,
                y: noButtonPosition.y,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              onMouseEnter={handleNoButtonHover}
              className="absolute rounded-none border-4 border-[#ff6b9d] bg-[#2d1b4e] px-6 py-3 text-sm sm:text-base text-[#ff6b9d] transition-all hover:bg-[#1a0a2e] hover:border-[#ffb3d9]"
              style={{
                boxShadow: `
                  0 0 0 2px #1a0a2e,
                  0 4px 0 #ff6b9d,
                  0 0 10px rgba(255, 107, 157, 0.3)
                `,
              }}
            >
              NO
            </motion.button>
          </div>
        )}

        {/* Success Message Animation */}
        {isAccepted && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mt-6 text-center text-lg sm:text-xl md:text-2xl text-[#ffb3d9]"
          >
            🎉✨🎉
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
