"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FixTheRobotChallenge } from "@/components/challenges/fix-the-robot";
import { LogicPuzzleChallenge } from "@/components/challenges/logic-puzzle";
import { CodeBuilderChallenge } from "@/components/challenges/code-builder";
import {
  ArrowLeft,
  Brain,
  Code,
  Puzzle,
  Star,
  Trophy,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function ChallengesPage() {
  const [activeChallenge, setActiveChallenge] = useState<string | null>(null);

  const challenges = [
    {
      id: "fix-the-robot",
      title: "Fix the Robot",
      description: "Help our robot friend find the missing code blocks!",
      difficulty: "Easy",
      icon: "🤖",
      color: "from-blue-500 to-cyan-500",
      component: FixTheRobotChallenge,
      skills: ["Sequential Thinking", "Problem Solving", "Basic Programming"],
    },
    {
      id: "logic-puzzle",
      title: "Logic Puzzle",
      description: "Solve today's brain-bending coding challenge!",
      difficulty: "Medium",
      icon: "🧩",
      color: "from-purple-500 to-pink-500",
      component: LogicPuzzleChallenge,
      skills: ["Pattern Recognition", "Logic", "Critical Thinking"],
    },
    {
      id: "code-builder",
      title: "Code Builder",
      description: "Drag and drop to create your first program!",
      difficulty: "Beginner",
      icon: "🧱",
      color: "from-green-500 to-teal-500",
      component: CodeBuilderChallenge,
      skills: ["Visual Programming", "Algorithms", "Variables"],
    },
  ];

  const ActiveChallengeComponent = activeChallenge
    ? challenges.find((c) => c.id === activeChallenge)?.component
    : null;

  if (activeChallenge && ActiveChallengeComponent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-cyan-500 text-white">
        <div className="pt-20">
          <div className="px-6 py-4">
            <Button
              onClick={() => setActiveChallenge(null)}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Challenges
            </Button>
          </div>
          <ActiveChallengeComponent />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-cyan-500 text-white">
      <div className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="px-6 py-16 text-center">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-24 h-24 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center border-4 border-cyan-300 mx-auto mb-8">
              <Zap className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Coding Challenges
            </h1>
            <p className="text-xl md:text-2xl text-cyan-200 max-w-3xl mx-auto leading-relaxed">
              Test your skills, solve puzzles, and learn programming concepts
              through interactive challenges!
            </p>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="px-6 py-8 bg-gradient-to-r from-slate-900/50 to-purple-900/50">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <div className="text-3xl font-bold text-cyan-300">3</div>
                <div className="text-gray-300">Interactive Challenges</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="space-y-2"
              >
                <div className="text-3xl font-bold text-purple-300">∞</div>
                <div className="text-gray-300">Attempts to Master</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-2"
              >
                <div className="text-3xl font-bold text-green-300">100%</div>
                <div className="text-gray-300">Fun Guaranteed</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Challenges Grid */}
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Choose Your Challenge
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {challenges.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="cursor-pointer"
                >
                  <Card
                    className={`bg-gradient-to-br ${challenge.color} border-0 shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 h-full`}
                  >
                    <CardContent className="p-8 text-center text-white relative overflow-hidden">
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-4 right-4 text-6xl">
                          {challenge.icon}
                        </div>
                      </div>

                      <div className="relative z-10">
                        <div className="text-5xl mb-4">{challenge.icon}</div>
                        <h3 className="text-2xl font-bold mb-2">
                          {challenge.title}
                        </h3>
                        <p className="text-lg opacity-90 mb-4">
                          {challenge.description}
                        </p>

                        <div className="mb-6">
                          <Badge
                            variant="outline"
                            className={`border-white/30 text-white ${
                              challenge.difficulty === "Easy"
                                ? "bg-green-500/20"
                                : challenge.difficulty === "Medium"
                                  ? "bg-yellow-500/20"
                                  : "bg-blue-500/20"
                            }`}
                          >
                            {challenge.difficulty}
                          </Badge>
                        </div>

                        <div className="space-y-2 mb-6">
                          <h4 className="text-sm font-semibold opacity-80">
                            You'll learn:
                          </h4>
                          {challenge.skills.map((skill, skillIndex) => (
                            <div
                              key={skillIndex}
                              className="bg-white/20 rounded-full px-3 py-1 text-sm"
                            >
                              {skill}
                            </div>
                          ))}
                        </div>

                        <Button
                          onClick={() => setActiveChallenge(challenge.id)}
                          className="bg-white/20 hover:bg-white/30 text-white border-0 rounded-full w-full py-3 font-bold"
                        >
                          Start Challenge
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="px-6 py-16 bg-gradient-to-r from-slate-900/50 to-purple-900/50">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="text-3xl font-bold text-center mb-8 text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Tips for Success
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-cyan-500/30 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Brain className="w-8 h-8 text-cyan-400 mr-3" />
                      <h3 className="text-xl font-bold text-cyan-300">
                        Think Step by Step
                      </h3>
                    </div>
                    <p className="text-gray-300">
                      Break down each challenge into smaller parts. What needs
                      to happen first? What comes next? Programming is all about
                      solving problems one step at a time.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-purple-500/30 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Trophy className="w-8 h-8 text-purple-400 mr-3" />
                      <h3 className="text-xl font-bold text-purple-300">
                        Don't Give Up!
                      </h3>
                    </div>
                    <p className="text-gray-300">
                      Every programmer makes mistakes and gets stuck sometimes.
                      The secret is to keep trying, use the hints, and learn
                      from each attempt. You've got this!
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="px-6 py-16">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Ready for More?
            </h2>
            <p className="text-xl text-cyan-200 mb-8">
              Love these challenges? Join our community for more coding
              adventures!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/events">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                  <Star className="mr-2 w-5 h-5" />
                  Join Events
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                  <Code className="mr-2 w-5 h-5" />
                  Get Started
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
