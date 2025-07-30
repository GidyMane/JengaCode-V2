"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QrCode, Download, Copy, Check, Calendar, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";

interface QRCodeGeneratorProps {
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
  eventDuration: string;
}

export function QRCodeGenerator({ 
  eventId, 
  eventTitle, 
  eventDate, 
  eventLocation, 
  eventDuration 
}: QRCodeGeneratorProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [attendanceUrl, setAttendanceUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    const attendanceLink = `${baseUrl}/attendance/mark?eventId=${eventId}`;
    setAttendanceUrl(attendanceLink);
    
    // Generate QR code using qr-server.com API
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(attendanceLink)}&bgcolor=1e293b&color=a855f7&format=png`;
    setQrCodeUrl(qrUrl);
  }, [eventId]);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(attendanceUrl);
      setCopied(true);
      toast.success("Attendance URL copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy URL to clipboard");
    }
  };

  const handleDownloadQR = () => {
    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = `${eventTitle.replace(/[^a-zA-Z0-9]/g, "-")}-qr-code.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("QR Code downloaded successfully!");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-purple-500/30 text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-purple-300 flex items-center">
              <QrCode className="w-5 h-5 mr-2" />
              QR Code for Attendance
            </CardTitle>
            <Badge className="bg-green-500/20 text-green-300 border-green-500/50">
              Active
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Event Info */}
          <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-lg p-4 border border-purple-500/20">
            <h3 className="text-lg font-semibold text-white mb-3">{eventTitle}</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center text-gray-300">
                <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                {formatDate(eventDate)}
              </div>
              <div className="flex items-center text-gray-300">
                <Clock className="w-4 h-4 mr-2 text-cyan-400" />
                {eventDuration}
              </div>
              <div className="flex items-center text-gray-300 sm:col-span-2">
                <MapPin className="w-4 h-4 mr-2 text-green-400" />
                {eventLocation}
              </div>
            </div>
          </div>

          {/* QR Code Display */}
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-white p-4 rounded-lg">
              {qrCodeUrl && (
                <img 
                  src={qrCodeUrl} 
                  alt="QR Code for attendance"
                  className="w-64 h-64 object-contain"
                />
              )}
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-300 mb-2">
                Scan this QR code to mark attendance for this event
              </p>
              <p className="text-xs text-gray-400">
                Participants can use any QR code scanner or camera app
              </p>
            </div>
          </div>

          {/* URL Section */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-white">Attendance URL:</h4>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-slate-700 rounded px-3 py-2 text-sm text-gray-300 font-mono break-all">
                {attendanceUrl}
              </div>
              <Button
                size="sm"
                onClick={handleCopyUrl}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              onClick={handleDownloadQR}
              className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Download QR Code
            </Button>
            <Button
              onClick={() => window.open(attendanceUrl, "_blank")}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Test Attendance Link
            </Button>
          </div>

          {/* Instructions */}
          <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-lg p-4 border border-blue-500/20">
            <h4 className="text-sm font-medium text-blue-300 mb-2">Instructions for Use:</h4>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>• Display this QR code at the event entrance</li>
              <li>• Participants scan the code to access the attendance form</li>
              <li>• They must be signed in to mark their attendance</li>
              <li>• Each participant can only mark attendance once per event</li>
              <li>• Monitor attendance in real-time from the admin dashboard</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
