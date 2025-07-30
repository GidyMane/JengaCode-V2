export interface AttendanceRecord {
  id: string;
  userId: string;
  eventId: string;
  userName: string;
  userEmail: string;
  eventTitle: string;
  eventDate: string;
  checkInTime: string;
  checkOutTime?: string;
  status: "checked-in" | "checked-out" | "missed";
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AttendanceStats {
  totalEvents: number;
  attendedEvents: number;
  missedEvents: number;
  attendanceRate: number;
}

export interface EventAttendance {
  eventId: string;
  eventTitle: string;
  eventDate: string;
  totalRegistered: number;
  totalCheckedIn: number;
  attendanceRate: number;
  attendees: AttendanceRecord[];
}

const ATTENDANCE_KEY = "jengacode_attendance";
const EVENT_REGISTRATIONS_KEY = "jengacode_registrations";

// Event registration interface
export interface EventRegistration {
  id: string;
  userId: string;
  eventId: string;
  userName: string;
  userEmail: string;
  eventTitle: string;
  eventDate: string;
  registrationDate: string;
  status: "registered" | "cancelled";
}

class AttendanceService {
  private getAttendanceRecords(): AttendanceRecord[] {
    const records = localStorage.getItem(ATTENDANCE_KEY);
    return records ? JSON.parse(records) : [];
  }

  private saveAttendanceRecords(records: AttendanceRecord[]): void {
    localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(records));
  }

  private getEventRegistrations(): EventRegistration[] {
    const registrations = localStorage.getItem(EVENT_REGISTRATIONS_KEY);
    return registrations ? JSON.parse(registrations) : [];
  }

  private saveEventRegistrations(registrations: EventRegistration[]): void {
    localStorage.setItem(EVENT_REGISTRATIONS_KEY, JSON.stringify(registrations));
  }

  // Register user for an event
  async registerForEvent(
    userId: string,
    userName: string,
    userEmail: string,
    eventId: string,
    eventTitle: string,
    eventDate: string
  ): Promise<{ success: boolean; error?: string }> {
    const registrations = this.getEventRegistrations();
    
    // Check if already registered
    const existingRegistration = registrations.find(
      r => r.userId === userId && r.eventId === eventId && r.status === "registered"
    );
    
    if (existingRegistration) {
      return { success: false, error: "Already registered for this event" };
    }

    const registration: EventRegistration = {
      id: `reg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      eventId,
      userName,
      userEmail,
      eventTitle,
      eventDate,
      registrationDate: new Date().toISOString(),
      status: "registered",
    };

    registrations.push(registration);
    this.saveEventRegistrations(registrations);

    return { success: true };
  }

  // Mark attendance (check in)
  async markAttendance(
    userId: string,
    userName: string,
    userEmail: string,
    eventId: string,
    eventTitle: string,
    eventDate: string,
    notes?: string
  ): Promise<{ success: boolean; error?: string; record?: AttendanceRecord }> {
    const records = this.getAttendanceRecords();
    
    // Check if already checked in
    const existingRecord = records.find(
      r => r.userId === userId && r.eventId === eventId
    );
    
    if (existingRecord) {
      return { success: false, error: "Already marked attendance for this event" };
    }

    const attendanceRecord: AttendanceRecord = {
      id: `att_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      eventId,
      userName,
      userEmail,
      eventTitle,
      eventDate,
      checkInTime: new Date().toISOString(),
      status: "checked-in",
      notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    records.push(attendanceRecord);
    this.saveAttendanceRecords(records);

    return { success: true, record: attendanceRecord };
  }

  // Check out (optional)
  async markCheckOut(userId: string, eventId: string): Promise<{ success: boolean; error?: string }> {
    const records = this.getAttendanceRecords();
    const recordIndex = records.findIndex(
      r => r.userId === userId && r.eventId === eventId && r.status === "checked-in"
    );

    if (recordIndex === -1) {
      return { success: false, error: "No check-in record found" };
    }

    records[recordIndex].checkOutTime = new Date().toISOString();
    records[recordIndex].status = "checked-out";
    records[recordIndex].updatedAt = new Date().toISOString();

    this.saveAttendanceRecords(records);
    return { success: true };
  }

  // Get user's attendance records
  getUserAttendance(userId: string): AttendanceRecord[] {
    const records = this.getAttendanceRecords();
    return records.filter(r => r.userId === userId);
  }

  // Get user's event registrations
  getUserRegistrations(userId: string): EventRegistration[] {
    const registrations = this.getEventRegistrations();
    return registrations.filter(r => r.userId === userId && r.status === "registered");
  }

  // Get user's attendance stats
  getUserAttendanceStats(userId: string): AttendanceStats {
    const registrations = this.getUserRegistrations(userId);
    const attendanceRecords = this.getUserAttendance(userId);
    
    const totalEvents = registrations.length;
    const attendedEvents = attendanceRecords.length;
    const missedEvents = totalEvents - attendedEvents;
    const attendanceRate = totalEvents > 0 ? (attendedEvents / totalEvents) * 100 : 0;

    return {
      totalEvents,
      attendedEvents,
      missedEvents,
      attendanceRate: Math.round(attendanceRate * 10) / 10,
    };
  }

  // Get attendance for a specific event (admin view)
  getEventAttendance(eventId: string): AttendanceRecord[] {
    const records = this.getAttendanceRecords();
    return records.filter(r => r.eventId === eventId);
  }

  // Get all event attendance summary (admin view)
  getAllEventAttendance(): EventAttendance[] {
    const records = this.getAttendanceRecords();
    const registrations = this.getEventRegistrations();
    
    // Group by event
    const eventMap = new Map<string, EventAttendance>();
    
    // Initialize with registrations
    registrations.forEach(reg => {
      if (reg.status === "registered") {
        if (!eventMap.has(reg.eventId)) {
          eventMap.set(reg.eventId, {
            eventId: reg.eventId,
            eventTitle: reg.eventTitle,
            eventDate: reg.eventDate,
            totalRegistered: 0,
            totalCheckedIn: 0,
            attendanceRate: 0,
            attendees: [],
          });
        }
        eventMap.get(reg.eventId)!.totalRegistered++;
      }
    });

    // Add attendance records
    records.forEach(record => {
      if (!eventMap.has(record.eventId)) {
        eventMap.set(record.eventId, {
          eventId: record.eventId,
          eventTitle: record.eventTitle,
          eventDate: record.eventDate,
          totalRegistered: 0,
          totalCheckedIn: 0,
          attendanceRate: 0,
          attendees: [],
        });
      }
      
      const eventAttendance = eventMap.get(record.eventId)!;
      eventAttendance.attendees.push(record);
      eventAttendance.totalCheckedIn++;
    });

    // Calculate attendance rates
    const result = Array.from(eventMap.values()).map(event => ({
      ...event,
      attendanceRate: event.totalRegistered > 0 
        ? Math.round((event.totalCheckedIn / event.totalRegistered) * 1000) / 10
        : 0,
    }));

    // Sort by date (most recent first)
    return result.sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());
  }

  // Check if user is registered for event
  isUserRegistered(userId: string, eventId: string): boolean {
    const registrations = this.getEventRegistrations();
    return registrations.some(
      r => r.userId === userId && r.eventId === eventId && r.status === "registered"
    );
  }

  // Check if user has marked attendance for event
  hasUserAttended(userId: string, eventId: string): boolean {
    const records = this.getAttendanceRecords();
    return records.some(r => r.userId === userId && r.eventId === eventId);
  }

  // Generate QR code data for attendance
  generateAttendanceQR(eventId: string): string {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    return `${baseUrl}/attendance/mark?eventId=${eventId}`;
  }

  // Cancel event registration
  async cancelRegistration(userId: string, eventId: string): Promise<{ success: boolean; error?: string }> {
    const registrations = this.getEventRegistrations();
    const registrationIndex = registrations.findIndex(
      r => r.userId === userId && r.eventId === eventId && r.status === "registered"
    );

    if (registrationIndex === -1) {
      return { success: false, error: "Registration not found" };
    }

    registrations[registrationIndex].status = "cancelled";
    this.saveEventRegistrations(registrations);

    return { success: true };
  }
}

export const attendanceService = new AttendanceService();
