"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Heart,
  Code,
  Star,
  CheckCircle,
  Calendar,
  Gift,
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";

export default function JoinUsPage() {
  const [selectedMembership, setSelectedMembership] =
    useState<string>("explorer");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    interests: "",
    parentEmail: "",
    experience: "beginner",
  });
  const [submitted, setSubmitted] = useState(false);

  const memberships = [
    {
      id: "explorer",
      title: "Code Explorer",
      subtitle: "Ages 5-8",
      price: "Free",
      duration: "Forever",
      features: [
        "Access to beginner challenges",
        "Monthly virtual workshops",
        "Parent progress reports",
        "Safe online community",
        "Educational resources",
      ],
      color: "from-green-500 to-teal-500",
      icon: "🌟",
      popular: false,
    },
    {
      id: "builder",
      title: "Code Builder",
      subtitle: "Ages 9-12",
      price: "$29",
      duration: "per month",
      features: [
        "All Explorer benefits",
        "Advanced project challenges",
        "Weekly live coding sessions",
        "1-on-1 mentor support",
        "Project showcase platform",
        "Summer camp discounts",
      ],
      color: "from-blue-500 to-purple-500",
      icon: "🚀",
      popular: true,
    },
    {
      id: "innovator",
      title: "Code Innovator",
      subtitle: "Ages 13-17",
      price: "$49",
      duration: "per month",
      features: [
        "All Builder benefits",
        "Real-world project opportunities",
        "Industry mentor connections",
        "Internship program access",
        "College prep coding courses",
        "Leadership development",
      ],
      color: "from-purple-500 to-pink-500",
      icon: "💎",
      popular: false,
    },
  ];

  const benefits = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Learn by Doing",
      description:
        "Hands-on projects and interactive challenges that make coding fun and engaging.",
      color: "text-cyan-400",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Expert Mentors",
      description:
        "Learn from industry professionals who are passionate about teaching young minds.",
      color: "text-purple-400",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Safe Community",
      description:
        "A secure, supervised environment where kids can learn and grow together.",
      color: "text-pink-400",
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Personal Growth",
      description:
        "Build confidence, problem-solving skills, and prepare for the future.",
      color: "text-yellow-400",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-cyan-500 text-white flex items-center justify-center">
        <motion.div
          className="max-w-md mx-4 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Welcome to JengaCode!
          </h1>
          <p className="text-xl text-cyan-200 mb-6">
            Your application has been submitted successfully! We'll be in touch
            within 24 hours.
          </p>
          <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-green-500/30">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-green-300 mb-3">
                What's Next?
              </h3>
              <ul className="text-gray-300 space-y-2 text-left">
                <li>• Check your email for welcome instructions</li>
                <li>• Join our orientation session this weekend</li>
                <li>• Download the JengaCode learning app</li>
                <li>• Start your first coding challenge!</li>
              </ul>
            </CardContent>
          </Card>
          <div className="mt-6">
            <Button
              onClick={() => (window.location.href = "/")}
              className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white px-8 py-3 rounded-full"
            >
              Return Home
            </Button>
          </div>
        </motion.div>
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
              <Users className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Join JengaCode
            </h1>
            <p className="text-xl md:text-2xl text-cyan-200 max-w-3xl mx-auto leading-relaxed">
              Start your coding journey today! Join thousands of young
              innovators learning to code, create, and change the world.
            </p>
          </motion.div>
        </section>

        {/* Benefits Section */}
        <section className="px-6 py-16 bg-gradient-to-r from-slate-900/50 to-purple-900/50">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Why Choose JengaCode?
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-gray-600 hover:border-gray-500 transition-all duration-300 h-full">
                    <CardContent className="p-6 text-center">
                      <div className={`${benefit.color} mb-4`}>
                        {benefit.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-white">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-300">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Membership Plans */}
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Choose Your Adventure
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {memberships.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer relative"
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-yellow-900 font-bold px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <Card
                    className={`bg-gradient-to-br ${plan.color} border-0 shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 h-full ${
                      selectedMembership === plan.id
                        ? "ring-4 ring-yellow-400"
                        : ""
                    }`}
                    onClick={() => setSelectedMembership(plan.id)}
                  >
                    <CardContent className="p-8 text-center text-white relative">
                      <div className="text-5xl mb-4">{plan.icon}</div>
                      <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                      <p className="text-lg opacity-90 mb-4">{plan.subtitle}</p>

                      <div className="mb-6">
                        <div className="text-4xl font-bold">{plan.price}</div>
                        <div className="text-sm opacity-80">
                          {plan.duration}
                        </div>
                      </div>

                      <div className="space-y-3 mb-6 text-left">
                        {plan.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Button
                        className={`w-full ${
                          selectedMembership === plan.id
                            ? "bg-yellow-400 text-yellow-900 hover:bg-yellow-300"
                            : "bg-white/20 hover:bg-white/30 text-white"
                        } border-0 rounded-full py-3 font-bold transition-all`}
                      >
                        {selectedMembership === plan.id
                          ? "Selected"
                          : "Choose Plan"}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Registration Form */}
        <section className="px-6 py-16 bg-gradient-to-r from-slate-900/50 to-purple-900/50">
          <div className="max-w-2xl mx-auto">
            <motion.h2
              className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Start Your Journey
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-purple-500/30">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label
                          htmlFor="name"
                          className="text-white font-medium"
                        >
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="mt-2 bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="age" className="text-white font-medium">
                          Age *
                        </Label>
                        <Input
                          id="age"
                          name="age"
                          type="number"
                          min="5"
                          max="17"
                          value={formData.age}
                          onChange={handleInputChange}
                          required
                          className="mt-2 bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                          placeholder="Your age"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-white font-medium">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="mt-2 bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="parentEmail"
                        className="text-white font-medium"
                      >
                        Parent/Guardian Email *
                      </Label>
                      <Input
                        id="parentEmail"
                        name="parentEmail"
                        type="email"
                        value={formData.parentEmail}
                        onChange={handleInputChange}
                        required
                        className="mt-2 bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                        placeholder="parent@example.com"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="experience"
                        className="text-white font-medium"
                      >
                        Coding Experience
                      </Label>
                      <select
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="mt-2 w-full bg-slate-700 border border-slate-600 text-white rounded-md px-3 py-2"
                      >
                        <option value="beginner">Complete Beginner</option>
                        <option value="some">Some Experience</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div>

                    <div>
                      <Label
                        htmlFor="interests"
                        className="text-white font-medium"
                      >
                        What interests you most about coding?
                      </Label>
                      <Textarea
                        id="interests"
                        name="interests"
                        value={formData.interests}
                        onChange={handleInputChange}
                        rows={4}
                        className="mt-2 bg-slate-700 border-slate-600 text-white placeholder-gray-400 resize-none"
                        placeholder="Tell us what excites you about programming..."
                      />
                    </div>

                    <div className="text-center">
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                      >
                        <Sparkles className="mr-2 w-5 h-5" />
                        Join JengaCode Now!
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              className="text-3xl font-bold mb-8 text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Questions? We're Here to Help!
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Mail className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <p className="text-gray-300 text-sm">hello@jengacode.org</p>
              </motion.div>
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Phone className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <p className="text-gray-300 text-sm">(555) 123-CODE</p>
              </motion.div>
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <MapPin className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <p className="text-gray-300 text-sm">
                  Tech City Innovation Hub
                </p>
              </motion.div>
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <Clock className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <p className="text-gray-300 text-sm">Mon-Fri: 9 AM - 6 PM</p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
