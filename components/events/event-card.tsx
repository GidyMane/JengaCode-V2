"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Event } from "@/types/event";
import { formatDate, getCategoryDisplay } from "@/lib/events";
import { useAuth } from "@/lib/auth";
import { attendanceService } from "@/lib/attendance";
import { Calendar, MapPin, Users, Clock, Star, CheckCircle, UserPlus } from "lucide-react";
import Image from "next/image";
import React from "react";

interface EventCardProps {
  event: Event;
  onViewDetails: (event: Event) => void;
}

export function EventCard({ event, onViewDetails }: EventCardProps) {
  const { user } = useAuth();
  const featuredImage =
    event.images.find((img) => img.featured) || event.images[0];

  const isRegistered = user ? attendanceService.isUserRegistered(user.id, event.id) : false;
  const hasAttended = user ? attendanceService.hasUserAttended(user.id, event.id) : false;
  const isEventPast = new Date(event.date) < new Date();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="h-full bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-0 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900">
        {/* Event Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={featuredImage.url}
            alt={featuredImage.alt}
            fill
            className="object-cover transition-transform duration-300 hover:scale-110"
          />
          {event.featured && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-gradient-to-r from-jengacode-yellow to-orange-500 text-white border-0">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <Badge
              variant="secondary"
              className="bg-white/90 text-jengacode-purple font-medium"
            >
              {getCategoryDisplay(event.category)}
            </Badge>
          </div>
        </div>

        <CardContent className="p-6 flex flex-col h-full">
          {/* Event Title */}
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 line-clamp-2">
            {event.title}
          </h3>

          {/* Event Description */}
          <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3 flex-grow">
            {event.shortDescription}
          </p>

          {/* Event Details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
              <Calendar className="w-4 h-4 mr-2 text-jengacode-purple" />
              {formatDate(event.date)}
            </div>
            <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
              <MapPin className="w-4 h-4 mr-2 text-jengacode-cyan" />
              {event.location}
            </div>
            <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
              <Clock className="w-4 h-4 mr-2 text-jengacode-yellow" />
              {event.duration}
            </div>
            <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-jengacode-purple" />
                {event.attendees.length} participants
              </div>
              {user && (
                <div className="flex space-x-1">
                  {hasAttended && (
                    <Badge className="bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/50 text-xs">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Attended
                    </Badge>
                  )}
                  {isRegistered && !hasAttended && (
                    <Badge className="bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/50 text-xs">
                      <UserPlus className="w-3 h-3 mr-1" />
                      Registered
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Activities Preview */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {event.activities.slice(0, 3).map((activity) => (
                <Badge
                  key={activity.id}
                  variant="outline"
                  className="text-xs border-jengacode-cyan/30 text-jengacode-cyan"
                >
                  {activity.icon} {activity.name}
                </Badge>
              ))}
              {event.activities.length > 3 && (
                <Badge variant="outline" className="text-xs text-slate-500">
                  +{event.activities.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          {/* View Details Button */}
          <Button
            onClick={() => onViewDetails(event)}
            className="w-full bg-gradient-to-r from-jengacode-purple to-jengacode-cyan hover:from-jengacode-purple-light hover:to-jengacode-cyan-light text-white transition-all duration-300"
          >
            View Details
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
