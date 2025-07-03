"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Users,
  Calendar,
  Heart,
  Star,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: "general",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: "hello@jengacode.org",
      description: "We typically respond within 24 hours",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      details: "(555) 123-CODE",
      description: "Monday - Friday, 9 AM - 6 PM EST",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      details: "123 Innovation Hub",
      description: "Tech City, TC 12345",
      color: "from-green-500 to-teal-500",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Office Hours",
      details: "Mon - Fri: 9 AM - 6 PM",
      description: "Weekend workshops available",
      color: "from-orange-500 to-red-500",
    },
  ];

  const contactTypes = [
    { value: "general", label: "General Inquiry", icon: "💬" },
    { value: "enrollment", label: "Enrollment", icon: "🎓" },
    { value: "events", label: "Events & Workshops", icon: "📅" },
    { value: "partnership", label: "Partnerships", icon: "🤝" },
    { value: "volunteer", label: "Volunteer", icon: "❤️" },
    { value: "support", label: "Technical Support", icon: "🔧" },
  ];

  const faqs = [
    {
      question: "What age groups do you serve?",
      answer:
        "We welcome young innovators aged 5-17, with age-appropriate programs for different skill levels.",
    },
    {
      question: "Do you provide equipment?",
      answer:
        "Yes! We provide all necessary computers, tablets, and robotics kits. Students just need to bring their creativity!",
    },
    {
      question: "How do I register for events?",
      answer:
        "You can register through our events page or contact us directly. We'll guide you through the process!",
    },
    {
      question: "What safety measures do you have?",
      answer:
        "All mentors are background-checked, and we maintain safe student-to-mentor ratios. Online activities are supervised and secure.",
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
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      type: "general",
    });
  };

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
              <MessageCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Get In Touch
            </h1>
            <p className="text-xl md:text-2xl text-cyan-200 max-w-3xl mx-auto leading-relaxed">
              Have questions? Want to get involved? We'd love to hear from you!
              Our team is here to help young minds start their coding journey.
            </p>
          </motion.div>
        </section>

        {/* Contact Information */}
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              How to Reach Us
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info, index) => (
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
                        className={`w-16 h-16 bg-gradient-to-r ${info.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white`}
                      >
                        {info.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-white">
                        {info.title}
                      </h3>
                      <p className="text-cyan-300 font-medium mb-2">
                        {info.details}
                      </p>
                      <p className="text-gray-300 text-sm">
                        {info.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="px-6 py-16 bg-gradient-to-r from-slate-900/50 to-purple-900/50">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Send Us a Message
            </motion.h2>

            {submitted ? (
              <motion.div
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-green-300 mb-4">
                  Message Sent Successfully!
                </h3>
                <p className="text-xl text-gray-300 mb-8">
                  Thank you for reaching out! We'll get back to you within 24
                  hours.
                </p>
                <Button
                  onClick={() => setSubmitted(false)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full"
                >
                  Send Another Message
                </Button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-purple-500/30">
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Contact Type Selection */}
                      <div>
                        <Label className="text-white text-lg font-medium mb-4 block">
                          What can we help you with?
                        </Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {contactTypes.map((type) => (
                            <motion.label
                              key={type.value}
                              className={`cursor-pointer p-3 rounded-lg border transition-all duration-300 ${
                                formData.type === type.value
                                  ? "bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-purple-400"
                                  : "bg-slate-700 border-gray-600 hover:border-gray-500"
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <input
                                type="radio"
                                name="type"
                                value={type.value}
                                checked={formData.type === type.value}
                                onChange={handleInputChange}
                                className="sr-only"
                              />
                              <div className="text-center">
                                <div className="text-2xl mb-1">{type.icon}</div>
                                <div className="text-sm text-white font-medium">
                                  {type.label}
                                </div>
                              </div>
                            </motion.label>
                          ))}
                        </div>
                      </div>

                      {/* Name and Email */}
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
                          <Label
                            htmlFor="email"
                            className="text-white font-medium"
                          >
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
                      </div>

                      {/* Subject */}
                      <div>
                        <Label
                          htmlFor="subject"
                          className="text-white font-medium"
                        >
                          Subject *
                        </Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="mt-2 bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                          placeholder="What's this about?"
                        />
                      </div>

                      {/* Message */}
                      <div>
                        <Label
                          htmlFor="message"
                          className="text-white font-medium"
                        >
                          Message *
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={6}
                          className="mt-2 bg-slate-700 border-slate-600 text-white placeholder-gray-400 resize-none"
                          placeholder="Tell us more about how we can help..."
                        />
                      </div>

                      {/* Submit Button */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="mr-2 w-5 h-5" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Frequently Asked Questions
            </motion.h2>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-purple-500/30 hover:border-purple-400 transition-all duration-300">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-purple-300 mb-3">
                        {faq.question}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
