"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Edit, Trash2, Download } from "lucide-react";
import { toast } from "sonner";
import { Event, EventCategory } from "@/types/event";
import { eventService } from "@/lib/admin-services";

const EVENT_CATEGORIES: EventCategory[] = [
  "workshop",
  "camp",
  "competition",
  "showcase",
  "community",
  "bootcamp",
  "challenge",
  "other",
];

export default function EventsManagement() {
  const [events, setEvents] = useState<Event[]>([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<EventCategory | "all">(
    "all"
  );
  const [formData, setFormData] = useState<Partial<Event>>({
    title: "",
    slug: "",
    date: "",
    location: "",
    shortDescription: "",
    fullDescription: "",
    category: "workshop",
    featured: false,
    capacity: 50,
    registered: 0,
    images: [],
    attendees: [],
    activities: [],
  });

  // Load events from localStorage
  useEffect(() => {
    const loadedEvents = eventService.getAll();
    setEvents(loadedEvents);
  }, []);

  const handleOpenDialog = (event?: Event) => {
    if (event) {
      setEditingId(event.id);
      setFormData(event);
    } else {
      setEditingId(null);
      setFormData({
        title: "",
        slug: "",
        date: "",
        location: "",
        shortDescription: "",
        fullDescription: "",
        category: "workshop",
        featured: false,
        capacity: 50,
        registered: 0,
        images: [],
        attendees: [],
        activities: [],
      });
    }
    setOpen(true);
  };

  const handleSaveEvent = () => {
    if (!formData.title || !formData.slug || !formData.date) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      let updatedEvent: Event;
      if (editingId) {
        const result = eventService.update(editingId, formData);
        if (!result) {
          toast.error("Failed to update event");
          return;
        }
        updatedEvent = result;
        setEvents(events.map((e) => (e.id === editingId ? updatedEvent : e)));
        toast.success("Event updated successfully");
      } else {
        updatedEvent = eventService.create(
          formData as Omit<Event, "id" | "createdAt" | "updatedAt">
        );
        setEvents([...events, updatedEvent]);
        toast.success("Event created successfully");
      }
      setOpen(false);
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleDeleteEvent = (id: string) => {
    try {
      if (eventService.delete(id)) {
        setEvents(events.filter((e) => e.id !== id));
        toast.success("Event deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete event");
    } finally {
      setDeleteId(null);
    }
  };

  const handleExportCSV = () => {
    const csv = eventService.exportToCSV(events);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "events_attendees.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV exported successfully");
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || event.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <AdminLayout title="Events Management">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex-1 w-full">
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Select
            value={categoryFilter}
            onValueChange={(value) =>
              setCategoryFilter(value as EventCategory | "all")
            }
          >
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {EVENT_CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => handleOpenDialog()}
                className="bg-gradient-to-r from-jengacode-purple to-jengacode-cyan w-full sm:w-auto"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Event
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? "Edit Event" : "Create New Event"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    value={formData.title || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="e.g., Summer Coding Camp"
                  />
                </div>
                <div>
                  <Label htmlFor="slug">URL Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    placeholder="e.g., summer-coding-camp"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category || "workshop"}
                      onValueChange={(value) =>
                        setFormData({
                          ...formData,
                          category: value as EventCategory,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {EVENT_CATEGORIES.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="e.g., JengaCode Innovation Hub"
                  />
                </div>
                <div>
                  <Label htmlFor="short-desc">Short Description</Label>
                  <Input
                    id="short-desc"
                    value={formData.shortDescription || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        shortDescription: e.target.value,
                      })
                    }
                    placeholder="Brief description for listings"
                  />
                </div>
                <div>
                  <Label htmlFor="full-desc">Full Description</Label>
                  <Textarea
                    id="full-desc"
                    value={formData.fullDescription || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fullDescription: e.target.value,
                      })
                    }
                    placeholder="Detailed description"
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={formData.capacity || 0}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          capacity: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="registered">Registered</Label>
                    <Input
                      id="registered"
                      type="number"
                      value={formData.registered || 0}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          registered: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={formData.featured || false}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, featured: checked })
                    }
                  />
                  <Label>Featured Event</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveEvent}
                  className="bg-gradient-to-r from-jengacode-purple to-jengacode-cyan"
                >
                  {editingId ? "Update Event" : "Create Event"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button
            variant="outline"
            onClick={handleExportCSV}
            className="w-full sm:w-auto"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Events List ({filteredEvents.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEvents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        No events found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredEvents.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">{event.title}</TableCell>
                        <TableCell>{event.date}</TableCell>
                        <TableCell>{event.location}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            {event.category}
                          </span>
                        </TableCell>
                        <TableCell>
                          {event.registered}/{event.capacity}
                        </TableCell>
                        <TableCell>
                          {event.featured ? (
                            <span className="text-jengacode-cyan font-semibold">★</span>
                          ) : (
                            <span className="text-gray-400">☆</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleOpenDialog(event)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setDeleteId(event.id)}
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Event</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this event? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogContent>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDeleteEvent(deleteId)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogContent>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
