// "use client";

// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { QRCodeGenerator } from "@/components/attendance/qr-code-generator";
// import { useAuth } from "@/lib/auth";
// import { attendanceService, EventAttendance } from "@/lib/attendance";
// import { events as mockEvents } from "@/lib/events";
// import { 
//   Calendar, 
//   Users, 
//   TrendingUp, 
//   QrCode,
//   UserCheck,
//   Clock,
//   CheckCircle,
//   Eye,
//   Download,
//   RefreshCw
// } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { toast } from "sonner";

// export default function SummerCampAttendancePage() {
//   const { user } = useAuth();
//   const [summerCampEvent, setSummerCampEvent] = useState<any>(null);
//   const [attendanceData, setAttendanceData] = useState<EventAttendance | null>(null);
//   const [showQRCode, setShowQRCode] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (user?.isAdmin) {
//       loadSummerCampData();
//     }
//   }, [user]);

//   const loadSummerCampData = () => {
//     setLoading(true);
    
//     // Find Summer Coding Camp 2025
//     const summerCamp = mockEvents.find(event => event.id === "summer-camp-2025");
//     setSummerCampEvent(summerCamp);

//     if (summerCamp) {
//       // Get attendance data for this event
//       const eventAttendance = attendanceService.getAllEventAttendance()
//         .find(ea => ea.eventId === summerCamp.id);
      
//       if (eventAttendance) {
//         setAttendanceData(eventAttendance);
//       } else {
//         // Create empty attendance record if none exists
//         setAttendanceData({
//           eventId: summerCamp.id,
//           eventTitle: summerCamp.title,
//           eventDate: summerCamp.date,
//           totalRegistered: 0,
//           totalCheckedIn: 0,
//           attendanceRate: 0,
//           attendees: [],
//         });
//       }
//     }
    
//     setLoading(false);
//   };

