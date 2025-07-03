"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { EventCard } from "@/components/events/event-card";
import { EventFilters } from "@/components/events/event-filters";
import { EventGallery } from "@/components/events/event-gallery";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  mockEvents,
  filterEvents,
  formatDate,
  getCategoryDisplay,
} from "@/lib/events";
import { Event, EventFilters as EventFiltersType } from "@/types/event";
import { Calendar, MapPin, Clock, Users, Award } from "lucide-react";

export default function EventsPage() {
  const [filters, setFilters] = useState<EventFiltersType>({
    category: "all",
    sortBy: "date",
    sortOrder: "desc",
    searchTerm: "",
  });
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const filteredEvents = filterEvents(mockEvents, filters);

  const handleViewDetails = (event: Event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-jengacode-purple to-jengacode-cyan bg-clip-text text-transparent mb-6">
            Past Events Gallery
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Explore our amazing journey through past workshops, camps,
            competitions, and showcases. See the incredible projects, meet the
            participants, and get inspired for future events!
          </p>
        </motion.div>

        {/* Filters */}
        <EventFilters
          filters={filters}
          onFiltersChange={setFilters}
          totalEvents={mockEvents.length}
          filteredCount={filteredEvents.length}
        />

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <EventCard event={event} onViewDetails={handleViewDetails} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-4">
              No events found
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              Try adjusting your filters or search terms to find more events.
            </p>
            <Button
              onClick={() =>
                setFilters({
                  category: "all",
                  sortBy: "date",
                  sortOrder: "desc",
                  searchTerm: "",
                })
              }
              className="bg-gradient-to-r from-jengacode-purple to-jengacode-cyan text-white"
            >
              Clear All Filters
            </Button>
          </motion.div>
        )}
      </div>

      {/* Event Detail Modal */}
      <Dialog open={!!selectedEvent} onOpenChange={() => closeModal()}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-800">
          {selectedEvent && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <DialogTitle className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
                      {selectedEvent.title}
                    </DialogTitle>
                    <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(selectedEvent.date)}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {selectedEvent.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {selectedEvent.duration}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary">
                      {getCategoryDisplay(selectedEvent.category)}
                    </Badge>
                    {selectedEvent.featured && (
                      <Badge className="bg-gradient-to-r from-jengacode-yellow to-orange-500 text-white">
                        Featured
                      </Badge>
                    )}
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-8">
                {/* Event Description */}
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">
                    About This Event
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {selectedEvent.fullDescription}
                  </p>
                </div>

                {/* Photo Gallery */}
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">
                    Event Gallery
                  </h3>
                  <EventGallery
                    images={selectedEvent.images}
                    eventTitle={selectedEvent.title}
                  />
                </div>

                <Separator />

                {/* Activities */}
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">
                    Activities & Workshops
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedEvent.activities.map((activity) => (
                      <motion.div
                        key={activity.id}
                        className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-600 p-4 rounded-lg"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{activity.icon}</span>
                          <h4 className="font-semibold text-slate-800 dark:text-white">
                            {activity.name}
                          </h4>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                          {activity.description}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                          <Users className="w-3 h-3" />
                          {activity.participants} participants
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Attendees & Achievements */}
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">
                    Participants & Achievements
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedEvent.attendees.map((attendee) => (
                      <motion.div
                        key={attendee.id}
                        className="bg-gradient-to-br from-jengacode-purple/10 to-jengacode-cyan/10 p-4 rounded-lg border border-jengacode-purple/20"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-gradient-to-r from-jengacode-purple to-jengacode-cyan rounded-full flex items-center justify-center text-white font-bold">
                            {attendee.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-800 dark:text-white">
                              {attendee.name}
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Age {attendee.age}
                            </p>
                          </div>
                        </div>
                        {attendee.achievement && (
                          <div className="flex items-center gap-2 mt-2">
                            <Award className="w-4 h-4 text-jengacode-yellow" />
                            <span className="text-sm text-jengacode-purple font-medium">
                              {attendee.achievement}
                            </span>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Stats Summary */}
                <div className="bg-gradient-to-r from-jengacode-purple/10 to-jengacode-cyan/10 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4 text-center">
                    Event Summary
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-jengacode-purple mb-1">
                        {selectedEvent.attendees.length}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        Participants
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-jengacode-cyan mb-1">
                        {selectedEvent.activities.length}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        Activities
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-jengacode-yellow mb-1">
                        {selectedEvent.images.length}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        Photos
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-jengacode-purple mb-1">
                        {
                          selectedEvent.attendees.filter((a) => a.achievement)
                            .length
                        }
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        Awards
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
