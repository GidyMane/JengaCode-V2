"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, Calendar, MapPin, Users, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function SummerCampAttendancePage() {
  const summerCampEventId = "summer-camp-2025";
  const attendanceUrl = `/attendance/mark?eventId=${summerCampEventId}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(
    typeof window !== "undefined" ? `${window.location.origin}${attendanceUrl}` : attendanceUrl
  )}&bgcolor=1e293b&color=a855f7&format=png`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-cyan-500 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6">
            Summer Coding Camp 2025
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Welcome to the attendance page for our amazing Summer Coding Camp! 
            Mark your attendance using the QR code below or the attendance button.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Event Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-purple-500/30 text-white h-full">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-purple-300 flex items-center">
                  <Calendar className="w-6 h-6 mr-2" />
                  Event Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-lg p-4 border border-purple-500/20">
                  <h3 className="text-lg font-semibold text-white mb-4">Summer Coding Camp 2025</h3>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center text-gray-300">
                      <Calendar className="w-4 h-4 mr-3 text-purple-400" />
                      <span className="font-medium">August 8th - 9th, 2025</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <MapPin className="w-4 h-4 mr-3 text-green-400" />
                      <span>JengaCode Innovation Hub</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Users className="w-4 h-4 mr-3 text-cyan-400" />
                      <span>2 days of coding adventure</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-white">What You'll Learn:</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-700 rounded-lg p-3 text-center">
                      <div className="text-2xl mb-1">🧩</div>
                      <div className="text-sm text-gray-300">Scratch Programming</div>
                    </div>
                    <div className="bg-slate-700 rounded-lg p-3 text-center">
                      <div className="text-2xl mb-1">🤖</div>
                      <div className="text-sm text-gray-300">Robot Building</div>
                    </div>
                    <div className="bg-slate-700 rounded-lg p-3 text-center">
                      <div className="text-2xl mb-1">🌐</div>
                      <div className="text-sm text-gray-300">Web Development</div>
                    </div>
                    <div className="bg-slate-700 rounded-lg p-3 text-center">
                      <div className="text-2xl mb-1">🏆</div>
                      <div className="text-sm text-gray-300">Team Challenges</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Link href={attendanceUrl}>
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white py-3 text-lg font-bold">
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Mark Your Attendance
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* QR Code */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-cyan-500/30 text-white h-full">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-cyan-300 flex items-center">
                  <QrCode className="w-6 h-6 mr-2" />
                  Scan to Attend
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-6">
                <div className="bg-white p-6 rounded-lg">
                  <img 
                    src={qrCodeUrl} 
                    alt="QR Code for Summer Camp attendance"
                    className="w-80 h-80 object-contain"
                  />
                </div>
                
                <div className="text-center space-y-3">
                  <p className="text-lg font-medium text-white">
                    Scan with your phone camera
                  </p>
                  <p className="text-sm text-gray-300">
                    This QR code will take you directly to the attendance form. 
                    Make sure you're signed in to mark your attendance!
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-lg p-4 border border-blue-500/20 w-full">
                  <h4 className="text-sm font-medium text-blue-300 mb-2">How to use:</h4>
                  <ol className="text-xs text-gray-300 space-y-1 list-decimal list-inside">
                    <li>Open your phone's camera app</li>
                    <li>Point it at the QR code above</li>
                    <li>Tap the notification that appears</li>
                    <li>Sign in if you haven't already</li>
                    <li>Mark your attendance!</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-r from-green-500/10 to-teal-500/10 border border-green-500/20 text-white">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-green-300 mb-2">Need Help?</h3>
              <p className="text-gray-300 mb-4">
                If you're having trouble with attendance or need assistance, please ask one of our staff members. 
                We're here to help make your Summer Coding Camp experience amazing!
              </p>
              <div className="flex justify-center space-x-4 text-sm">
                <span className="bg-green-500/20 px-3 py-1 rounded-full">Staff Available</span>
                <span className="bg-blue-500/20 px-3 py-1 rounded-full">Technical Support</span>
                <span className="bg-purple-500/20 px-3 py-1 rounded-full">Friendly Helpers</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
