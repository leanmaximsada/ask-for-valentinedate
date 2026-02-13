"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LETTER_TEXT = `My Dearest Valentine,

Another year, another Valentine’s Day, and I’m still completely obsessed with you. Thank you for the laughs, the support, and for making life so much fun. Here’s to many more..

With all my love,
Dmaxz`;

export default function Letter() {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (isTyping && displayedText.length < LETTER_TEXT.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(LETTER_TEXT.slice(0, displayedText.length + 1));
      }, 30);
      return () => clearTimeout(timeout);
    } else if (isTyping) {
      setIsTyping(false);
    }
  }, [displayedText, isTyping]);

  return (
    <div className="mx-auto max-w-200">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8 text-center"
      >
        <h2 className="mb-2 text-2xl sm:text-3xl md:text-4xl text-[#ffb3d9] drop-shadow-[0_0_10px_rgba(255,179,217,0.8)]">
          A Letter For OUN VICHA
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: "spring" }}
        className="relative"
      >
        {/* Parchment background */}
        <div
          className="relative min-h-[400px] rounded-none border-4 border-[#d4a574] bg-[#f4e4c1] p-6 sm:p-8 md:p-12 shadow-[0_0_30px_rgba(212,165,116,0.5)]"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(139,69,19,0.1) 0%, transparent 50%, rgba(139,69,19,0.1) 100%),
              repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139,69,19,0.03) 2px, rgba(139,69,19,0.03) 4px)
            `,
            boxShadow: `
              0 0 0 2px #1a0a2e,
              0 0 0 6px #d4a574,
              0 0 30px rgba(212, 165, 116, 0.5),
              inset 0 0 20px rgba(139, 69, 19, 0.1)
            `,
          }}
        >
          {/* Aged paper texture overlay */}
          <div className="absolute inset-0 opacity-10 mix-blend-multiply" />

          {/* Scrollable content */}
          <div className="relative z-10 max-h-[60vh] overflow-y-auto pr-2">
            <div
              className="whitespace-pre-wrap text-base sm:text-lg md:text-xl leading-relaxed text-[#3d2817]"
              style={{
                fontFamily: "Georgia, serif",
                textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              {displayedText}
              {isTyping && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="ml-1 text-[#8b4513]"
                >
                  |
                </motion.span>
              )}
            </div>
          </div>

          {/* Decorative corners */}
          <div className="absolute top-2 left-2 h-8 w-8 border-l-2 border-t-2 border-[#8b4513] opacity-30" />
          <div className="absolute top-2 right-2 h-8 w-8 border-r-2 border-t-2 border-[#8b4513] opacity-30" />
          <div className="absolute bottom-2 left-2 h-8 w-8 border-l-2 border-b-2 border-[#8b4513] opacity-30" />
          <div className="absolute bottom-2 right-2 h-8 w-8 border-r-2 border-b-2 border-[#8b4513] opacity-30" />
        </div>
      </motion.div>
    </div>
  );
}
