"use client";

import type React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getBlogPostBySlug, getRecentBlogPosts } from "@/lib/blog";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { useParams } from "next/navigation";
import { ShareButtons } from "@/components/social/share-buttons";
import type { Metadata } from "next";

// Metadata needs to be generated dynamically in Next.js 14, but we'll use useParams instead
export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = getBlogPostBySlug(slug);
  const recentPosts = getRecentBlogPosts(3);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
          <p className="text-gray-300 mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Link href="/blog">
            <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white">
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero with Image */}
      <section className="relative pt-24 pb-12 px-6">
        <div className="absolute inset-0 -z-10 h-[600px]">
          <div className="relative w-full h-full bg-gradient-to-br from-purple-500 to-cyan-500">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        </div>

        <div className="max-w-4xl mx-auto pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6">
              <span className="text-sm font-semibold text-cyan-300 bg-cyan-500/20 px-3 py-1 rounded-full">
                {post.category}
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold">{post.author}</p>
                  {post.authorImage && (
                    <p className="text-xs text-gray-400">Author</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-cyan-400" />
                <span>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-cyan-400" />
                <span>{post.readingTime} min read</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="prose prose-invert prose-lg max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="text-gray-200 space-y-6 leading-relaxed">
              {post.content.split("\n").map((paragraph, index) => {
                if (paragraph.startsWith("#")) {
                  const level = paragraph.match(/^#+/)?.[0].length || 1;
                  const text = paragraph.replace(/^#+\s/, "");
                  const sizes = {
                    1: "text-4xl",
                    2: "text-3xl",
                    3: "text-2xl",
                    4: "text-xl",
                  };
                  const size = sizes[level as keyof typeof sizes] || "text-lg";

                  return (
                    <h2
                      key={index}
                      className={`${size} font-bold text-white mt-8 mb-4`}
                    >
                      {text}
                    </h2>
                  );
                } else if (paragraph.startsWith("-") || paragraph.startsWith("•")) {
                  return (
                    <li key={index} className="ml-6">
                      {paragraph.replace(/^[-•]\s/, "")}
                    </li>
                  );
                } else if (paragraph.trim() === "") {
                  return null;
                } else if (paragraph.startsWith("[")) {
                  return (
                    <Button
                      key={index}
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
                    >
                      {paragraph.replace(/\[|\]/g, "")}
                    </Button>
                  );
                } else {
                  return <p key={index}>{paragraph}</p>;
                }
              })}
            </div>
          </motion.div>

          {/* Share Section */}
          <motion.div
            className="mt-12 pt-8 border-t border-slate-700"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-gray-400 mb-4">Share this article</p>
            <ShareButtons
              title={post.title}
              text={post.excerpt}
            />
          </motion.div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="px-6 py-20 bg-gradient-to-r from-slate-900/50 to-purple-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            More Articles
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
          >
            {recentPosts
              .filter((p) => p.id !== post.id)
              .slice(0, 3)
              .map((relatedPost, index) => (
                <motion.div
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/blog/${relatedPost.slug}`}>
                    <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-cyan-500/30 hover:border-cyan-400 transition-all overflow-hidden h-full hover:shadow-lg hover:shadow-cyan-500/25 cursor-pointer">
                      <div className="relative w-full h-48 bg-gradient-to-br from-purple-500 to-cyan-500 overflow-hidden group">
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>

                      <CardContent className="p-5">
                        <span className="text-xs font-semibold text-cyan-300 bg-cyan-500/20 px-2 py-1 rounded">
                          {relatedPost.category}
                        </span>

                        <h3 className="text-lg font-bold text-white mt-3 mb-2 line-clamp-2">
                          {relatedPost.title}
                        </h3>

                        <p className="text-sm text-gray-300 line-clamp-2 mb-3">
                          {relatedPost.excerpt}
                        </p>

                        <div className="text-xs text-gray-400">
                          {new Date(relatedPost.date).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to Start Your JengaCode Journey?
          </motion.h2>

          <motion.p
            className="text-xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Join thousands of young innovators learning to code and build.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/events">
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-3 rounded-full">
                Explore Events
              </Button>
            </Link>
            <Link href="/about">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full">
                Learn About Us
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
