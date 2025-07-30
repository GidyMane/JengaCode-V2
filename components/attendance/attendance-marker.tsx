"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import { attendanceService } from "@/lib/attendance";
import { CheckCircle, Clock, Calendar, MapPin, Users, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  duration: string;
}

interface AttendanceMarkerProps {
  event: Event;
  onAttendanceMarked?: () => void;
}

export function AttendanceMarker({ event, onAttendanceMarked }: AttendanceMarkerProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState("");
  const [hasMarked, setHasMarked] = useState(false);

  React.useEffect(() => {
    if (user) {
      const hasAttended = attendanceService.hasUserAttended(user.id, event.id);
      setHasMarked(hasAttended);
    }
  }, [user, event.id]);

  const handleMarkAttendance = async () => {
    if (!user) {
      toast.error("Please sign in to mark attendance");
      return;
    }

    setLoading(true);
    
    try {
      const result = await attendanceService.markAttendance(
        user.id,
        user.name,
        user.email,
        event.id,
        event.title,
        event.date,
        notes.trim() || undefined
      );

      if (result.success) {
        setHasMarked(true);
        toast.success("Attendance marked successfully! 🎉");
        onAttendanceMarked?.();
      } else {
        toast.error(result.error || "Failed to mark attendance");
      }
    } catch (error) {
      toast.error("An error occurred while marking attendance");
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

  if (!user) {
    return (
      <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-yellow-500/30 text-white">
        <CardHeader>
          <CardTitle className="text-center text-yellow-300">
            Sign In Required
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-300 mb-4">
            Please sign in to mark your attendance for this event.
          </p>
          <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white">
            Sign In
          </Button>
        </CardContent>
      </Card>
    );
  }

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
              Mark Attendance
            </CardTitle>
            {hasMarked && (
              <Badge className="bg-green-500/20 text-green-300 border-green-500/50">
                <CheckCircle className="w-3 h-3 mr-1" />
                Attended
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Event Info */}
          <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-lg p-4 border border-purple-500/20">
            <h3 className="text-lg font-semibold text-white mb-3">{event.title}</h3>
            
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
              <div className="flex items-center text-gray-300">
                <Users className="w-4 h-4 mr-2 text-yellow-400" />
                Signed in as: {user.name}
              </div>
            </div>
          </div>

          {/* Notes Section */}
          {!hasMarked && (
            <div>
              <Label htmlFor="notes" className="text-white font-medium">
                Notes (Optional)
              </Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="mt-2 bg-slate-700 border-slate-600 text-white placeholder-gray-400 resize-none"
                placeholder="Any comments about your experience or questions for the organizers..."
                maxLength={500}
              />
              <p className="text-xs text-gray-400 mt-1">
                {notes.length}/500 characters
              </p>
            </div>
          )}

          {/* Action Button */}
          {hasMarked ? (
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <p className="text-green-300 font-medium">
                You've already marked attendance for this event!
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Thank you for participating in JengaCode! 🎉
              </p>
            </div>
          ) : (
            <Button
              onClick={handleMarkAttendance}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white py-3 rounded-full font-bold"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Marking Attendance...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark My Attendance
                </>
              )}
            </Button>
          )}

          {/* Help Text */}
          <div className="text-center">
            <p className="text-xs text-gray-400">
              Having trouble? Contact an organizer for assistance.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
