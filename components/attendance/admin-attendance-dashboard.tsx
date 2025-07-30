"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth";
import { attendanceService, EventAttendance, AttendanceRecord } from "@/lib/attendance";
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  Download, 
  Search, 
  Filter,
  Clock,
  CheckCircle,
  UserCheck,
  Eye
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function AdminAttendanceDashboard() {
  const { user } = useAuth();
  const [eventAttendance, setEventAttendance] = useState<EventAttendance[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventAttendance[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<EventAttendance | null>(null);
  const [totalStats, setTotalStats] = useState({
    totalEvents: 0,
    totalRegistrations: 0,
    totalAttendees: 0,
    averageAttendanceRate: 0,
  });

  useEffect(() => {
    if (user?.isAdmin) {
      loadAttendanceData();
    }
  }, [user]);

  useEffect(() => {
    filterEvents();
  }, [searchTerm, eventAttendance]);

  const loadAttendanceData = () => {
    const allEventAttendance = attendanceService.getAllEventAttendance();
    setEventAttendance(allEventAttendance);

    // Calculate total stats
    const totalEvents = allEventAttendance.length;
    const totalRegistrations = allEventAttendance.reduce((sum, event) => sum + event.totalRegistered, 0);
    const totalAttendees = allEventAttendance.reduce((sum, event) => sum + event.totalCheckedIn, 0);
    const averageAttendanceRate = totalEvents > 0 
      ? allEventAttendance.reduce((sum, event) => sum + event.attendanceRate, 0) / totalEvents
      : 0;

    setTotalStats({
      totalEvents,
      totalRegistrations,
      totalAttendees,
      averageAttendanceRate: Math.round(averageAttendanceRate * 10) / 10,
    });
  };

  const filterEvents = () => {
    if (!searchTerm) {
      setFilteredEvents(eventAttendance);
      return;
    }

    const filtered = eventAttendance.filter(event =>
      event.eventTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.eventDate.includes(searchTerm)
    );
    setFilteredEvents(filtered);
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

  const exportAttendanceData = () => {
    const csvData = [
      ["Event Title", "Event Date", "Total Registered", "Total Attended", "Attendance Rate"]
    ];

    eventAttendance.forEach(event => {
      csvData.push([
        event.eventTitle,
        event.eventDate,
        event.totalRegistered.toString(),
        event.totalCheckedIn.toString(),
        `${event.attendanceRate}%`
      ]);
    });

    const csvContent = csvData.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `jengacode-attendance-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportEventDetails = (event: EventAttendance) => {
    const csvData = [
      ["Name", "Email", "Check-in Time", "Status", "Notes"]
    ];

    event.attendees.forEach(attendee => {
      csvData.push([
        attendee.userName,
        attendee.userEmail,
        formatTime(attendee.checkInTime),
        attendee.status,
        attendee.notes || ""
      ]);
    });

    const csvContent = csvData.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${event.eventTitle.replace(/[^a-zA-Z0-9]/g, "-")}-attendees.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (!user?.isAdmin) {
    return (
      <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-red-500/30 text-white">
        <CardHeader>
          <CardTitle className="text-center text-red-300">
            Access Denied
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-300">
            You need admin privileges to access the attendance dashboard.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Attendance Admin Dashboard
          </h2>
          <p className="text-gray-300">Manage and monitor event attendance</p>
        </div>
        <Button
          onClick={exportAttendanceData}
          className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white"
        >
          <Download className="w-4 h-4 mr-2" />
          Export All Data
        </Button>
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
              <div className="text-2xl font-bold text-white">{totalStats.totalEvents}</div>
              <div className="text-sm text-gray-300">Total Events</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-blue-600/20 to-blue-700/20 border border-blue-500/30 text-white">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 mx-auto mb-3 text-blue-400" />
              <div className="text-2xl font-bold text-white">{totalStats.totalRegistrations}</div>
              <div className="text-sm text-gray-300">Total Registrations</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-green-600/20 to-green-700/20 border border-green-500/30 text-white">
            <CardContent className="p-6 text-center">
              <UserCheck className="w-8 h-8 mx-auto mb-3 text-green-400" />
              <div className="text-2xl font-bold text-white">{totalStats.totalAttendees}</div>
              <div className="text-sm text-gray-300">Total Attendees</div>
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
              <div className={`text-2xl font-bold ${getAttendanceColor(totalStats.averageAttendanceRate)}`}>
                {totalStats.averageAttendanceRate}%
              </div>
              <div className="text-sm text-gray-300">Average Attendance</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-gray-600 text-white">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search events by title or date..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-gray-400"
              />
            </div>
            <Button
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Events List */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-purple-500/30 text-white">
        <CardHeader>
          <CardTitle className="text-xl text-purple-300">Event Attendance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredEvents.length > 0 ? (
            <div className="space-y-4">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.eventId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-lg p-4 border border-purple-500/20"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-white text-lg mb-2">{event.eventTitle}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-300">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                          {formatDate(event.eventDate)}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2 text-blue-400" />
                          {event.totalRegistered} registered
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                          {event.totalCheckedIn} attended
                        </div>
                        <div className="flex items-center">
                          <TrendingUp className={`w-4 h-4 mr-2 ${getAttendanceColor(event.attendanceRate)}`} />
                          <span className={getAttendanceColor(event.attendanceRate)}>
                            {event.attendanceRate}% attendance
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <Badge className={
                        event.attendanceRate >= 80 
                          ? "bg-green-500/20 text-green-300 border-green-500/50"
                          : event.attendanceRate >= 60
                          ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/50"
                          : "bg-red-500/20 text-red-300 border-red-500/50"
                      }>
                        {event.attendanceRate >= 80 ? "Excellent" : 
                         event.attendanceRate >= 60 ? "Good" : "Needs Improvement"}
                      </Badge>
                      <Button
                        size="sm"
                        onClick={() => setSelectedEvent(event)}
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-300">No events found</p>
              <p className="text-sm text-gray-400">
                {searchTerm ? "Try adjusting your search terms" : "No attendance data available yet"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Event Details Modal */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-800 border-slate-600 text-white">
          {selectedEvent && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-2xl font-bold text-purple-300">
                    {selectedEvent.eventTitle}
                  </DialogTitle>
                  <Button
                    onClick={() => exportEventDetails(selectedEvent)}
                    className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
                <p className="text-gray-400">{formatDate(selectedEvent.eventDate)}</p>
              </DialogHeader>

              <div className="space-y-6">
                {/* Event Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-500/10 rounded-lg p-4 text-center border border-blue-500/20">
                    <div className="text-2xl font-bold text-blue-400">{selectedEvent.totalRegistered}</div>
                    <div className="text-sm text-gray-300">Total Registered</div>
                  </div>
                  <div className="bg-green-500/10 rounded-lg p-4 text-center border border-green-500/20">
                    <div className="text-2xl font-bold text-green-400">{selectedEvent.totalCheckedIn}</div>
                    <div className="text-sm text-gray-300">Attended</div>
                  </div>
                  <div className="bg-purple-500/10 rounded-lg p-4 text-center border border-purple-500/20">
                    <div className={`text-2xl font-bold ${getAttendanceColor(selectedEvent.attendanceRate)}`}>
                      {selectedEvent.attendanceRate}%
                    </div>
                    <div className="text-sm text-gray-300">Attendance Rate</div>
                  </div>
                </div>

                {/* Attendees List */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Attendees ({selectedEvent.attendees.length})</h3>
                  {selectedEvent.attendees.length > 0 ? (
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {selectedEvent.attendees
                        .sort((a, b) => new Date(a.checkInTime).getTime() - new Date(b.checkInTime).getTime())
                        .map((attendee) => (
                          <div
                            key={attendee.id}
                            className="bg-slate-700 rounded-lg p-3 border border-slate-600"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-white">{attendee.userName}</div>
                                <div className="text-sm text-gray-400">{attendee.userEmail}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm text-gray-300">
                                  <Clock className="w-3 h-3 inline mr-1" />
                                  {formatTime(attendee.checkInTime)}
                                </div>
                                <Badge className="bg-green-500/20 text-green-300 border-green-500/50">
                                  {attendee.status}
                                </Badge>
                              </div>
                            </div>
                            {attendee.notes && (
                              <div className="mt-2 text-sm text-gray-400 italic">
                                "{attendee.notes}"
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      <UserCheck className="w-12 h-12 mx-auto mb-2" />
                      <p>No attendees yet</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
