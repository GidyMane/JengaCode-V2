import { Suspense } from "react";
import { MarkAttendanceContent } from "./mark-attendance-content";

export default function MarkAttendancePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-cyan-500 pt-24 pb-16 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Loading attendance form...</p>
        </div>
      </div>
    }>
      <MarkAttendanceContent />
    </Suspense>
  );
}
