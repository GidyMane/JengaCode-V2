"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Brain,
  Users,
  Target,
  Sparkles,
  Heart,
  Code,
  Rocket,
  Star,
} from "lucide-react";

export default function AboutPage() {
  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      description: "Former Google engineer passionate about youth education",
      icon: "🚀",
    },
    {
      name: "Michael Chen",
      role: "Head of Curriculum",
      description: "MIT graduate with 10+ years in educational technology",
      icon: "📚",
    },
    {
      name: "Emily Rodriguez",
      role: "Lead Mentor",
      description: "Full-stack developer and coding bootcamp instructor",
      icon: "💻",
    },
    {
      name: "David Kim",
      role: "Community Manager",
      description: "Youth advocate with background in child psychology",
      icon: "🤝",
    },
  ];

  const stats = [
    { number: "2,500+", label: "Young Innovators" },
    { number: "50+", label: "Expert Mentors" },
    { number: "100+", label: "Projects Built" },
    { number: "25+", label: "Partner Schools" },
  ];

  const values = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Learn by Doing",
      description: "Hands-on projects that build real skills and confidence",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community First",
      description: "A supportive environment where everyone can thrive",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Future Ready",
      description: "Skills that prepare young minds for tomorrow's challenges",
      color: "from-green-500 to-teal-500",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Inclusive & Safe",
      description: "A welcoming space for learners from all backgrounds",
      color: "from-orange-500 to-red-500",
    },
  ];

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
            <div className="w-24 h-24 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center border-4 border-cyan-300 mx-auto mb-8">
              <span className="text-white font-bold text-3xl">{"<J>"}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              About JengaCode
            </h1>
            <p className="text-xl md:text-2xl text-cyan-200 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to empower the next generation of innovators,
              creators, and problem-solvers through the magic of coding and
              technology.
            </p>
          </motion.div>
        </section>

        {/* Mission & Vision */}
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-gradient-to-br from-purple-600/20 to-purple-700/20 border border-purple-500/30 h-full">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Target className="w-10 h-10 text-purple-300 mr-4" />
                    <h2 className="text-3xl font-bold text-purple-300">
                      Our Mission
                    </h2>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    To provide a safe, inclusive, and inspiring environment
                    where young minds aged 5-17 can discover their potential
                    through technology. We believe every child has the power to
                    create, innovate, and shape the future.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-cyan-600/20 to-cyan-700/20 border border-cyan-500/30 h-full">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Sparkles className="w-10 h-10 text-cyan-300 mr-4" />
                    <h2 className="text-3xl font-bold text-cyan-300">
                      Our Vision
                    </h2>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    A world where every young person has access to quality tech
                    education, where creativity meets code, and where the next
                    generation leads innovation with confidence and purpose.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="px-6 py-16 bg-gradient-to-r from-slate-900/50 to-purple-900/50">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Our Impact
            </motion.h2>

            <div className="grid md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-4xl md:text-5xl font-bold text-cyan-300 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Our Values
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                >
                  <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-gray-600 hover:border-gray-500 transition-all duration-300 h-full">
                    <CardContent className="p-6 text-center">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white`}
                      >
                        {value.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-white">
                        {value.title}
                      </h3>
                      <p className="text-gray-300">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="px-6 py-16 bg-gradient-to-r from-purple-900/50 to-cyan-900/50">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Meet Our Team
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-purple-500/30 hover:border-purple-400 transition-all duration-300 h-full">
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-4">{member.icon}</div>
                      <h3 className="text-xl font-bold mb-2 text-purple-300">
                        {member.name}
                      </h3>
                      <p className="text-cyan-300 font-medium mb-3">
                        {member.role}
                      </p>
                      <p className="text-gray-300 text-sm">
                        {member.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Ready to Join Our Mission?
            </h2>
            <p className="text-xl text-cyan-200 mb-8">
              Whether you're a young innovator, parent, or educator, there's a
              place for you in the JengaCode community.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/events">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                  <Code className="mr-2 w-5 h-5" />
                  Explore Events
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                  <Heart className="mr-2 w-5 h-5" />
                  Get Involved
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
