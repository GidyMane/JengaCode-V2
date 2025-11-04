"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { GalleryItem } from "@/lib/gallery";

interface GalleryLightboxProps {
  items: GalleryItem[];
  selectedIndex: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function GalleryLightbox({
  items,
  selectedIndex,
  onClose,
  onNext,
  onPrev,
}: GalleryLightboxProps) {
  if (selectedIndex === null) return null;

  const currentItem = items[selectedIndex];

  return (
    <AnimatePresence>
      {selectedIndex !== null && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-slate-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Container */}
            <div className="relative w-full h-[60vh] bg-gradient-to-br from-slate-800 to-slate-900">
              <Image
                src={currentItem.image}
                alt={currentItem.title}
                fill
                className="object-cover"
              />

              {/* Close Button */}
              <motion.button
                onClick={onClose}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Navigation Buttons */}
              {items.length > 1 && (
                <>
                  <motion.button
                    onClick={onPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </motion.button>

                  <motion.button
                    onClick={onNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </motion.button>
                </>
              )}

              {/* Image Counter */}
              {items.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                  {selectedIndex + 1} / {items.length}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                {currentItem.title}
              </h3>
              <p className="text-gray-300 mb-4">{currentItem.description}</p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <div>
                  <span className="text-gray-300 font-semibold">Year:</span>{" "}
                  {currentItem.year}
                </div>
                {currentItem.event && (
                  <div>
                    <span className="text-gray-300 font-semibold">Event:</span>{" "}
                    {currentItem.event}
                  </div>
                )}
                {currentItem.location && (
                  <div>
                    <span className="text-gray-300 font-semibold">Location:</span>{" "}
                    {currentItem.location}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
