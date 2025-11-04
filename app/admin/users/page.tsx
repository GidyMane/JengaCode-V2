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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Edit, Trash2, Shield } from "lucide-react";
import { toast } from "sonner";
import { AdminUser, UserRole } from "@/types/event";
import { adminUserService } from "@/lib/admin-services";
import { formatDistanceToNow } from "date-fns";

const ROLE_COLORS: Record<UserRole, string> = {
  Admin: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  Editor: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Volunteer: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
};

const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  Admin: "Full CRUD + user management",
  Editor: "CRUD for content only (no user mgmt)",
  Volunteer: "Can upload media, view dashboard, no deletion",
};

export default function UsersManagement() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all");
  const [formData, setFormData] = useState<Partial<AdminUser>>({
    name: "",
    email: "",
    role: "Editor",
  });

  useEffect(() => {
    const loadedUsers = adminUserService.getAll();
    setUsers(loadedUsers);
  }, []);

  const handleOpenDialog = (user?: AdminUser) => {
    if (user) {
      setEditingId(user.id);
      setFormData(user);
    } else {
      setEditingId(null);
      setFormData({
        name: "",
        email: "",
        role: "Editor",
      });
    }
    setOpen(true);
  };

  const handleSaveUser = () => {
    if (!formData.name || !formData.email || !formData.role) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      let savedUser: AdminUser;
      if (editingId) {
        const result = adminUserService.update(editingId, formData);
        if (!result) {
          toast.error("Failed to update user");
          return;
        }
        savedUser = result;
        setUsers(users.map((u) => (u.id === editingId ? savedUser : u)));
        toast.success("User updated successfully");
      } else {
        // Check if email already exists
        if (users.some((u) => u.email === formData.email)) {
          toast.error("A user with this email already exists");
          return;
        }

        savedUser = adminUserService.create(
          formData as Omit<AdminUser, "id" | "createdAt" | "updatedAt">
        );
        setUsers([...users, savedUser]);
        toast.success("User added successfully");
      }
      setOpen(false);
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleDeleteUser = (id: string) => {
    try {
      if (adminUserService.delete(id)) {
        setUsers(users.filter((u) => u.id !== id));
        toast.success("User deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete user");
    } finally {
      setDeleteId(null);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const roleStats = {
    Admin: users.filter((u) => u.role === "Admin").length,
    Editor: users.filter((u) => u.role === "Editor").length,
    Volunteer: users.filter((u) => u.role === "Volunteer").length,
  };

  return (
    <AdminLayout title="Users Management" requiredRoles={["Admin"]}>
      <div className="space-y-6">
        {/* Role Distribution Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Users
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {users.length}
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
                    Admins
                  </p>
                  <p className="text-3xl font-bold text-red-600 mt-2">
                    {roleStats.Admin}
                  </p>
                </div>
                <Shield className="w-6 h-6 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Editors
                  </p>
                  <p className="text-3xl font-bold text-blue-600 mt-2">
                    {roleStats.Editor}
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
                    Volunteers
                  </p>
                  <p className="text-3xl font-bold text-green-600 mt-2">
                    {roleStats.Volunteer}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Create */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex-1 w-full">
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Select
            value={roleFilter}
            onValueChange={(value) =>
              setRoleFilter(value as UserRole | "all")
            }
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="Admin">Admins</SelectItem>
              <SelectItem value="Editor">Editors</SelectItem>
              <SelectItem value="Volunteer">Volunteers</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => handleOpenDialog()}
                className="bg-gradient-to-r from-jengacode-purple to-jengacode-cyan w-full sm:w-auto"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? "Edit User" : "Add New User"}
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
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role *</Label>
                  <Select
                    value={formData.role || "Editor"}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        role: value as UserRole,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Editor">Editor</SelectItem>
                      <SelectItem value="Volunteer">Volunteer</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                    {formData.role &&
                      ROLE_DESCRIPTIONS[formData.role as UserRole]}
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveUser}
                  className="bg-gradient-to-r from-jengacode-purple to-jengacode-cyan"
                >
                  {editingId ? "Update" : "Add"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Users ({filteredUsers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        No users found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-gradient-to-br from-jengacode-purple to-jengacode-cyan text-white text-xs font-semibold">
                                {user.name
                                  .split(" ")
                                  .map((n) => n.charAt(0))
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {user.name}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                          {user.email}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              ROLE_COLORS[user.role as UserRole] ||
                              "bg-gray-100 text-gray-800"
                            }
                          >
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {ROLE_DESCRIPTIONS[user.role as UserRole]}
                          </p>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                          {formatDistanceToNow(new Date(user.createdAt), {
                            addSuffix: true,
                          })}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleOpenDialog(user)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setDeleteId(user.id)}
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

        {/* Role Permissions Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>Role Permissions Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(["Admin", "Editor", "Volunteer"] as UserRole[]).map((role) => (
                <div
                  key={role}
                  className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <Badge className={ROLE_COLORS[role]}>{role}</Badge>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {ROLE_DESCRIPTIONS[role]}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this user? This action cannot be
              undone and they will lose access to the admin panel.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogContent>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDeleteUser(deleteId)}
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
