"use client";

import React, { useState, useEffect } from "react";
import { KindeAdminLayout } from "@/components/admin/kinde-admin-layout";
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
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Edit, Trash2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { ImageUploader } from "@/components/admin/image-uploader";
import { format } from "date-fns";

const EVENT_CATEGORIES = [
  "workshop",
  "camp",
  "competition",
  "showcase",
  "community",
  "bootcamp",
  "challenge",
  "other",
];

interface EventFormData {
  title: string;
  slug: string;
  date: string;
  location: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  featured: boolean;
  capacity: number;
  registered: number;
  price: string;
  ageRange: string;
  posterUrl: string;
}

interface Event extends EventFormData {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export default function EventsManagement() {
  const [events, setEvents] = useState<Event[]>([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);
  const [posterUrl, setPosterUrl] = useState("");
  const [formData, setFormData] = useState<EventFormData>({
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
    price: "",
    ageRange: "",
    posterUrl: "",
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/events");
      if (!response.ok) throw new Error("Failed to load events");
      const data = await response.json();
      setEvents(data.data || []);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to load events");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDialog = (event?: Event) => {
    if (event) {
      setEditingId(event.id);
      setFormData(event);
      setPosterUrl(event.posterUrl);
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
        price: "",
        ageRange: "",
        posterUrl: "",
      });
      setPosterUrl("");
    }
    setOpen(true);
  };

  const handleSaveEvent = async () => {
    if (!formData.title || !formData.slug || !formData.date) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setIsLoading(true);
      const payload = {
        ...formData,
        date: new Date(formData.date).toISOString(),
        posterUrl: posterUrl,
      };

      if (editingId) {
        const response = await fetch(`/api/admin/events/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error("Failed to update event");
        const data = await response.json();
        setEvents(events.map((e) => (e.id === editingId ? data.data : e)));
        toast.success("Event updated successfully");
      } else {
        const response = await fetch("/api/admin/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error("Failed to create event");
        const data = await response.json();
        setEvents([...events, data.data]);
        toast.success("Event created successfully");
      }
      setOpen(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/admin/events/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete event");
      setEvents(events.filter((e) => e.id !== id));
      toast.success("Event deleted successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete event");
    } finally {
      setIsLoading(false);
      setDeleteId(null);
    }
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
    <KindeAdminLayout title="Events Management">
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
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
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
                  <Label>Event Poster</Label>
                  {posterUrl && (
                    <div className="mt-2 mb-4 relative inline-block">
                      <img
                        src={posterUrl}
                        alt="Poster preview"
                        className="max-h-40 rounded-lg"
                      />
                      <button
                        onClick={() => setPosterUrl("")}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                  {!posterUrl && (
                    <ImageUploader
                      onUploadSuccess={(url) => {
                        setPosterUrl(url);
                        toast.success("Poster uploaded");
                      }}
                      folder="jengacode/events/posters"
                    />
                  )}
                </div>

                <div>
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
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
                    value={formData.slug}
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
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData({ ...formData, category: value })
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
                  <Label htmlFor="location">Venue/Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="e.g., JengaCode Innovation Hub"
                  />
                </div>

                <div>
                  <Label htmlFor="price">Charges/Price</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    placeholder="e.g., 5000"
                  />
                </div>

                <div>
                  <Label htmlFor="short-desc">Short Description</Label>
                  <Input
                    id="short-desc"
                    value={formData.shortDescription}
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
                  <Label htmlFor="full-desc">Event Details/Description</Label>
                  <Textarea
                    id="full-desc"
                    value={formData.fullDescription}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fullDescription: e.target.value,
                      })
                    }
                    placeholder="Detailed event information"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={formData.capacity}
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
                      value={formData.registered}
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
                    checked={formData.featured}
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
                  disabled={isLoading}
                  className="bg-gradient-to-r from-jengacode-purple to-jengacode-cyan"
                >
                  {isLoading
                    ? "Saving..."
                    : editingId
                    ? "Update Event"
                    : "Create Event"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Events List ({filteredEvents.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && filteredEvents.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-400">Loading...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Venue</TableHead>
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
                          <TableCell className="font-medium">
                            {event.title}
                          </TableCell>
                          <TableCell>
                            {format(new Date(event.date), "MMM dd, yyyy")}
                          </TableCell>
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
                              <span className="text-jengacode-cyan font-semibold">
                                ★
                              </span>
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
                                asChild
                              >
                                <a href={`/admin/events/${event.id}/gallery`}>
                                  <ImageIcon className="w-4 h-4" />
                                </a>
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
            )}
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
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDeleteEvent(deleteId)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </KindeAdminLayout>
  );
}
