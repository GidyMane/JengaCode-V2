"use client";

import { useSearchParams } from "next/navigation";
import { AttendanceMarker } from "@/components/attendance/attendance-marker";
import { events } from "@/lib/events";

export function MarkAttendanceContent() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");

  // Find the event
  const event = events.find(e => e.id === eventId);

  if (!eventId || !event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-cyan-500 pt-24 pb-16 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-3xl font-bold mb-4">Event Not Found</h1>
          <p className="text-gray-300">The event you're trying to mark attendance for could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-cyan-500 pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Mark Your Attendance
          </h1>
          <p className="text-gray-300">Confirm your participation in this JengaCode event</p>
        </div>
        
        <AttendanceMarker 
          event={{
            id: event.id,
            title: event.title,
            date: event.date,
            location: event.location,
            duration: event.duration,
          }}
        />
      </div>
    </div>
  );
}
