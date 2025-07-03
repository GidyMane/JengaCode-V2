"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EventImage } from "@/types/event";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import Image from "next/image";

interface EventGalleryProps {
  images: EventImage[];
  eventTitle: string;
}

export function EventGallery({ images, eventTitle }: EventGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<EventImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (image: EventImage, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(images[nextIndex]);
  };

  const goToPrevious = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(images[prevIndex]);
  };

  if (images.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">No images available for this event.</p>
      </div>
    );
  }

  const featuredImage = images.find((img) => img.featured) || images[0];
  const otherImages = images.filter((img) => img.id !== featuredImage.id);

  return (
    <div className="space-y-6">
      {/* Featured Image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative group cursor-pointer"
        onClick={() => openLightbox(featuredImage, 0)}
      >
        <div className="relative h-96 w-full rounded-xl overflow-hidden shadow-lg">
          <Image
            src={featuredImage.url}
            alt={featuredImage.alt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
        {featuredImage.caption && (
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 text-center">
            {featuredImage.caption}
          </p>
        )}
      </motion.div>

      {/* Image Grid */}
      {otherImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {otherImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group cursor-pointer"
              onClick={() => openLightbox(image, index + 1)}
            >
              <div className="relative h-32 w-full rounded-lg overflow-hidden shadow-md">
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <ZoomIn className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              {image.caption && (
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 text-center line-clamp-2">
                  {image.caption}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <Dialog open={!!selectedImage} onOpenChange={() => closeLightbox()}>
        <DialogContent className="max-w-7xl max-h-[90vh] p-0 bg-black/90 border-0">
          <div className="relative w-full h-full flex items-center justify-center">
            {selectedImage && (
              <>
                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 z-10 text-white hover:bg-white/20 rounded-full"
                >
                  <X className="w-6 h-6" />
                </Button>

                {/* Navigation Buttons */}
                {images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={goToPrevious}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:bg-white/20 rounded-full"
                    >
                      <ChevronLeft className="w-8 h-8" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={goToNext}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:bg-white/20 rounded-full"
                    >
                      <ChevronRight className="w-8 h-8" />
                    </Button>
                  </>
                )}

                {/* Image */}
                <div className="relative w-full h-full max-w-6xl max-h-[80vh] mx-4">
                  <Image
                    src={selectedImage.url}
                    alt={selectedImage.alt}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Image Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <div className="text-center text-white">
                    {selectedImage.caption && (
                      <p className="text-lg mb-2">{selectedImage.caption}</p>
                    )}
                    <p className="text-sm opacity-75">
                      {currentIndex + 1} of {images.length} • {eventTitle}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
