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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Trash2,
  Copy,
  Download,
  Image as ImageIcon,
  Play,
  File,
} from "lucide-react";
import { toast } from "sonner";
import { Media } from "@/types/event";
import { mediaService, eventService } from "@/lib/admin-services";
import { formatDistanceToNow } from "date-fns";

export default function MediaManager() {
  const [mediaItems, setMediaItems] = useState<Media[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "image" | "video" | "document">(
    "all"
  );
  const [eventFilter, setEventFilter] = useState<string>("all");
  const [formData, setFormData] = useState<Partial<Media>>({
    url: "",
    caption: "",
    type: "image",
    uploadedBy: "admin",
    eventId: undefined,
  });

  useEffect(() => {
    const loadedMedia = mediaService.getAll();
    const loadedEvents = eventService.getAll();
    setMediaItems(loadedMedia);
    setEvents(loadedEvents);
  }, []);

  const handleOpenDialog = () => {
    setFormData({
      url: "",
      caption: "",
      type: "image",
      uploadedBy: "admin",
      eventId: undefined,
    });
    setOpen(true);
  };

  const handleAddMedia = () => {
    if (!formData.url) {
      toast.error("Please enter a media URL");
      return;
    }

    try {
      const newMedia = mediaService.create(
        formData as Omit<Media, "id" | "createdAt">
      );
      setMediaItems([...mediaItems, newMedia]);
      toast.success("Media uploaded successfully");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to upload media");
    }
  };

  const handleDeleteMedia = (id: string) => {
    try {
      if (mediaService.delete(id)) {
        setMediaItems(mediaItems.filter((m) => m.id !== id));
        toast.success("Media deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete media");
    } finally {
      setDeleteId(null);
    }
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
  };

  const filteredMedia = mediaItems.filter((item) => {
    const matchesSearch = item.caption
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || item.type === typeFilter;
    const matchesEvent =
      eventFilter === "all" || item.eventId === eventFilter;
    return matchesSearch && matchesType && matchesEvent;
  });

  const getMediaIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="w-4 h-4" />;
      case "video":
        return <Play className="w-4 h-4" />;
      case "document":
        return <File className="w-4 h-4" />;
      default:
        return <ImageIcon className="w-4 h-4" />;
    }
  };

  return (
    <AdminLayout title="Media Manager">
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          <div className="flex-1 w-full">
            <Input
              placeholder="Search media..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Select
            value={typeFilter}
            onValueChange={(value) =>
              setTypeFilter(value as "all" | "image" | "video" | "document")
            }
          >
            <SelectTrigger className="w-full lg:w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="image">Images</SelectItem>
              <SelectItem value="video">Videos</SelectItem>
              <SelectItem value="document">Documents</SelectItem>
            </SelectContent>
          </Select>
          <Select value={eventFilter} onValueChange={setEventFilter}>
            <SelectTrigger className="w-full lg:w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              {events.map((event) => (
                <SelectItem key={event.id} value={event.id}>
                  {event.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={handleOpenDialog}
                className="bg-gradient-to-r from-jengacode-purple to-jengacode-cyan w-full lg:w-auto"
              >
                <Plus className="w-4 h-4 mr-2" />
                Upload Media
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Upload Media</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="url">Media URL *</Label>
                  <Input
                    id="url"
                    value={formData.url || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, url: e.target.value })
                    }
                    placeholder="https://example.com/media.jpg"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Media Type</Label>
                  <Select
                    value={formData.type || "image"}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        type: value as "image" | "video" | "document",
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="document">Document</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="caption">Caption</Label>
                  <Textarea
                    id="caption"
                    value={formData.caption || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, caption: e.target.value })
                    }
                    placeholder="Describe the media"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="event">Related Event (Optional)</Label>
                  <Select
                    value={formData.eventId || ""}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        eventId: value || undefined,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an event" />
                    </SelectTrigger>
                    <SelectContent>
                      {events.map((event) => (
                        <SelectItem key={event.id} value={event.id}>
                          {event.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleAddMedia}
                  className="bg-gradient-to-r from-jengacode-purple to-jengacode-cyan"
                >
                  Upload
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Media Library ({filteredMedia.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredMedia.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">
                  No media files found
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMedia.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {item.type === "image" && item.url && (
                      <div className="w-full h-40 bg-gray-100 dark:bg-gray-800 overflow-hidden">
                        <img
                          src={item.url}
                          alt={item.caption || "Media"}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src =
                              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23ccc' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle' font-family='Arial' font-size='16' fill='%23999'%3EImage not found%3C/text%3E%3C/svg%3E";
                          }}
                        />
                      </div>
                    )}
                    {item.type === "video" && (
                      <div className="w-full h-40 bg-gray-900 dark:bg-gray-800 flex items-center justify-center">
                        <Play className="w-10 h-10 text-jengacode-cyan" />
                      </div>
                    )}
                    {item.type === "document" && (
                      <div className="w-full h-40 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <File className="w-10 h-10 text-gray-400" />
                      </div>
                    )}
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        {getMediaIcon(item.type)}
                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {item.type}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {item.caption || "Untitled Media"}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                        {formatDistanceToNow(new Date(item.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleCopyLink(item.url)}
                        >
                          <Copy className="w-3 h-3 mr-1" />
                          Copy
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(item.url, "_blank")}
                        >
                          <Download className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteId(item.id)}
                        >
                          <Trash2 className="w-3 h-3 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Media</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this media file? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogContent>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDeleteMedia(deleteId)}
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
