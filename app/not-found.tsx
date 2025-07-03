"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-jengacode-purple via-jengacode-purple to-jengacode-cyan text-white flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Animated 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="text-9xl font-bold bg-gradient-to-r from-jengacode-cyan to-jengacode-yellow bg-clip-text text-transparent mb-4">
            404
          </div>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            className="text-6xl mb-6"
          >
            🤖
          </motion.div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-xl text-jengacode-cyan-light mb-6">
            Looks like this page went on its own coding adventure! Don't worry,
            we'll help you find your way back.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/">
            <Button className="bg-gradient-to-r from-jengacode-cyan to-jengacode-purple hover:from-jengacode-cyan-light hover:to-jengacode-purple-light text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105">
              <Home className="mr-2 w-5 h-5" />
              Back to Home
            </Button>
          </Link>

          <Link href="/events">
            <Button className="bg-gradient-to-r from-jengacode-purple to-jengacode-yellow hover:from-jengacode-purple-light hover:to-yellow-400 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105">
              <Search className="mr-2 w-5 h-5" />
              Explore Events
            </Button>
          </Link>
        </motion.div>

        {/* Fun Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12"
        >
          <p className="text-sm text-jengacode-cyan-light">
            "Every error is a step closer to the solution!" - JengaCode Team
          </p>
        </motion.div>

        {/* Floating Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-jengacode-cyan/30 rounded-full"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
