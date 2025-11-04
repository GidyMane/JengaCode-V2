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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Edit, Trash2, Linkedin } from "lucide-react";
import { toast } from "sonner";
import { TeamMember } from "@/types/event";
import { teamService } from "@/lib/admin-services";

export default function TeamManagement() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState<Partial<TeamMember>>({
    name: "",
    role: "",
    bio: "",
    photo: "",
    linkedin: "",
  });

  useEffect(() => {
    const loadedTeamMembers = teamService.getAll();
    setTeamMembers(loadedTeamMembers);
  }, []);

  const handleOpenDialog = (member?: TeamMember) => {
    if (member) {
      setEditingId(member.id);
      setFormData(member);
    } else {
      setEditingId(null);
      setFormData({
        name: "",
        role: "",
        bio: "",
        photo: "",
        linkedin: "",
      });
    }
    setOpen(true);
  };

  const handleSaveTeamMember = () => {
    if (!formData.name || !formData.role) {
      toast.error("Please fill in required fields");
      return;
    }

    try {
      let savedMember: TeamMember;
      if (editingId) {
        const result = teamService.update(editingId, formData);
        if (!result) {
          toast.error("Failed to update team member");
          return;
        }
        savedMember = result;
        setTeamMembers(
          teamMembers.map((m) => (m.id === editingId ? savedMember : m))
        );
        toast.success("Team member updated successfully");
      } else {
        savedMember = teamService.create(
          formData as Omit<TeamMember, "id" | "createdAt">
        );
        setTeamMembers([...teamMembers, savedMember]);
        toast.success("Team member added successfully");
      }
      setOpen(false);
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleDeleteTeamMember = (id: string) => {
    try {
      if (teamService.delete(id)) {
        setTeamMembers(teamMembers.filter((m) => m.id !== id));
        toast.success("Team member deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete team member");
    } finally {
      setDeleteId(null);
    }
  };

  const filteredTeamMembers = teamMembers.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout title="Team Management">
      <div className="space-y-6">
        {/* Stats Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Team Members
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {teamMembers.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Create */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex-1 w-full">
            <Input
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => handleOpenDialog()}
                className="bg-gradient-to-r from-jengacode-purple to-jengacode-cyan w-full sm:w-auto"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Member
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? "Edit Team Member" : "Add Team Member"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g., John Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role *</Label>
                  <Input
                    id="role"
                    value={formData.role || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    placeholder="e.g., Lead Instructor, Program Manager"
                  />
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    placeholder="Tell us about this team member"
                    rows={4}
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
                <div>
                  <Label htmlFor="linkedin">LinkedIn URL</Label>
                  <Input
                    id="linkedin"
                    value={formData.linkedin || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, linkedin: e.target.value })
                    }
                    placeholder="https://linkedin.com/in/johndoe"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveTeamMember}
                  className="bg-gradient-to-r from-jengacode-purple to-jengacode-cyan"
                >
                  {editingId ? "Update" : "Add"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Team Grid View */}
        {filteredTeamMembers.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                No team members found
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeamMembers.map((member) => (
              <Card key={member.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="w-14 h-14">
                      <AvatarImage
                        src={member.photo}
                        alt={member.name}
                      />
                      <AvatarFallback className="bg-gradient-to-br from-jengacode-purple to-jengacode-cyan text-white font-semibold">
                        {member.name
                          .split(" ")
                          .map((n) => n.charAt(0))
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {member.name}
                      </h3>
                      <p className="text-sm text-jengacode-purple dark:text-jengacode-cyan font-medium">
                        {member.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {member.bio || "No bio available"}
                  </p>
                  <div className="flex gap-2">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                        >
                          <Linkedin className="w-3 h-3 mr-1" />
                          LinkedIn
                        </Button>
                      </a>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenDialog(member)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeleteId(member.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Team Member</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this team member? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogContent>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                deleteId && handleDeleteTeamMember(deleteId)
              }
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
