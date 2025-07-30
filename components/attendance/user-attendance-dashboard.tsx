"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { attendanceService, AttendanceRecord, AttendanceStats, EventRegistration } from "@/lib/attendance";
import { Calendar, TrendingUp, Award, Clock, MapPin, CheckCircle, X } from "lucide-react";

export function UserAttendanceDashboard() {
  const { user } = useAuth();
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [stats, setStats] = useState<AttendanceStats>({
    totalEvents: 0,
    attendedEvents: 0,
    missedEvents: 0,
    attendanceRate: 0,
  });

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = () => {
    if (!user) return;

    const userAttendance = attendanceService.getUserAttendance(user.id);
    const userRegistrations = attendanceService.getUserRegistrations(user.id);
    const userStats = attendanceService.getUserAttendanceStats(user.id);

    setAttendanceRecords(userAttendance);
    setRegistrations(userRegistrations);
    setStats(userStats);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getAttendanceColor = (rate: number) => {
    if (rate >= 80) return "text-green-400";
    if (rate >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getAttendanceBadgeColor = (rate: number) => {
    if (rate >= 80) return "bg-green-500/20 text-green-300 border-green-500/50";
    if (rate >= 60) return "bg-yellow-500/20 text-yellow-300 border-yellow-500/50";
    return "bg-red-500/20 text-red-300 border-red-500/50";
  };

  if (!user) {
    return (
      <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-yellow-500/30 text-white">
        <CardHeader>
          <CardTitle className="text-center text-yellow-300">
            Please Sign In
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-300">
            Sign in to view your attendance dashboard and track your progress.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
          My Attendance Dashboard
        </h2>
        <p className="text-gray-300">Track your participation in JengaCode events</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-purple-600/20 to-purple-700/20 border border-purple-500/30 text-white">
            <CardContent className="p-6 text-center">
              <Calendar className="w-8 h-8 mx-auto mb-3 text-purple-400" />
              <div className="text-2xl font-bold text-white">{stats.totalEvents}</div>
              <div className="text-sm text-gray-300">Registered Events</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-green-600/20 to-green-700/20 border border-green-500/30 text-white">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-8 h-8 mx-auto mb-3 text-green-400" />
              <div className="text-2xl font-bold text-white">{stats.attendedEvents}</div>
              <div className="text-sm text-gray-300">Events Attended</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-red-600/20 to-red-700/20 border border-red-500/30 text-white">
            <CardContent className="p-6 text-center">
              <X className="w-8 h-8 mx-auto mb-3 text-red-400" />
              <div className="text-2xl font-bold text-white">{stats.missedEvents}</div>
              <div className="text-sm text-gray-300">Missed Events</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-cyan-600/20 to-cyan-700/20 border border-cyan-500/30 text-white">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-3 text-cyan-400" />
              <div className={`text-2xl font-bold ${getAttendanceColor(stats.attendanceRate)}`}>
                {stats.attendanceRate}%
              </div>
              <div className="text-sm text-gray-300">Attendance Rate</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Achievement Badge */}
      {stats.attendanceRate > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Badge className={`${getAttendanceBadgeColor(stats.attendanceRate)} px-4 py-2 text-lg`}>
            <Award className="w-4 h-4 mr-2" />
            {stats.attendanceRate >= 90 ? "Perfect Attendee" :
             stats.attendanceRate >= 80 ? "Excellent Attendee" :
             stats.attendanceRate >= 60 ? "Good Attendee" : "Getting Started"}
          </Badge>
        </motion.div>
      )}

      {/* Recent Attendance */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-purple-500/30 text-white">
        <CardHeader>
          <CardTitle className="text-xl text-purple-300">Recent Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          {attendanceRecords.length > 0 ? (
            <div className="space-y-4">
              {attendanceRecords
                .sort((a, b) => new Date(b.checkInTime).getTime() - new Date(a.checkInTime).getTime())
                .slice(0, 5)
                .map((record) => (
                  <motion.div
                    key={record.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-lg p-4 border border-purple-500/20"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-white">{record.eventTitle}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-300 mt-1">
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(record.eventDate)}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            Checked in at {formatTime(record.checkInTime)}
                          </div>
                        </div>
                        {record.notes && (
                          <p className="text-sm text-gray-400 mt-2 italic">
                            "{record.notes}"
                          </p>
                        )}
                      </div>
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/50">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {record.status === "checked-out" ? "Completed" : "Attended"}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-300">No attendance records yet</p>
              <p className="text-sm text-gray-400">
                Start attending events to see your progress here!
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upcoming Registrations */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-cyan-500/30 text-white">
        <CardHeader>
          <CardTitle className="text-xl text-cyan-300">Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          {registrations.length > 0 ? (
            <div className="space-y-4">
              {registrations
                .filter(reg => new Date(reg.eventDate) >= new Date())
                .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime())
                .map((registration) => {
                  const hasAttended = attendanceService.hasUserAttended(user.id, registration.eventId);
                  return (
                    <motion.div
                      key={registration.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg p-4 border border-cyan-500/20"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-white">{registration.eventTitle}</h4>
                          <div className="flex items-center text-sm text-gray-300 mt-1">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(registration.eventDate)}
                          </div>
                        </div>
                        {hasAttended ? (
                          <Badge className="bg-green-500/20 text-green-300 border-green-500/50">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Attended
                          </Badge>
                        ) : (
                          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/50">
                            Registered
                          </Badge>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-300">No upcoming events</p>
              <p className="text-sm text-gray-400 mb-4">
                Register for events to see them here!
              </p>
              <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white">
                Browse Events
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
