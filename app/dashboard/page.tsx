"use client";

import { UserAttendanceDashboard } from "@/components/attendance/user-attendance-dashboard";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-cyan-500 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <UserAttendanceDashboard />
      </div>
    </div>
  );
}
