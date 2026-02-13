"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Countdown from "./Countdown";
import Letter from "./Letter";
import PhotoGallery from "./PhotoGallery";
import DigitalFlower from "./DigitalFlower";

type Section = "countdown" | "letter" | "gallery" | "flower";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState<Section>("countdown");
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  // Initialize audio context for sound effects
  useEffect(() => {
    let context: AudioContext | null = null;

    // Try to initialize immediately
    try {
      context = new (window.AudioContext || (window as any).webkitAudioContext)();
      setAudioContext(context);
    } catch (error) {
      console.debug("Audio context initialization failed");
    }

    // Listen for user interaction to resume audio context
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

  // Play select sound effect (8-bit style)
  const playSelectSound = () => {
    if (!audioContext) return;
    
    try {
      // Resume audio context if suspended (browser autoplay policy)
      if (audioContext.state === "suspended") {
        audioContext.resume();
      }
      
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // 8-bit style square wave
      oscillator.frequency.value = 800;
      oscillator.type = "square";
      
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.15);
    } catch (error) {
      // Silently fail if audio context is not available
      console.debug("Audio context not available");
    }
  };

  const sections: { id: Section; label: string }[] = [
    { id: "countdown", label: "Countdown" },
    { id: "letter", label: "Letter" },
    { id: "gallery", label: "Our Time" },
    { id: "flower", label: "Your Flower" },
  ];

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-[#1a0a2e] via-[#2d1b4e] to-[#1a0a2e] pb-20 sm:pb-24">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-4 py-8 sm:px-8">
        <AnimatePresence mode="wait">
          {activeSection === "countdown" && (
            <motion.div
              key="countdown"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Countdown />
            </motion.div>
          )}
          {activeSection === "letter" && (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Letter />
            </motion.div>
          )}
          {activeSection === "gallery" && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PhotoGallery />
            </motion.div>
          )}
          {activeSection === "flower" && (
            <motion.div
              key="flower"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <DigitalFlower />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Fixed Bottom Navigation Bar */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        className="fixed bottom-0 left-0 right-0 z-[100] border-t-4 border-[#ff6b9d] bg-[#2d1b4e] px-2 py-2 sm:px-4 sm:py-3 shadow-[0_-4px_20px_rgba(255,107,157,0.5)]"
        style={{
          boxShadow: `
            0 -4px 0 #1a0a2e,
            0 -8px 0 #ff6b9d,
            0 -4px 20px rgba(255, 107, 157, 0.5)
          `,
        }}
      >
        <div className="mx-auto flex max-w-4xl items-center justify-center gap-1 sm:gap-2 md:gap-4">
          {sections.map((section) => (
            <motion.button
              key={section.id}
              onClick={() => {
                playSelectSound();
                setActiveSection(section.id);
              }}
              onMouseEnter={playSelectSound}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative flex-1 rounded-none border-4 px-2 py-2 text-[10px] sm:px-4 sm:py-3 sm:text-xs md:text-sm font-pixel transition-all ${
                activeSection === section.id
                  ? "border-[#ff6b9d] bg-[#ff6b9d] text-[#1a0a2e] shadow-[0_0_15px_rgba(255,107,157,0.8)]"
                  : "border-[#ff6b9d] bg-[#2d1b4e] text-[#ffb3d9] hover:bg-[#1a0a2e] hover:border-[#ffb3d9]"
              }`}
              style={{
                boxShadow:
                  activeSection === section.id
                    ? `
                      0 0 0 2px #1a0a2e,
                      0 4px 0 #ff6b9d,
                      0 0 15px rgba(255, 107, 157, 0.8)
                    `
                    : `
                      0 0 0 2px #1a0a2e,
                      0 4px 0 #ff6b9d,
                      0 0 10px rgba(255, 107, 157, 0.3)
                    `,
              }}
            >
              {section.label}
              {activeSection === section.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 border-2 border-[#ffb3d9] opacity-50"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </motion.nav>
    </div>
  );
}
