"use client";

import type React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllTeamMembers } from "@/lib/team";
import {
  Heart,
  Lightbulb,
  Users,
  Zap,
  Target,
  Rocket,
  Award,
  Globe,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About JengaCode - Our Mission & Team",
  description:
    "Learn about JengaCode's mission to democratize tech education for young people in Kenya. Meet our team of passionate educators and innovators.",
  keywords:
    "JengaCode, about us, team, mission, vision, values, coding education, Kenya",
};

export default function AboutPage() {
  const teamMembers = getAllTeamMembers();

  const stats = [
    {
      number: "1,500+",
      label: "Students Trained",
      icon: Users,
    },
    {
      number: "50+",
      label: "Schools Partnered",
      icon: Globe,
    },
    {
      number: "5+",
      label: "Counties Reached",
      icon: Target,
    },
    {
      number: "28",
      label: "Expert Mentors",
      icon: Award,
    },
  ];

  const values = [
    {
      title: "Accessibility",
      description:
        "We believe tech education should be available to every young person, regardless of their background or circumstances.",
      icon: Rocket,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Excellence",
      description:
        "We're committed to providing high-quality instruction and curriculum that meets international standards.",
      icon: Zap,
      color: "from-cyan-500 to-blue-500",
    },
    {
      title: "Community",
      description:
        "We foster an inclusive, supportive community where students learn from each other and grow together.",
      icon: Heart,
      color: "from-green-500 to-teal-500",
    },
    {
      title: "Innovation",
      description:
        "We encourage creative thinking, experimentation, and the courage to turn ideas into reality.",
      icon: Lightbulb,
      color: "from-yellow-500 to-orange-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
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
            About JengaCode
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-cyan-100 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            We're on a mission to empower the next generation of tech creators
            and innovators by making coding and robotics education accessible
            to every young person in Kenya.
          </motion.p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-slate-900/50 to-purple-900/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Our Story
            </h2>

            <div className="prose prose-invert max-w-none space-y-6 text-gray-200">
              <p className="text-lg leading-relaxed">
                JengaCode was founded in 2022 with a simple but powerful
                conviction: every young person deserves access to quality tech
                education and the opportunity to become a creator, not just a
                consumer.
              </p>

              <p className="text-lg leading-relaxed">
                Our founder, David Kipchoge, watched brilliant young minds
                across Kenya struggle to access the tools and knowledge needed
                to pursue their passion for technology. Despite the shortage of
                affordable, accessible tech education, he believed something
                different was possible.
              </p>

              <p className="text-lg leading-relaxed">
                What started as weekend coding workshops in a small community
                center has grown into a vibrant ecosystem serving thousands of
                students, partnering with 50+ schools, and employing a team of
                dedicated educators and mentors.
              </p>

              <p className="text-lg leading-relaxed">
                Today, JengaCode is one of Kenya's leading providers of youth
                tech education, known for our innovative curricula, passionate
                mentorship, and unwavering commitment to making tech education
                truly accessible to all young people, regardless of their
                economic circumstances.
              </p>

              <h3 className="text-2xl font-bold text-cyan-300 mt-12 mb-4">
                Key Milestones
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-purple-600/20 to-purple-700/20 p-6 rounded-lg border border-purple-500/30">
                  <p className="text-sm text-purple-300 font-semibold mb-2">
                    2022
                  </p>
                  <p className="text-white">
                    JengaCode founded with first coding workshop for 30 students
                  </p>
                </div>

                <div className="bg-gradient-to-br from-cyan-600/20 to-cyan-700/20 p-6 rounded-lg border border-cyan-500/30">
                  <p className="text-sm text-cyan-300 font-semibold mb-2">
                    2023
                  </p>
                  <p className="text-white">
                    Expanded to 5 schools, trained 300+ students
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-600/20 to-green-700/20 p-6 rounded-lg border border-green-500/30">
                  <p className="text-sm text-green-300 font-semibold mb-2">
                    2024
                  </p>
                  <p className="text-white">
                    Reached 1,500+ students across 50+ schools in Nairobi
                  </p>
                </div>

                <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-700/20 p-6 rounded-lg border border-yellow-500/30">
                  <p className="text-sm text-yellow-300 font-semibold mb-2">
                    2025
                  </p>
                  <p className="text-white">
                    Expansion to 5+ counties across Kenya
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              className="cursor-default"
            >
              <Card className="bg-gradient-to-br from-purple-600/20 to-purple-700/20 border border-purple-500/30 h-full">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-6">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-purple-300">
                    Our Mission
                  </h3>
                  <p className="text-gray-200 leading-relaxed">
                    To empower young people aged 5-17 with coding and robotics
                    skills, fostering creative thinking, problem-solving, and
                    technological literacy that will shape their future success.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              className="cursor-default"
            >
              <Card className="bg-gradient-to-br from-cyan-600/20 to-cyan-700/20 border border-cyan-500/30 h-full">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mb-6">
                    <Rocket className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-cyan-300">
                    Our Vision
                  </h3>
                  <p className="text-gray-200 leading-relaxed">
                    A Kenya where every young person has access to world-class
                    tech education and the confidence to build solutions that
                    transform their communities and the world.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Values */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              className="cursor-default"
            >
              <Card className="bg-gradient-to-br from-green-600/20 to-green-700/20 border border-green-500/30 h-full">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mb-6">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-green-300">
                    Our Values
                  </h3>
                  <p className="text-gray-200 leading-relaxed">
                    Accessibility, Excellence, Community, and Innovation guide
                    everything we do, ensuring we create an inclusive,
                    supportive, and transformative learning environment.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Core Values Details */}
          <motion.h2
            className="text-4xl font-bold mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Core Values
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className={`bg-gradient-to-br ${value.color} bg-opacity-10 border border-opacity-30 hover:border-opacity-50 transition-all`}>
                    <CardContent className="p-8">
                      <div className="flex items-start">
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${value.color} rounded-lg flex items-center justify-center flex-shrink-0 mr-4`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-2 text-white">
                            {value.title}
                          </h3>
                          <p className="text-gray-200">{value.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="px-6 py-20 bg-gradient-to-r from-slate-900/50 to-purple-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl font-bold mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Impact by the Numbers
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-cyan-500/30 hover:border-cyan-400 transition-all text-center">
                    <CardContent className="p-8">
                      <Icon className="w-10 h-10 text-cyan-400 mx-auto mb-4" />
                      <p className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                        {stat.number}
                      </p>
                      <p className="text-gray-300">{stat.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Meet Our Team
          </motion.h2>

          <motion.p
            className="text-center text-gray-300 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Our team consists of passionate educators, experienced developers,
            and innovative thinkers dedicated to transforming tech education.
          </motion.p>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-purple-500/30 hover:border-purple-400 transition-all overflow-hidden h-full">
                  <CardContent className="p-6">
                    <div className="relative w-full h-40 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg mb-4 overflow-hidden flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-4xl mb-2">👤</div>
                        <p className="text-xs text-white/80">{member.name}</p>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm text-cyan-300 font-semibold mb-3">
                      {member.role}
                    </p>

                    <p className="text-sm text-gray-300 mb-4 line-clamp-3">
                      {member.bio}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {member.expertise.slice(0, 2).map((skill, i) => (
                        <span
                          key={i}
                          className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {member.expertise.length > 2 && (
                        <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded-full">
                          +{member.expertise.length - 2} more
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-slate-900/50 to-purple-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to Join the JengaCode Community?
          </motion.h2>

          <motion.p
            className="text-xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Explore our programs, events, and opportunities to learn, grow, and
            create.
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
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full">
                Get In Touch
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
