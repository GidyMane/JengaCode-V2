"use client";

import { AdminAttendanceDashboard } from "@/components/attendance/admin-attendance-dashboard";

export default function AdminAttendancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-cyan-500 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdminAttendanceDashboard />
      </div>
    </div>
  );
}
