"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Photo {
  id: number;
  src: string;
  alt: string;
}

const PLACEHOLDER_PHOTOS: Photo[] = [
  { id: 1, src: "/img1.jpg", alt: "Photo 1" },
  { id: 2, src: "/img2.jpg", alt: "Photo 2" },
  { id: 3, src: "/img3.jpg", alt: "Photo 3" },
  { id: 4, src: "/img4.jpg", alt: "Photo 4" },
];

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const PhotoFrame = ({ photo, onClick }: { photo: Photo; onClick: () => void }) => {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="relative cursor-pointer"
      >
        {/* Pixel-art style frame */}
        <div
          className="relative aspect-square overflow-hidden rounded-none border-4 border-[#ff6b9d] bg-[#2d1b4e] p-2"
          style={{
            boxShadow: `
              0 0 0 2px #1a0a2e,
              0 0 0 6px #ff6b9d,
              0 8px 0 #ff6b9d,
              0 0 20px rgba(255, 107, 157, 0.5)
            `,
          }}
        >
          {/* Inner border */}
          <div className="absolute inset-2 border-2 border-[#ffb3d9] opacity-50" />
          
          {/* Placeholder content */}
          {photo.src ? (
            <img
              src={photo.src}
              alt={photo.alt}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1a0a2e] to-[#2d1b4e]">
              <div className="text-center">
                <div className="mb-2 text-4xl">📸</div>
                <div className="text-xs text-[#ffb3d9] sm:text-sm">Click to add photo</div>
              </div>
            </div>
          )}

          {/* Corner decorations */}
          <div className="absolute top-0 left-0 h-4 w-4 border-l-2 border-t-2 border-[#ffb3d9]" />
          <div className="absolute top-0 right-0 h-4 w-4 border-r-2 border-t-2 border-[#ffb3d9]" />
          <div className="absolute bottom-0 left-0 h-4 w-4 border-l-2 border-b-2 border-[#ffb3d9]" />
          <div className="absolute bottom-0 right-0 h-4 w-4 border-r-2 border-b-2 border-[#ffb3d9]" />
        </div>
      </motion.div>
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
          Our Time Gallery
        </h2>
        <p className="text-sm sm:text-base text-[#ff6b9d]">
          Click on any photo to view it larger
        </p>
      </motion.div>

      {/* 2x2 Grid */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: "spring" }}
        className="grid grid-cols-2 gap-4 sm:gap-6"
      >
        {PLACEHOLDER_PHOTOS.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <PhotoFrame
              photo={photo}
              onClick={() => setSelectedPhoto(photo)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] max-w-4xl"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-12 right-0 rounded-none border-2 border-[#ff6b9d] bg-[#2d1b4e] px-4 py-2 text-[#ffb3d9] hover:bg-[#ff6b9d] hover:text-[#1a0a2e]"
              >
                ✕ Close
              </button>

              {/* Modal frame */}
              <div
                className="relative overflow-hidden rounded-none border-4 border-[#ff6b9d] bg-[#2d1b4e] p-4"
                style={{
                  boxShadow: `
                    0 0 0 2px #1a0a2e,
                    0 0 0 6px #ff6b9d,
                    0 0 40px rgba(255, 107, 157, 0.8)
                  `,
                }}
              >
                {selectedPhoto.src ? (
                  <img
                    src={selectedPhoto.src}
                    alt={selectedPhoto.alt}
                    className="max-h-[80vh] w-full object-contain"
                  />
                ) : (
                  <div className="flex h-[60vh] w-full items-center justify-center bg-gradient-to-br from-[#1a0a2e] to-[#2d1b4e]">
                    <div className="text-center">
                      <div className="mb-4 text-6xl">📸</div>
                      <div className="text-xl text-[#ffb3d9]">Photo placeholder</div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
