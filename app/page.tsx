"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Rocket,
  Star,
  Play,
  Calendar,
  Users,
  Brain,
  Sparkles,
  ChevronRight,
  Volume2,
  VolumeX,
  Share2,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function JengaCodeLanding() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [exploredZones, setExploredZones] = useState(new Set());
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string | null>(null);
  const [showEventSchedule, setShowEventSchedule] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const ageGroups = [
    {
      id: "5-8",
      title: "Play & Learn",
      subtitle: "Ages 5-8",
      description: "Discover coding through games and colorful adventures!",
      icon: "🎮",
      color: "from-purple-400 to-purple-600",
      projects: [
        "Scratch Jr Adventures",
        "Robot Dance Party",
        "Color Code Quest",
      ],
    },
    {
      id: "9-12",
      title: "Build & Explore",
      subtitle: "Ages 9-12",
      description: "Create amazing projects and solve fun challenges!",
      icon: "🔧",
      color: "from-cyan-400 to-cyan-600",
      projects: ["Minecraft Mods", "App Inventor", "Arduino Robots"],
    },
    {
      id: "13-17",
      title: "Hack & Lead",
      subtitle: "Ages 13-17",
      description: "Lead teams, build real apps, and change the world!",
      icon: "🚀",
      color: "from-yellow-400 to-yellow-600",
      projects: ["Web Development", "AI Projects", "Startup Challenges"],
    },
  ];

  const upcomingEvents = [
    {
      title: "JengaCode Innovation Day",
      date: "August 8, 2025",
      time: "10:00 AM - 4:00 PM",
      description:
        "Our biggest event of the year! Hackathons, workshops, and prizes!",
      ageGroup: "All Ages",
      featured: true,
    },
    {
      title: "Robot Building Workshop",
      date: "July 15, 2025",
      time: "2:00 PM - 5:00 PM",
      description: "Build and program your own robot companion!",
      ageGroup: "Ages 9-17",
    },
    {
      title: "Scratch Animation Festival",
      date: "July 22, 2025",
      time: "1:00 PM - 3:00 PM",
      description: "Create animated stories and share with friends!",
      ageGroup: "Ages 5-12",
    },
  ];

  const challenges = [
    {
      title: "Fix the Robot",
      description: "Help our robot friend find the missing code blocks!",
      difficulty: "Easy",
      icon: "🤖",
    },
    {
      title: "Logic Puzzle",
      description: "Solve today's brain-bending coding challenge!",
      difficulty: "Medium",
      icon: "🧩",
    },
    {
      title: "Code Builder",
      description: "Drag and drop to create your first program!",
      difficulty: "Beginner",
      icon: "🧱",
    },
  ];

  const communityQuotes = [
    { text: "I built my first game at JengaCode!", author: "Maya, age 10" },
    { text: "The mentors here are amazing!", author: "Alex, age 14" },
    { text: "I love the robot workshops!", author: "Sam, age 8" },
    { text: "JengaCode helped me start my own app!", author: "Jordan, age 16" },
  ];

  const handleExploreZone = (zoneId: string) => {
    setExploredZones((prev) => new Set([...prev, zoneId]));
  };

  const Modal = ({
    isOpen,
    onClose,
    title,
    children,
  }: {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
  }) => {
    if (!isOpen) return null;

    return (
      <motion.div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-6 max-w-4xl max-h-[90vh] overflow-y-auto border border-cyan-500/30"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {title}
            </h2>
            <Button
              onClick={onClose}
              className="bg-red-500 hover:bg-red-600 text-white rounded-full w-10 h-10 p-0"
            >
              ✕
            </Button>
          </div>
          {children}
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-cyan-500 text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-30"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Cursor Trail */}
      <motion.div
        className="fixed w-6 h-6 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full pointer-events-none z-50 opacity-50"
        animate={{
          x: cursorPosition.x - 12,
          y: cursorPosition.y - 12,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Welcome Portal */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            className="fixed inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-cyan-500 z-50 flex items-center justify-center"
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1 }}
          >
            <div className="text-center">
              <motion.div
                className="w-24 h-24 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center border-4 border-cyan-300 mx-auto mb-6"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="text-white font-bold text-2xl">{"<J>"}</span>
              </motion.div>
              <motion.h1
                className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-300 via-white to-cyan-300 bg-clip-text text-transparent mb-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                JENGACODE
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl mb-8 text-cyan-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
              >
                Enter the World of Innovation
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.5 }}
              >
                <Button
                  onClick={() => setShowWelcome(false)}
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                >
                  <Sparkles className="mr-2" />
                  Begin Exploring
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="p-6 flex justify-between items-center">
          <motion.div
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2 }}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center border-2 border-cyan-300">
              <span className="text-white font-bold text-lg">{"<J>"}</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
              ENGACODE
            </span>
          </motion.div>

          <motion.button
            onClick={() => setMusicEnabled(!musicEnabled)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2 }}
          >
            {musicEnabled ? (
              <Volume2 className="w-5 h-5" />
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
          </motion.button>
        </header>

        {/* Hero Section */}
        <section className="px-6 py-12 text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2 }}
          >
            Where Young Minds Code the Future
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-12 text-cyan-200 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4 }}
          >
            Join thousands of young innovators in the most exciting tech
            adventure of your life!
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6 }}
          >
            <Button
              onClick={() => setActiveModal("about")}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-full"
            >
              <Brain className="mr-2 w-5 h-5" />
              What Is JengaCode?
            </Button>
            <Button
              onClick={() => setActiveModal("events")}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-3 rounded-full"
            >
              <Calendar className="mr-2 w-5 h-5" />
              Upcoming Events
            </Button>
            <Button
              onClick={() => setActiveModal("age-groups")}
              className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-6 py-3 rounded-full"
            >
              <Users className="mr-2 w-5 h-5" />
              Explore by Age
            </Button>
          </motion.div>
        </section>

        {/* Age Groups Section */}
        <section className="px-6 py-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Choose Your Adventure Path
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {ageGroups.map((group, index) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="cursor-pointer"
                onClick={() => handleExploreZone(group.id)}
              >
                <Card
                  className={`bg-gradient-to-br ${group.color} border-0 shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 h-full`}
                >
                  <CardContent className="p-8 text-center text-white">
                    <div className="text-6xl mb-4">{group.icon}</div>
                    <h3 className="text-2xl font-bold mb-2">{group.title}</h3>
                    <p className="text-lg opacity-90 mb-4">{group.subtitle}</p>
                    <p className="mb-6 opacity-80">{group.description}</p>

                    <div className="space-y-2 mb-6">
                      {group.projects.map((project, i) => (
                        <div
                          key={i}
                          className="bg-white/20 rounded-full px-3 py-1 text-sm"
                        >
                          {project}
                        </div>
                      ))}
                    </div>

                    <Button className="bg-white/20 hover:bg-white/30 text-white border-0 rounded-full">
                      Explore Zone <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>

                    {exploredZones.has(group.id) && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="mt-4"
                      >
                        <div className="bg-yellow-400 text-yellow-900 rounded-full px-3 py-1 text-sm font-bold inline-flex items-center">
                          <Star className="w-4 h-4 mr-1" />
                          Explorer Badge!
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Event Section */}
        <section className="px-6 py-16 bg-gradient-to-r from-purple-900/50 to-cyan-900/50">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center border-2 border-cyan-300">
                <span className="text-white font-bold text-sm">{"<J>"}</span>
              </div>
              <div className="text-6xl mb-4">🏕️</div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-purple-800">
                Summer Coding Camp
              </h2>
              <p className="text-xl mb-6 text-purple-700 font-bold">
                August 8th - 9th, 2025
              </p>
              <p className="text-lg mb-8 text-purple-700 max-w-2xl mx-auto">
                Join us for an amazing 2-day coding adventure! Learn robotics,
                Scratch programming, web development, and so much more. All
                skill levels welcome!
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  onClick={() => setShowEventSchedule(true)}
                  className="bg-white text-orange-500 hover:bg-gray-100 px-6 py-3 rounded-full font-bold"
                >
                  <Calendar className="mr-2 w-5 h-5" />
                  View Event Schedule
                </Button>
                <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-500 px-6 py-3 rounded-full">
                  <Share2 className="mr-2 w-5 h-5" />
                  Share with Friends
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mini Arcade Section */}
        <section className="px-6 py-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Try a Challenge Right Now!
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {challenges.map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
              >
                <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{challenge.icon}</div>
                    <h3 className="text-xl font-bold mb-2 text-cyan-300">
                      {challenge.title}
                    </h3>
                    <p className="text-gray-300 mb-4">
                      {challenge.description}
                    </p>
                    <div className="mb-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-bold ${
                          challenge.difficulty === "Easy"
                            ? "bg-green-500/20 text-green-300"
                            : challenge.difficulty === "Medium"
                              ? "bg-yellow-500/20 text-yellow-300"
                              : "bg-blue-500/20 text-blue-300"
                        }`}
                      >
                        {challenge.difficulty}
                      </span>
                    </div>
                    <Button
                      onClick={() => setActiveModal(`challenge-${index}`)}
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white rounded-full w-full"
                    >
                      <Play className="mr-2 w-4 h-4" />
                      Start Challenge
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Upcoming Events Carousel */}
        <section className="px-6 py-16 bg-gradient-to-r from-slate-900/50 to-purple-900/50">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Upcoming Adventures
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ rotateY: 10, scale: 1.02 }}
                className="cursor-pointer"
              >
                <Card
                  className={`${event.featured ? "bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-400" : "bg-gradient-to-br from-slate-800 to-slate-700 border-purple-500/30"} border hover:border-opacity-100 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 h-full`}
                >
                  <CardContent className="p-6">
                    {event.featured && (
                      <div className="bg-yellow-400 text-yellow-900 rounded-full px-3 py-1 text-sm font-bold inline-block mb-4">
                        ⭐ Featured Event
                      </div>
                    )}
                    <h3 className="text-xl font-bold mb-2 text-cyan-300">
                      {event.title}
                    </h3>
                    <p className="text-purple-300 mb-2">
                      {event.date} • {event.time}
                    </p>
                    <p className="text-gray-300 mb-4">{event.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                        {event.ageGroup}
                      </span>
                      <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Community Wall */}
        <section className="px-6 py-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            What Our Innovators Say
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {communityQuotes.map((quote, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="cursor-pointer"
              >
                <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-yellow-400/50 hover:border-yellow-400 transition-all duration-300 shadow-lg hover:shadow-yellow-500/25 transform rotate-1 hover:rotate-0">
                  <CardContent className="p-6">
                    <p className="text-gray-100 mb-4 italic text-lg">
                      "{quote.text}"
                    </p>
                    <p className="text-yellow-400 font-bold">
                      - {quote.author}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Easter Egg Rocket */}
        <motion.div
          className="fixed bottom-10 right-10 cursor-pointer z-40"
          whileHover={{ scale: 1.2, rotate: 15 }}
          whileTap={{ scale: 0.8 }}
          onClick={() => {
            // Trigger rocket animation
          }}
        >
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-red-500/50 transition-all duration-300">
            <Rocket className="w-8 h-8 text-white" />
          </div>
        </motion.div>

        {/* Parents & Mentors Footer */}
        <footer className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-12 mt-16">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-3xl font-bold text-center mb-8 text-cyan-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Parents & Mentors Corner
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  Safe Environment
                </h3>
                <p className="text-gray-300">
                  Supervised activities with background-checked mentors and
                  secure online spaces.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4 text-cyan-300">
                  Educational Focus
                </h3>
                <p className="text-gray-300">
                  Curriculum-aligned activities that complement school learning
                  and build real skills.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4 text-green-300">
                  Community Support
                </h3>
                <p className="text-gray-300">
                  Connect with other families and find resources for continued
                  learning at home.
                </p>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-bold mb-4 text-white">
                    Contact Us
                  </h4>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      hello@jengacode.org
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      (555) 123-CODE
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Innovation Hub, Tech City
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-4 text-white">
                    Stay Updated
                  </h4>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter your email"
                      className="bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                    />
                    <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white">
                      Subscribe
                    </Button>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8 pt-8 border-t border-gray-700">
                <p className="text-gray-400">
                  © 2025 JengaCode. Building the future, one young mind at a
                  time. 🚀
                </p>
              </div>
            </div>
          </div>
        </footer>
        {/* Modals */}
        <AnimatePresence>
          {activeModal === "about" && (
            <Modal
              key="about-modal"
              isOpen={true}
              onClose={() => setActiveModal(null)}
              title="What Is JengaCode?"
            >
              <div className="text-white space-y-6">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center border-4 border-cyan-300">
                    <span className="text-white font-bold text-3xl">
                      {"<J>"}
                    </span>
                  </div>
                </div>
                <p className="text-lg text-gray-300 leading-relaxed">
                  JengaCode is a revolutionary tech and innovation hub designed
                  specifically for young minds aged 5 to 17. We believe that
                  every child has the potential to be a creator, innovator, and
                  problem-solver.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-purple-600/20 to-purple-700/20 p-6 rounded-xl border border-purple-500/30">
                    <h3 className="text-xl font-bold text-purple-300 mb-3">
                      Our Mission
                    </h3>
                    <p className="text-gray-300">
                      To empower the next generation with coding skills,
                      creative thinking, and technological literacy through
                      hands-on learning experiences.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-cyan-600/20 to-cyan-700/20 p-6 rounded-xl border border-cyan-500/30">
                    <h3 className="text-xl font-bold text-cyan-300 mb-3">
                      Our Vision
                    </h3>
                    <p className="text-gray-300">
                      A world where every young person has the tools and
                      confidence to shape the future through technology and
                      innovation.
                    </p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-6 rounded-xl border border-yellow-500/30">
                  <h3 className="text-xl font-bold text-yellow-300 mb-3">
                    What Makes Us Special
                  </h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• Age-appropriate curriculum for every skill level</li>
                    <li>• Hands-on projects with real-world applications</li>
                    <li>• Expert mentors and industry professionals</li>
                    <li>
                      • Safe, inclusive, and inspiring learning environment
                    </li>
                    <li>
                      • Community of young innovators supporting each other
                    </li>
                  </ul>
                </div>
              </div>
            </Modal>
          )}

          {activeModal === "events" && (
            <Modal
              key="events-modal"
              isOpen={true}
              onClose={() => setActiveModal(null)}
              title="Upcoming Events"
            >
              <div className="space-y-6">
                {upcomingEvents.map((event, index) => (
                  <div
                    key={`event-${index}`}
                    className="bg-gradient-to-br from-slate-700 to-slate-600 p-6 rounded-xl border border-purple-500/30"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-cyan-300 mb-2">
                          {event.title}
                        </h3>
                        <p className="text-purple-300 text-lg">
                          {event.date} • {event.time}
                        </p>
                      </div>
                      {event.featured && (
                        <div className="bg-yellow-400 text-yellow-900 rounded-full px-3 py-1 text-sm font-bold">
                          ⭐ Featured
                        </div>
                      )}
                    </div>
                    <p className="text-gray-300 mb-4">{event.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full">
                        {event.ageGroup}
                      </span>
                      <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white rounded-full">
                        Register Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Modal>
          )}

          {activeModal === "age-groups" && (
            <Modal
              key="age-groups-modal"
              isOpen={true}
              onClose={() => setActiveModal(null)}
              title="Choose Your Adventure Path"
            >
              <div className="grid md:grid-cols-3 gap-6">
                {ageGroups.map((group, index) => (
                  <div
                    key={`age-group-${group.id}`}
                    className={`bg-gradient-to-br ${group.color} p-6 rounded-xl text-white cursor-pointer hover:scale-105 transition-transform`}
                    onClick={() => setSelectedAgeGroup(group.id)}
                  >
                    <div className="text-center">
                      <div className="text-5xl mb-4">{group.icon}</div>
                      <h3 className="text-2xl font-bold mb-2">{group.title}</h3>
                      <p className="text-lg opacity-90 mb-4">
                        {group.subtitle}
                      </p>
                      <p className="mb-6 opacity-80">{group.description}</p>
                      <div className="space-y-2">
                        {group.projects.map((project, i) => (
                          <div
                            key={`project-${group.id}-${i}`}
                            className="bg-white/20 rounded-full px-3 py-1 text-sm"
                          >
                            {project}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {selectedAgeGroup && (
                <div className="mt-6 p-6 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-xl border border-green-500/30">
                  <h3 className="text-xl font-bold text-green-300 mb-3">
                    🎉 Great Choice!
                  </h3>
                  <p className="text-gray-300">
                    You've selected the{" "}
                    {ageGroups.find((g) => g.id === selectedAgeGroup)?.title}{" "}
                    path! This adventure is perfect for building skills step by
                    step while having tons of fun.
                  </p>
                  <Button className="mt-4 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white rounded-full">
                    Start Your Journey
                  </Button>
                </div>
              )}
            </Modal>
          )}

          {showEventSchedule && (
            <Modal
              key="event-schedule-modal"
              isOpen={true}
              onClose={() => setShowEventSchedule(false)}
              title="Summer Coding Camp Schedule"
            >
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full font-bold text-lg">
                    🏕️ August 8th - 9th, 2025
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-purple-600/20 to-purple-700/20 p-6 rounded-xl border border-purple-500/30">
                    <h3 className="text-2xl font-bold text-purple-300 mb-4">
                      Day 1 - August 8th
                    </h3>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex justify-between">
                        <span className="font-semibold">9:00 AM</span>
                        <span>Registration & Welcome</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">9:30 AM</span>
                        <span>Icebreaker Games</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">10:00 AM</span>
                        <span>Scratch Programming Basics</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">12:00 PM</span>
                        <span>Lunch Break</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">1:00 PM</span>
                        <span>Robotics Workshop</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">3:00 PM</span>
                        <span>Project Showcase Prep</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">4:00 PM</span>
                        <span>Day 1 Wrap-up</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-cyan-600/20 to-cyan-700/20 p-6 rounded-xl border border-cyan-500/30">
                    <h3 className="text-2xl font-bold text-cyan-300 mb-4">
                      Day 2 - August 9th
                    </h3>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex justify-between">
                        <span className="font-semibold">9:00 AM</span>
                        <span>Morning Energizer</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">9:30 AM</span>
                        <span>Web Development Intro</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">11:00 AM</span>
                        <span>Team Project Time</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">12:00 PM</span>
                        <span>Lunch Break</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">1:00 PM</span>
                        <span>Final Project Polish</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">2:30 PM</span>
                        <span>Project Presentations</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">3:30 PM</span>
                        <span>Awards & Certificates</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">4:00 PM</span>
                        <span>Closing Ceremony</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 p-6 rounded-xl border border-green-500/30">
                  <h3 className="text-xl font-bold text-green-300 mb-3">
                    What to Bring
                  </h3>
                  <ul className="text-gray-300 space-y-1">
                    <li>• Laptop or tablet (we'll provide if needed)</li>
                    <li>• Lunch and snacks</li>
                    <li>• Water bottle</li>
                    <li>• Notebook and pen</li>
                    <li>• Your creativity and enthusiasm!</li>
                  </ul>
                </div>

                <div className="text-center">
                  <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-3 rounded-full font-bold text-lg">
                    Register for Camp Now!
                  </Button>
                </div>
              </div>
            </Modal>
          )}

          {challenges.map(
            (challenge, index) =>
              activeModal === `challenge-${index}` && (
                <Modal
                  key={`challenge-modal-${index}`}
                  isOpen={true}
                  onClose={() => setActiveModal(null)}
                  title={challenge.title}
                >
                  <div className="text-center">
                    <div className="text-6xl mb-6">{challenge.icon}</div>
                    <p className="text-xl text-gray-300 mb-6">
                      {challenge.description}
                    </p>
                    <div className="mb-6">
                      <span
                        className={`px-4 py-2 rounded-full text-lg font-bold ${
                          challenge.difficulty === "Easy"
                            ? "bg-green-500/20 text-green-300"
                            : challenge.difficulty === "Medium"
                              ? "bg-yellow-500/20 text-yellow-300"
                              : "bg-blue-500/20 text-blue-300"
                        }`}
                      >
                        Difficulty: {challenge.difficulty}
                      </span>
                    </div>
                    <div className="bg-gradient-to-br from-slate-700 to-slate-600 p-8 rounded-xl border border-cyan-500/30 mb-6">
                      <h3 className="text-xl font-bold text-cyan-300 mb-4">
                        Challenge Preview
                      </h3>
                      <p className="text-gray-300 mb-4">
                        This is where the interactive challenge would load. In
                        the full version, you'd see:
                      </p>
                      <ul className="text-gray-300 text-left space-y-2">
                        <li>• Interactive coding interface</li>
                        <li>• Step-by-step instructions</li>
                        <li>• Hints and tips system</li>
                        <li>• Progress tracking</li>
                        <li>• Achievement badges</li>
                      </ul>
                    </div>
                    <div className="flex gap-4 justify-center">
                      <Button className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white rounded-full px-6 py-3">
                        Start Challenge
                      </Button>
                      <Button
                        onClick={() => setActiveModal(null)}
                        className="bg-gray-600 hover:bg-gray-700 text-white rounded-full px-6 py-3"
                      >
                        Maybe Later
                      </Button>
                    </div>
                  </div>
                </Modal>
              ),
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
