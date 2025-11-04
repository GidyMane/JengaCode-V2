"use client";

import type React from "react";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GalleryLightbox } from "@/components/gallery/gallery-lightbox";
import {
  galleryItems,
  getGalleryYears,
  getGalleryByYear,
  getGalleryByCategory,
} from "@/lib/gallery";
import Image from "next/image";
import type { Metadata } from "next";
import { Filter } from "lucide-react";

export const metadata: Metadata = {
  title: "Gallery - JengaCode Events & Activities",
  description:
    "Explore our photo gallery showcasing JengaCode events, workshops, and student achievements across Kenya.",
  keywords: "gallery, photos, events, JengaCode, workshops, achievements",
};

export default function GalleryPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const years = getGalleryYears();

  const filteredItems = useMemo(() => {
    let filtered = [...galleryItems];

    if (selectedYear) {
      filtered = filtered.filter((item) => item.year === selectedYear);
    }

    if (selectedCategory) {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    return filtered;
  }, [selectedYear, selectedCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            JengaCode Gallery
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-cyan-100 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Explore our collection of photos and videos from events, workshops,
            and celebrations of student achievements.
          </motion.p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="px-6 py-12 bg-gradient-to-r from-slate-900/50 to-purple-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Filter className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-bold text-white">Filter Gallery</h2>
            </div>

            <div className="space-y-6">
              {/* Year Filter */}
              <div>
                <h3 className="text-sm font-semibold text-gray-300 mb-3">
                  Filter by Year
                </h3>
                <div className="flex flex-wrap gap-2">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={() => setSelectedYear(null)}
                      className={`rounded-full transition-all ${
                        selectedYear === null
                          ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                          : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                      }`}
                    >
                      All Years
                    </Button>
                  </motion.div>

                  {years.map((year) => (
                    <motion.div
                      key={year}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={() => setSelectedYear(year)}
                        className={`rounded-full transition-all ${
                          selectedYear === year
                            ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                            : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                        }`}
                      >
                        {year}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="text-sm font-semibold text-gray-300 mb-3">
                  Filter by Type
                </h3>
                <div className="flex flex-wrap gap-2">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={() => setSelectedCategory(null)}
                      className={`rounded-full transition-all ${
                        selectedCategory === null
                          ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                          : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                      }`}
                    >
                      All
                    </Button>
                  </motion.div>

                  {["photo", "video"].map((category) => (
                    <motion.div
                      key={category}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={() => setSelectedCategory(category)}
                        className={`rounded-full transition-all ${
                          selectedCategory === category
                            ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                            : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                        }`}
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-400">
              Showing {filteredItems.length} of {galleryItems.length} items
            </p>
          </motion.div>

          {filteredItems.length === 0 ? (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-xl text-gray-300">
                No items found for the selected filters.
              </p>
            </motion.div>
          ) : (
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    const itemIndex = filteredItems.findIndex(
                      (i) => i.id === item.id
                    );
                    setSelectedIndex(itemIndex);
                  }}
                  className="cursor-pointer"
                >
                  <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-cyan-500/30 hover:border-cyan-400 transition-all overflow-hidden h-full group">
                    <div className="relative w-full h-64 bg-gradient-to-br from-purple-500 to-cyan-500 overflow-hidden">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />

                      {/* Type Badge */}
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {item.category === "photo" ? "📷" : "🎥"}{" "}
                        {item.category}
                      </div>

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileHover={{ opacity: 1, scale: 1 }}
                          className="text-white text-center"
                        >
                          <p className="font-semibold">Click to view</p>
                        </motion.div>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-300 mb-3 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-2 text-xs text-gray-400">
                        <span className="bg-slate-700 px-2 py-1 rounded">
                          {item.year}
                        </span>
                        {item.event && (
                          <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded">
                            {item.event}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <GalleryLightbox
        items={filteredItems}
        selectedIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onNext={() => {
          if (selectedIndex !== null && selectedIndex < filteredItems.length - 1) {
            setSelectedIndex(selectedIndex + 1);
          }
        }}
        onPrev={() => {
          if (selectedIndex !== null && selectedIndex > 0) {
            setSelectedIndex(selectedIndex - 1);
          }
        }}
      />
    </div>
  );
}