//   const refreshData = () => {
//     loadSummerCampData();
//     toast.success("Attendance data refreshed!");
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const formatTime = (dateString: string) => {
//     return new Date(dateString).toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const exportAttendeeList = () => {
//     if (!attendanceData) return;

//     const csvData = [
//       ["Name", "Email", "Check-in Time", "Status", "Notes"]
//     ];

//     attendanceData.attendees.forEach(attendee => {
//       csvData.push([
//         attendee.userName,
//         attendee.userEmail,
//         formatTime(attendee.checkInTime),
//         attendee.status,
//         attendee.notes || ""
//       ]);
//     });

//     const csvContent = csvData.map(row => row.join(",")).join("\n");
//     const blob = new Blob([csvContent], { type: "text/csv" });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `summer-camp-2025-attendees-${new Date().toISOString().split('T')[0]}.csv`;
//     a.click();
//     window.URL.revokeObjectURL(url);
//     toast.success("Attendee list exported successfully!");
//   };

//   const getAttendanceColor = (rate: number) => {
//     if (rate >= 80) return "text-green-400";
//     if (rate >= 60) return "text-yellow-400";
//     return "text-red-400";
//   };

//   if (!user?.isAdmin) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-cyan-500 pt-24 pb-16 flex items-center justify-center">
//         <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-red-500/30 text-white">
//           <CardHeader>
//             <CardTitle className="text-center text-red-300">
//               Access Denied
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="text-center">
//             <p className="text-gray-300">
//               You need admin privileges to access summer camp attendance management.
//             </p>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-cyan-500 pt-24 pb-16 flex items-center justify-center">
//         <div className="text-center text-white">
//           <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-300">Loading summer camp data...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!summerCampEvent) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-cyan-500 pt-24 pb-16 flex items-center justify-center">
//         <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-yellow-500/30 text-white">
//           <CardHeader>
//             <CardTitle className="text-center text-yellow-300">
//               Summer Camp Event Not Found
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="text-center">
//             <p className="text-gray-300">
//               The Summer Coding Camp 2025 event could not be found in the system.
//             </p>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-cyan-500 pt-24 pb-16">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
//               Summer Camp Attendance Management
//             </h1>
//             <p className="text-gray-300 mt-2">{summerCampEvent.title} - {formatDate(summerCampEvent.date)}</p>
//           </div>
//           <div className="flex space-x-3">
//             <Button
//               onClick={refreshData}
//               variant="outline"
//               className="border-gray-600 text-gray-300 hover:bg-gray-700"
//             >
//               <RefreshCw className="w-4 h-4 mr-2" />
//               Refresh
//             </Button>
//             <Button
//               onClick={() => setShowQRCode(true)}
//               className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white"
//             >
//               <QrCode className="w-4 h-4 mr-2" />
//               Generate QR Code
//             </Button>
//           </div>
//         </div>

//         {/* Stats Overview */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//           >
//             <Card className="bg-gradient-to-br from-blue-600/20 to-blue-700/20 border border-blue-500/30 text-white">
//               <CardContent className="p-6 text-center">
//                 <Users className="w-8 h-8 mx-auto mb-3 text-blue-400" />
//                 <div className="text-2xl font-bold text-white">{attendanceData?.totalRegistered || 0}</div>
//                 <div className="text-sm text-gray-300">Total Registered</div>
//               </CardContent>
//             </Card>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//           >
//             <Card className="bg-gradient-to-br from-green-600/20 to-green-700/20 border border-green-500/30 text-white">
//               <CardContent className="p-6 text-center">
//                 <UserCheck className="w-8 h-8 mx-auto mb-3 text-green-400" />
//                 <div className="text-2xl font-bold text-white">{attendanceData?.totalCheckedIn || 0}</div>
//                 <div className="text-sm text-gray-300">Checked In</div>
//               </CardContent>
//             </Card>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//           >
//             <Card className="bg-gradient-to-br from-cyan-600/20 to-cyan-700/20 border border-cyan-500/30 text-white">
//               <CardContent className="p-6 text-center">
//                 <TrendingUp className="w-8 h-8 mx-auto mb-3 text-cyan-400" />
//                 <div className={`text-2xl font-bold ${getAttendanceColor(attendanceData?.attendanceRate || 0)}`}>
//                   {attendanceData?.attendanceRate || 0}%
//                 </div>
//                 <div className="text-sm text-gray-300">Attendance Rate</div>
//               </CardContent>
//             </Card>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//           >
//             <Card className="bg-gradient-to-br from-purple-600/20 to-purple-700/20 border border-purple-500/30 text-white">
//               <CardContent className="p-6 text-center">
//                 <Calendar className="w-8 h-8 mx-auto mb-3 text-purple-400" />
//                 <div className="text-lg font-bold text-white">Aug 8-9</div>
//                 <div className="text-sm text-gray-300">2025</div>
//               </CardContent>
//             </Card>
//           </motion.div>
//         </div>

//         {/* Current Attendees */}
//         <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-purple-500/30 text-white">
//           <CardHeader>
//             <div className="flex items-center justify-between">
//               <CardTitle className="text-xl text-purple-300">Current Attendees</CardTitle>
//               <div className="flex space-x-2">
//                 <Badge className="bg-green-500/20 text-green-300 border-green-500/50">
//                   {attendanceData?.attendees.length || 0} checked in
//                 </Badge>
//                 <Button
//                   size="sm"
//                   onClick={exportAttendeeList}
//                   className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
//                 >
//                   <Download className="w-4 h-4 mr-1" />
//                   Export
//                 </Button>
//               </div>
//             </div>
//           </CardHeader>
//           <CardContent>
//             {attendanceData?.attendees && attendanceData.attendees.length > 0 ? (
//               <div className="space-y-3 max-h-96 overflow-y-auto">
//                 {attendanceData.attendees
//                   .sort((a, b) => new Date(b.checkInTime).getTime() - new Date(a.checkInTime).getTime())
//                   .map((attendee) => (
//                     <div
//                       key={attendee.id}
//                       className="bg-slate-700 rounded-lg p-4 border border-slate-600"
//                     >
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <div className="font-medium text-white">{attendee.userName}</div>
//                           <div className="text-sm text-gray-400">{attendee.userEmail}</div>
//                         </div>
//                         <div className="text-right">
//                           <div className="text-sm text-gray-300">
//                             <Clock className="w-3 h-3 inline mr-1" />
//                             {formatTime(attendee.checkInTime)}
//                           </div>
//                           <Badge className="bg-green-500/20 text-green-300 border-green-500/50">
//                             <CheckCircle className="w-3 h-3 mr-1" />
//                             {attendee.status}
//                           </Badge>
//                         </div>
//                       </div>
//                       {attendee.notes && (
//                         <div className="mt-2 text-sm text-gray-400 italic">
//                           "{attendee.notes}"
//                         </div>
//                       )}
//                     </div>
//                   ))}
//               </div>
//             ) : (
//               <div className="text-center py-8 text-gray-400">
//                 <UserCheck className="w-12 h-12 mx-auto mb-2" />
//                 <p>No attendees have checked in yet</p>
//                 <p className="text-sm">Share the QR code to start collecting attendance!</p>
//               </div>
//             )}
//           </CardContent>
//         </Card>

//         {/* QR Code Modal */}
//         <Dialog open={showQRCode} onOpenChange={setShowQRCode}>
//           <DialogContent className="max-w-2xl bg-slate-800 border-slate-600">
//             <DialogHeader>
//               <DialogTitle className="text-white">Summer Camp QR Code</DialogTitle>
//             </DialogHeader>
//             <QRCodeGenerator
//               eventId={summerCampEvent.id}
//               eventTitle={summerCampEvent.title}
//               eventDate={summerCampEvent.date}
//               eventLocation={summerCampEvent.location}
//               eventDuration={summerCampEvent.duration}
//             />
//           </DialogContent>
//         </Dialog>
//       </div>
//     </div>
//   );
// }
