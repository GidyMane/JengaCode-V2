"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { getUpcomingEvents, getPastEvents } from "@/lib/events";
import type { Event } from "@/lib/events";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events - JengaCode Workshops & Bootcamps",
  description:
    "Explore upcoming and past JengaCode events including coding bootcamps, robotics workshops, and tech challenges.",
  keywords: "events, workshops, bootcamps, robotics, coding challenges, JengaCode",
};

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  const upcomingEvents = getUpcomingEvents();
  const pastEvents = getPastEvents();
  const displayEvents = activeTab === "upcoming" ? upcomingEvents : pastEvents;

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
            Events & Workshops
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-cyan-100 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Join us for exciting coding bootcamps, robotics workshops, and
            innovation challenges. Explore upcoming events or relive past
            adventures!
          </motion.p>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="px-6 py-12 bg-gradient-to-r from-slate-900/50 to-purple-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {[
              { id: "upcoming", label: "Upcoming Events", icon: "📅" },
              { id: "past", label: "Past Events", icon: "🎉" },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "upcoming" | "past")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-3 rounded-full font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/25"
                    : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                }`}
              >
                {tab.icon} {tab.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Events Count */}
          <motion.p
            className="text-center text-gray-300 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {displayEvents.length} event{displayEvents.length !== 1 ? "s" : ""}
            {activeTab === "upcoming" ? " coming up" : " completed"}
          </motion.p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          {displayEvents.length === 0 ? (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-xl text-gray-300">
                {activeTab === "upcoming"
                  ? "No upcoming events at the moment. Check back soon!"
                  : "No past events to display."}
              </p>
            </motion.div>
          ) : (
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {displayEvents.map((event) => (
                <motion.div key={event.id} variants={itemVariants}>
                  <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-cyan-500/30 hover:border-cyan-400 transition-all overflow-hidden h-full hover:shadow-lg hover:shadow-cyan-500/25">
                    <CardContent className="p-6 h-full flex flex-col">
                      {/* Header */}
                      <div className="mb-4">
                        <div className="flex items-start justify-between mb-3">
                          <span className="text-xs font-semibold text-cyan-300 bg-cyan-500/20 px-2 py-1 rounded">
                            {event.category}
                          </span>
                          {event.featured && (
                            <span className="text-xl">⭐</span>
                          )}
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2">
                          {event.title}
                        </h3>

                        <p className="text-sm text-gray-300">
                          {event.description}
                        </p>
                      </div>

                      {/* Event Details */}
                      <div className="space-y-3 mb-6 text-sm text-gray-300">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-cyan-400" />
                          <span>{event.date}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-cyan-400" />
                          <span>
                            {event.time}
                            {event.endTime && ` - ${event.endTime}`}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-cyan-400" />
                          <span>{event.location}</span>
                        </div>

                        {event.capacity && (
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-cyan-400" />
                            <span>
                              {event.registered || 0} / {event.capacity} registered
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Age Groups */}
                      <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                          {event.ageGroup.map((age, i) => (
                            <span
                              key={i}
                              className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded"
                            >
                              {age}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div className="mt-auto">
                        <motion.button
                          onClick={() => setSelectedEvent(event)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold py-2 rounded-full transition-all"
                        >
                          View Details
                        </motion.button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Event Detail Modal */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-800 to-slate-700 border border-cyan-500/30 text-white">
          {selectedEvent && (
            <>
              <DialogHeader>
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-semibold text-cyan-300 bg-cyan-500/20 px-2 py-1 rounded">
                      {selectedEvent.category}
                    </span>
                    {selectedEvent.featured && (
                      <span className="text-sm font-semibold text-yellow-300 bg-yellow-500/20 px-2 py-1 rounded">
                        ⭐ Featured
                      </span>
                    )}
                  </div>
                  <DialogTitle className="text-3xl font-bold">
                    {selectedEvent.title}
                  </DialogTitle>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-lg font-bold text-cyan-300 mb-2">
                    About This Event
                  </h3>
                  <p className="text-gray-200 leading-relaxed">
                    {selectedEvent.fullDescription}
                  </p>
                </div>

                {/* Event Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-700/50 p-4 rounded-lg border border-cyan-500/20">
                    <p className="text-xs text-gray-400 mb-1">Date</p>
                    <p className="font-semibold text-white">{selectedEvent.date}</p>
                  </div>
                  <div className="bg-slate-700/50 p-4 rounded-lg border border-cyan-500/20">
                    <p className="text-xs text-gray-400 mb-1">Time</p>
                    <p className="font-semibold text-white">
                      {selectedEvent.time}
                      {selectedEvent.endTime && ` - ${selectedEvent.endTime}`}
                    </p>
                  </div>
                  <div className="bg-slate-700/50 p-4 rounded-lg border border-cyan-500/20">
                    <p className="text-xs text-gray-400 mb-1">Location</p>
                    <p className="font-semibold text-white">
                      {selectedEvent.location}
                    </p>
                  </div>
                  <div className="bg-slate-700/50 p-4 rounded-lg border border-cyan-500/20">
                    <p className="text-xs text-gray-400 mb-1">Age Group</p>
                    <p className="font-semibold text-white">
                      {selectedEvent.ageGroup.join(", ")}
                    </p>
                  </div>
                </div>

                {/* Capacity Info */}
                {selectedEvent.capacity && (
                  <div>
                    <h3 className="text-lg font-bold text-cyan-300 mb-2">
                      Registration
                    </h3>
                    <div className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 p-4 rounded-lg border border-purple-500/30">
                      <p className="text-sm text-gray-200 mb-3">
                        Spots filled: {selectedEvent.registered || 0} /{" "}
                        {selectedEvent.capacity}
                      </p>
                      <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-cyan-500 to-purple-500 h-full transition-all"
                          style={{
                            width: `${((selectedEvent.registered || 0) / selectedEvent.capacity) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Agenda */}
                {selectedEvent.agenda && selectedEvent.agenda.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-cyan-300 mb-3">
                      Agenda
                    </h3>
                    <div className="space-y-2">
                      {selectedEvent.agenda.map((item, i) => (
                        <div
                          key={i}
                          className="flex gap-3 bg-slate-700/50 p-3 rounded-lg border border-cyan-500/20"
                        >
                          <span className="text-cyan-300 font-semibold flex-shrink-0">
                            {item.time}
                          </span>
                          <span className="text-gray-200">{item.activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  {selectedEvent.status === "upcoming" && (
                    <Button className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-2 rounded-full">
                      Register Now
                    </Button>
                  )}
                  <Link href="/contact" className="flex-1">
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-2 rounded-full">
                      Get More Info
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
