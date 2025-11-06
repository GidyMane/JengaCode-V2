"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { KindeAdminLayout } from "@/components/admin/kinde-admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { ImageUploader } from "@/components/admin/image-uploader";
import { Plus, Trash2, ArrowLeft, Loader } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface EventImage {
  id: string;
  url: string;
  alt: string;
  caption: string;
  featured: boolean;
  createdAt: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
}

export default function EventGallery() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [images, setImages] = useState<EventImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({
    alt: "",
    caption: "",
  });

  useEffect(() => {
    loadEventAndImages();
  }, [eventId]);

  const loadEventAndImages = async () => {
    try {
      setIsLoading(true);
      const [eventResponse, imagesResponse] = await Promise.all([
        fetch(`/api/admin/events/${eventId}`),
        fetch(`/api/admin/events/${eventId}/images`),
      ]);

      if (!eventResponse.ok) {
        toast.error("Event not found");
        router.push("/admin/events");
        return;
      }

      const eventData = await eventResponse.json();
      setEvent(eventData.data);

      if (imagesResponse.ok) {
        const imagesData = await imagesResponse.json();
        setImages(imagesData.data || []);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to load event"
      );
      router.push("/admin/events");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDialog = () => {
    setImageUrl("");
    setFormData({ alt: "", caption: "" });
    setOpen(true);
  };

  const handleAddImage = async () => {
    if (!imageUrl) {
      toast.error("Please upload an image");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`/api/admin/events/${eventId}/images`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: imageUrl,
          alt: formData.alt || event?.title || "Event image",
          caption: formData.caption,
        }),
      });

      if (!response.ok) throw new Error("Failed to add image");

      const data = await response.json();
      setImages([...images, data.data]);
      toast.success("Image added to gallery");
      setOpen(false);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to add image"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteImage = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/admin/events/${eventId}/images?imageId=${id}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Failed to delete image");

      setImages(images.filter((img) => img.id !== id));
      toast.success("Image deleted");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete image"
      );
    } finally {
      setIsLoading(false);
      setDeleteId(null);
    }
  };

  if (isLoading && !event) {
    return (
      <KindeAdminLayout title="Event Gallery">
        <div className="flex items-center justify-center h-96">
          <Loader className="w-8 h-8 animate-spin text-purple-500" />
        </div>
      </KindeAdminLayout>
    );
  }

  if (!event) {
    return null;
  }

  return (
    <KindeAdminLayout title={`Gallery - ${event.title}`}>
      <div className="space-y-6">
        <Button
          variant="outline"
          onClick={() => router.push("/admin/events")}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Events
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Event Name
                </p>
                <p className="text-lg font-semibold">{event.title}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Date</p>
                <p className="text-lg font-semibold">
                  {format(new Date(event.date), "MMMM dd, yyyy")}
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Venue
                </p>
                <p className="text-lg font-semibold">{event.location}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Event Gallery
          </h2>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={handleOpenDialog}
                className="bg-gradient-to-r from-jengacode-purple to-jengacode-cyan"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Image
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add Image to Gallery</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Upload Image</Label>
                  <div className="mt-2">
                    {imageUrl && (
                      <div className="mb-4 relative inline-block">
                        <img
                          src={imageUrl}
                          alt="Preview"
                          className="max-h-40 rounded-lg"
                        />
                        <button
                          onClick={() => setImageUrl("")}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                    {!imageUrl && (
                      <ImageUploader
                        onUploadSuccess={(url) => {
                          setImageUrl(url);
                          toast.success("Image uploaded to Cloudinary");
                        }}
                        folder={`jengacode/events/${eventId}`}
                      />
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="alt">Image Alt Text</Label>
                  <Input
                    id="alt"
                    value={formData.alt}
                    onChange={(e) =>
                      setFormData({ ...formData, alt: e.target.value })
                    }
                    placeholder="Describe the image"
                  />
                </div>

                <div>
                  <Label htmlFor="caption">Image Caption</Label>
                  <Textarea
                    id="caption"
                    value={formData.caption}
                    onChange={(e) =>
                      setFormData({ ...formData, caption: e.target.value })
                    }
                    placeholder="Add a caption for the image"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleAddImage}
                  disabled={isLoading || !imageUrl}
                  className="bg-gradient-to-r from-jengacode-purple to-jengacode-cyan"
                >
                  {isLoading ? "Adding..." : "Add to Gallery"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardContent className="pt-6">
            {images.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  No images in this event's gallery yet
                </p>
                <Button
                  onClick={handleOpenDialog}
                  className="bg-gradient-to-r from-jengacode-purple to-jengacode-cyan"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Image
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="w-full h-40 bg-gray-100 dark:bg-gray-800 overflow-hidden">
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23ccc' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle' font-family='Arial' font-size='16' fill='%23999'%3EImage not found%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-sm font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {image.alt || "Untitled"}
                      </p>
                      {image.caption && (
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                          {image.caption}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 dark:text-gray-500 mb-3">
                        {format(new Date(image.createdAt), "MMM dd, yyyy")}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        onClick={() => setDeleteId(image.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
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
            <AlertDialogTitle>Delete Image</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this image from the gallery? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDeleteImage(deleteId)}
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
