"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth";
import { attendanceService } from "@/lib/attendance";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  CheckCircle, 
  UserPlus, 
  UserMinus,
  Loader2 
} from "lucide-react";
import { toast } from "sonner";

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  duration: string;
  shortDescription: string;
}

interface EventRegistrationProps {
  event: Event;
  onRegistrationChange?: () => void;
}

export function EventRegistration({ event, onRegistrationChange }: EventRegistrationProps) {
  const { user } = useAuth();
  const [isRegistered, setIsRegistered] = useState(false);
  const [hasAttended, setHasAttended] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const registered = attendanceService.isUserRegistered(user.id, event.id);
      const attended = attendanceService.hasUserAttended(user.id, event.id);
      setIsRegistered(registered);
      setHasAttended(attended);
    }
  }, [user, event.id]);

  const handleRegister = async () => {
    if (!user) {
      toast.error("Please sign in to register for events");
      return;
    }

    setLoading(true);

    try {
      const result = await attendanceService.registerForEvent(
        user.id,
        user.name,
        user.email,
        event.id,
        event.title,
        event.date
      );

      if (result.success) {
        setIsRegistered(true);
        toast.success("Successfully registered for the event! 🎉");
        onRegistrationChange?.();
      } else {
        toast.error(result.error || "Failed to register for event");
      }
    } catch (error) {
      toast.error("An error occurred while registering");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelRegistration = async () => {
    if (!user) return;

    setLoading(true);

    try {
      const result = await attendanceService.cancelRegistration(user.id, event.id);

      if (result.success) {
        setIsRegistered(false);
        toast.success("Registration cancelled successfully");
        onRegistrationChange?.();
      } else {
        toast.error(result.error || "Failed to cancel registration");
      }
    } catch (error) {
      toast.error("An error occurred while cancelling registration");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isEventPast = new Date(event.date) < new Date();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-purple-500/30 text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-purple-300">
              Event Registration
            </CardTitle>
            {hasAttended && (
              <Badge className="bg-green-500/20 text-green-300 border-green-500/50">
                <CheckCircle className="w-3 h-3 mr-1" />
                Attended
              </Badge>
            )}
            {isRegistered && !hasAttended && (
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/50">
                <UserPlus className="w-3 h-3 mr-1" />
                Registered
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Event Info */}
          <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-lg p-4 border border-purple-500/20">
            <h3 className="text-lg font-semibold text-white mb-3">{event.title}</h3>
            <p className="text-gray-300 mb-4">{event.shortDescription}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center text-gray-300">
                <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                {formatDate(event.date)}
              </div>
              <div className="flex items-center text-gray-300">
                <Clock className="w-4 h-4 mr-2 text-cyan-400" />
                {event.duration}
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="w-4 h-4 mr-2 text-green-400" />
                {event.location}
              </div>
              {user && (
                <div className="flex items-center text-gray-300">
                  <Users className="w-4 h-4 mr-2 text-yellow-400" />
                  Signed in as: {user.name}
                </div>
              )}
            </div>
          </div>

          {/* Registration Status */}
          {!user ? (
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-8 h-8 text-yellow-400" />
              </div>
              <p className="text-yellow-300 font-medium mb-2">
                Sign In Required
              </p>
              <p className="text-gray-400 text-sm">
                Please sign in to register for this event
              </p>
            </div>
          ) : isEventPast ? (
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-300 font-medium mb-2">
                Event Has Ended
              </p>
              <p className="text-gray-400 text-sm">
                This event has already taken place
              </p>
              {hasAttended && (
                <p className="text-green-400 text-sm mt-2">
                  ✓ You attended this event!
                </p>
              )}
            </div>
          ) : hasAttended ? (
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <p className="text-green-300 font-medium mb-2">
                Already Attended
              </p>
              <p className="text-gray-400 text-sm">
                You've already marked attendance for this event! 🎉
              </p>
            </div>
          ) : isRegistered ? (
            <div className="space-y-4">
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <UserPlus className="w-8 h-8 text-blue-400" />
                </div>
                <p className="text-blue-300 font-medium mb-2">
                  You're Registered!
                </p>
                <p className="text-gray-400 text-sm">
                  Don't forget to attend and mark your attendance at the event
                </p>
              </div>
              
              <Button
                onClick={handleCancelRegistration}
                disabled={loading}
                variant="outline"
                className="w-full border-red-500/50 text-red-300 hover:bg-red-500/10"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Cancelling...
                  </>
                ) : (
                  <>
                    <UserMinus className="w-4 h-4 mr-2" />
                    Cancel Registration
                  </>
                )}
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleRegister}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white py-3 rounded-full font-bold"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Registering...
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Register for Event
                </>
              )}
            </Button>
          )}

          {/* Help Text */}
          <div className="text-center">
            <p className="text-xs text-gray-400">
              Questions about registration? Contact our organizers for help.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
