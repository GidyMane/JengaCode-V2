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
import { Plus, Edit, Trash2, Check, X, Upload } from "lucide-react";
import { toast } from "sonner";
import { Testimonial } from "@/types/event";
import { testimonialService } from "@/lib/admin-services";
import { formatDistanceToNow } from "date-fns";

export default function TestimonialsManagement() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "approved" | "pending">(
    "all"
  );
  const [roleFilter, setRoleFilter] = useState<"all" | "Student" | "Parent">(
    "all"
  );
  const [formData, setFormData] = useState<Partial<Testimonial>>({
    name: "",
    role: "Student",
    text: "",
    photo: "",
  });

  useEffect(() => {
    const loadedTestimonials = testimonialService.getAll();
    setTestimonials(loadedTestimonials);
  }, []);

  const handleOpenDialog = (testimonial?: Testimonial) => {
    if (testimonial) {
      setEditingId(testimonial.id);
      setFormData(testimonial);
    } else {
      setEditingId(null);
      setFormData({
        name: "",
        role: "Student",
        text: "",
        photo: "",
      });
    }
    setOpen(true);
  };

  const handleSaveTestimonial = () => {
    if (!formData.name || !formData.text) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      if (editingId) {
        const result = testimonialService.approve(editingId);
        if (!result) {
          toast.error("Failed to update testimonial");
          return;
        }
        setTestimonials(
          testimonials.map((t) => (t.id === editingId ? result : t))
        );
        toast.success("Testimonial updated successfully");
      }
      setOpen(false);
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleApprove = (id: string) => {
    try {
      const result = testimonialService.approve(id);
      if (result) {
        setTestimonials(
          testimonials.map((t) => (t.id === id ? result : t))
        );
        toast.success("Testimonial approved");
      }
    } catch (error) {
      toast.error("Failed to approve testimonial");
    }
  };

  const handleReject = (id: string) => {
    try {
      if (testimonialService.reject(id)) {
        setTestimonials(testimonials.filter((t) => t.id !== id));
        toast.success("Testimonial rejected");
      }
    } catch (error) {
      toast.error("Failed to reject testimonial");
    }
  };

  const handleDeleteTestimonial = (id: string) => {
    try {
      if (testimonialService.reject(id)) {
        setTestimonials(testimonials.filter((t) => t.id !== id));
        toast.success("Testimonial deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete testimonial");
    } finally {
      setDeleteId(null);
    }
  };

  const filteredTestimonials = testimonials.filter((testimonial) => {
    const matchesSearch =
      testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "approved"
        ? testimonial.approved
        : !testimonial.approved);
    const matchesRole = roleFilter === "all" || testimonial.role === roleFilter;
    return matchesSearch && matchesStatus && matchesRole;
  });

  const stats = {
    total: testimonials.length,
    approved: testimonials.filter((t) => t.approved).length,
    pending: testimonials.filter((t) => !t.approved).length,
  };

  return (
    <KindeAdminLayout title="Testimonials Management">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Testimonials
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {stats.total}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Approved
                  </p>
                  <p className="text-3xl font-bold text-green-600 mt-2">
                    {stats.approved}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Pending Approval
                  </p>
                  <p className="text-3xl font-bold text-yellow-600 mt-2">
                    {stats.pending}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex-1 w-full">
            <Input
              placeholder="Search testimonials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={(value) =>
              setStatusFilter(value as "all" | "approved" | "pending")
            }
          >
            <SelectTrigger className="w-full sm:w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={roleFilter}
            onValueChange={(value) =>
              setRoleFilter(value as "all" | "Student" | "Parent")
            }
          >
            <SelectTrigger className="w-full sm:w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="Student">Students</SelectItem>
              <SelectItem value="Parent">Parents</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => handleOpenDialog()}
                className="bg-gradient-to-r from-jengacode-purple to-jengacode-cyan w-full sm:w-auto"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Testimonial
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? "Edit Testimonial" : "Add New Testimonial"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g., Sarah Johnson"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="role">Role *</Label>
                    <Select
                      value={formData.role || "Student"}
                      onValueChange={(value) =>
                        setFormData({
                          ...formData,
                          role: value as "Student" | "Parent",
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Student">Student</SelectItem>
                        <SelectItem value="Parent">Parent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="text">Testimonial Text *</Label>
                  <Textarea
                    id="text"
                    value={formData.text || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, text: e.target.value })
                    }
                    placeholder="What did you like about JengaCode?"
                    rows={5}
                  />
                </div>
                <div>
                  <Label htmlFor="photo">Photo URL</Label>
                  <Input
                    id="photo"
                    value={formData.photo || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, photo: e.target.value })
                    }
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveTestimonial}
                  className="bg-gradient-to-r from-jengacode-purple to-jengacode-cyan"
                >
                  {editingId ? "Update" : "Create"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Testimonials Table */}
        <Card>
          <CardHeader>
            <CardTitle>Testimonials ({filteredTestimonials.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Testimonial</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTestimonials.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        No testimonials found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTestimonials.map((testimonial) => (
                      <TableRow key={testimonial.id}>
                        <TableCell className="font-medium">
                          {testimonial.name}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{testimonial.role}</Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {testimonial.text}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              testimonial.approved
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            }
                          >
                            {testimonial.approved ? "Approved" : "Pending"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">
                          {formatDistanceToNow(new Date(testimonial.createdAt), {
                            addSuffix: true,
                          })}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            {!testimonial.approved && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleApprove(testimonial.id)}
                                title="Approve"
                              >
                                <Check className="w-4 h-4 text-green-600" />
                              </Button>
                            )}
                            {!testimonial.approved && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleReject(testimonial.id)}
                                title="Reject"
                              >
                                <X className="w-4 h-4 text-red-500" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleOpenDialog(testimonial)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setDeleteId(testimonial.id)}
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
            <AlertDialogTitle>Delete Testimonial</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this testimonial? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogContent>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDeleteTestimonial(deleteId)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogContent>
        </AlertDialogContent>
      </AlertDialog>
    </KindeAdminLayout>
  );
}
