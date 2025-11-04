"use client";

import type React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllBlogPosts, getFeaturedBlogPosts } from "@/lib/blog";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - JengaCode News & Insights",
  description:
    "Read stories about JengaCode students, tutorials, tech education insights, and announcements from our community.",
  keywords: "blog, news, articles, tech education, coding, tutorials, success stories",
};

export default function BlogPage() {
  const allPosts = getAllBlogPosts();
  const featuredPosts = getFeaturedBlogPosts();

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
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
            JengaCode Blog
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-cyan-100 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Stories, insights, tutorials, and updates from the JengaCode community.
          </motion.p>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="px-6 py-16 bg-gradient-to-r from-slate-900/50 to-purple-900/50">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Featured Articles
            </motion.h2>

            <motion.div
              className="grid md:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {featuredPosts.map((post, index) => (
                <motion.div key={post.id} variants={itemVariants}>
                  <Link href={`/blog/${post.slug}`}>
                    <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-cyan-500/30 hover:border-cyan-400 transition-all overflow-hidden h-full hover:shadow-lg hover:shadow-cyan-500/25 cursor-pointer">
                      <div className="relative w-full h-64 bg-gradient-to-br from-purple-500 to-cyan-500 overflow-hidden group">
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <h3 className="text-2xl font-bold text-white mb-3 line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-gray-300 mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readingTime} min read
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-600">
                          <span className="text-sm text-cyan-300 font-semibold">
                            By {post.author}
                          </span>
                          <ArrowRight className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Latest Articles
          </motion.h2>

          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {allPosts.map((post) => (
              <motion.div key={post.id} variants={itemVariants}>
                <Link href={`/blog/${post.slug}`}>
                  <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-purple-500/30 hover:border-purple-400 transition-all overflow-hidden hover:shadow-lg hover:shadow-purple-500/25 cursor-pointer">
                    <div className="flex flex-col md:flex-row h-full">
                      {/* Image */}
                      <div className="relative w-full md:w-64 h-64 md:h-auto bg-gradient-to-br from-purple-500 to-cyan-500 flex-shrink-0 overflow-hidden group">
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>

                      {/* Content */}
                      <CardContent className="flex-1 p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs font-semibold text-cyan-300 bg-cyan-500/20 px-2 py-1 rounded">
                              {post.category}
                            </span>
                            <span className="text-xs text-gray-400">
                              {post.readingTime} min read
                            </span>
                          </div>

                          <h3 className="text-2xl font-bold text-white mb-2 hover:text-cyan-300 transition-colors">
                            {post.title}
                          </h3>

                          <p className="text-gray-300 mb-4 line-clamp-3">
                            {post.excerpt}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-600">
                          <div className="flex items-center gap-3">
                            <div>
                              <p className="text-sm font-semibold text-white">
                                {post.author}
                              </p>
                              <p className="text-xs text-gray-400">
                                {new Date(post.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )}
                              </p>
                            </div>
                          </div>
                          <ArrowRight className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
