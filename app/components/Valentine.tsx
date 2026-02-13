"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Dashboard from "./Dashboard";

interface Heart {
  id: number;
  x: number;
  y: number;
  rotation: number;
}

const FULL_TEXT = "Will you be my Valentine and go on a date with me Oun Vicha?";
const PICKUP_TIME = "7:00 PM";
const SUCCESS_TEXT = `It's a Date! ❤️ I'll pick you up at ${PICKUP_TIME}.`;

export default function Valentine() {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isAccepted, setIsAccepted] = useState(false);
  const [showFlower, setShowFlower] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonsContainerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  // Typewriter effect
  useEffect(() => {
    if (isAccepted) {
      setDisplayedText(SUCCESS_TEXT);
      return;
    }

    if (isTyping && displayedText.length < FULL_TEXT.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(FULL_TEXT.slice(0, displayedText.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    } else if (isTyping) {
      setIsTyping(false);
    }
  }, [displayedText, isTyping, isAccepted]);

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

  // Initialize audio context for sound effects
  useEffect(() => {
    let context: AudioContext | null = null;

    try {
      context = new (window.AudioContext || (window as any).webkitAudioContext)();
      setAudioContext(context);
    } catch (error) {
      console.debug("Audio context initialization failed");
    }

    const handleInteraction = () => {
      if (context && context.state === "suspended") {
        context.resume();
      } else if (!context) {
        try {
          context = new (window.AudioContext || (window as any).webkitAudioContext)();
          setAudioContext(context);
        } catch (error) {
          console.debug("Audio context initialization failed");
        }
      }
    };

    window.addEventListener("click", handleInteraction, { once: true });
    window.addEventListener("touchstart", handleInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      if (context) {
        context.close();
      }
    };
  }, []);

  // Play Level Up sound effect
  const playLevelUpSound = () => {
    if (!audioContext) return;

    try {
      if (audioContext.state === "suspended") {
        audioContext.resume();
      }

      // Create a "Level Up!" / "New Item Obtained!" sound effect
      // Multi-tone ascending chime
      const frequencies = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      
      frequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = freq;
        oscillator.type = "square";
        
        const startTime = audioContext.currentTime + index * 0.1;
        gainNode.gain.setValueAtTime(0.3, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + 0.3);
      });
    } catch (error) {
      console.debug("Sound effect failed");
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
    setShowFlower(true);
    playLevelUpSound();
    
    // After 2.5 seconds, fade out flower and show dashboard
    setTimeout(() => {
      setShowFlower(false);
      setTimeout(() => {
        setShowDashboard(true);
      }, 500); // Fade transition
    }, 2500);
  };

  // Show Dashboard after flower animation
  if (showDashboard) {
    return <Dashboard />;
  }

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center bg-gradient-to-b from-[#1a0a2e] via-[#2d1b4e] to-[#1a0a2e] p-4 sm:p-8"
    >
      {/* Flower Pop-up */}
      <AnimatePresence>
        {showFlower && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          >
            <motion.div
              initial={{ rotate: -180 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 150 }}
              className="relative"
            >
              {/* Pixel-art flower */}
              <div
                className="relative rounded-none border-4 border-[#ff6b9d] bg-[#2d1b4e] p-8 sm:p-12"
                style={{
                  boxShadow: `
                    0 0 0 2px #1a0a2e,
                    0 0 0 6px #ff6b9d,
                    0 0 40px rgba(255, 107, 157, 0.8),
                    inset 0 0 30px rgba(255, 107, 157, 0.3)
                  `,
                }}
              >
                {/* Flower petals - pixel art style */}
                <div className="relative flex items-center justify-center">
                  {/* Center */}
                  <div className="relative z-10 h-20 w-20 rounded-full bg-[#ffb3d9] border-4 border-[#ff6b9d] sm:h-24 sm:w-24" />
                  
                  {/* Petals */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 h-16 w-16 rounded-full bg-[#ff6b9d] border-4 border-[#ffb3d9] -translate-y-4 sm:h-20 sm:w-20" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-16 w-16 rounded-full bg-[#ff6b9d] border-4 border-[#ffb3d9] translate-y-4 sm:h-20 sm:w-20" />
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-16 w-16 rounded-full bg-[#ff6b9d] border-4 border-[#ffb3d9] -translate-x-4 sm:h-20 sm:w-20" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 h-16 w-16 rounded-full bg-[#ff6b9d] border-4 border-[#ffb3d9] translate-x-4 sm:h-20 sm:w-20" />
                  
                  {/* Diagonal petals */}
                  <div className="absolute top-2 left-2 h-12 w-12 rounded-full bg-[#ffb3d9] border-3 border-[#ff6b9d] sm:h-16 sm:w-16" />
                  <div className="absolute top-2 right-2 h-12 w-12 rounded-full bg-[#ffb3d9] border-3 border-[#ff6b9d] sm:h-16 sm:w-16" />
                  <div className="absolute bottom-2 left-2 h-12 w-12 rounded-full bg-[#ffb3d9] border-3 border-[#ff6b9d] sm:h-16 sm:w-16" />
                  <div className="absolute bottom-2 right-2 h-12 w-12 rounded-full bg-[#ffb3d9] border-3 border-[#ff6b9d] sm:h-16 sm:w-16" />
                </div>

                {/* "Level Up!" text */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 text-center"
                >
                  <div className="mb-2 text-2xl sm:text-3xl md:text-4xl text-[#ffb3d9] drop-shadow-[0_0_10px_rgba(255,179,217,0.8)]">
                    Yesss!
                  </div>
                  <div className="text-lg sm:text-xl text-[#ff6b9d]">
                    Let's go on a date!
                  </div>
                </motion.div>

                {/* Sparkle effects */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-2xl"
                    initial={{
                      x: "50%",
                      y: "50%",
                      scale: 0,
                      opacity: 0,
                    }}
                    animate={{
                      x: `calc(50% + ${Math.cos((i * Math.PI) / 4) * 100}px)`,
                      y: `calc(50% + ${Math.sin((i * Math.PI) / 4) * 100}px)`,
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: 0.2,
                      repeat: Infinity,
                      repeatDelay: 0.5,
                    }}
                  >
                    ✨
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
        
        {/* Profile Image */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="mb-4 flex justify-center"
        >
          <div
            className="relative rounded-none border-4 border-[#ff6b9d] bg-[#1a0a2e] p-2"
            style={{
              boxShadow: `
                0 0 0 2px #ffb3d9,
                0 0 0 4px #1a0a2e,
                0 0 20px rgba(255, 107, 157, 0.5)
              `,
            }}
          >
            <img
              src="/logo.png"
              alt="Profile"
              className="h-24 w-24 object-cover sm:h-32 sm:w-32"
              style={{
                imageRendering: "pixelated",
                imageRendering: "-moz-crisp-edges",
                imageRendering: "crisp-edges",
              }}
            />
          </div>
        </motion.div>
        
        {/* Header */}
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 text-center text-xl sm:text-2xl md:text-3xl text-[#ffb3d9] drop-shadow-[0_0_10px_rgba(255,179,217,0.8)]"
        >
          happy valentine's day!
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
