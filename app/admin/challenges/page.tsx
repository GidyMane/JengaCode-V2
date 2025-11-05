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
import { Plus, Edit, Trash2, Zap } from "lucide-react";
import { toast } from "sonner";
import { Challenge } from "@/types/event";
import { challengeService } from "@/lib/admin-services";

const DIFFICULTY_LEVELS = ["easy", "medium", "hard"];
const DIFFICULTY_COLORS = {
  easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  medium:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export default function ChallengesManagement() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<
    "all" | "easy" | "medium" | "hard"
  >("all");
  const [formData, setFormData] = useState<Partial<Challenge>>({
    title: "",
    description: "",
    difficulty: "easy",
    xp: 100,
    resourceLink: "",
  });

  useEffect(() => {
    const loadedChallenges = challengeService.getAll();
    setChallenges(loadedChallenges);
  }, []);

  const handleOpenDialog = (challenge?: Challenge) => {
    if (challenge) {
      setEditingId(challenge.id);
      setFormData(challenge);
    } else {
      setEditingId(null);
      setFormData({
        title: "",
        description: "",
        difficulty: "easy",
        xp: 100,
        resourceLink: "",
      });
    }
    setOpen(true);
  };

  const handleSaveChallenge = () => {
    if (!formData.title || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      let updatedChallenge: Challenge;
      if (editingId) {
        const result = challengeService.update(editingId, formData);
        if (!result) {
          toast.error("Failed to update challenge");
          return;
        }
        updatedChallenge = result;
        setChallenges(
          challenges.map((c) => (c.id === editingId ? updatedChallenge : c))
        );
        toast.success("Challenge updated successfully");
      } else {
        updatedChallenge = challengeService.create(
          formData as Omit<Challenge, "id" | "createdAt" | "updatedAt">
        );
        setChallenges([...challenges, updatedChallenge]);
        toast.success("Challenge created successfully");
      }
      setOpen(false);
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleDeleteChallenge = (id: string) => {
    try {
      if (challengeService.delete(id)) {
        setChallenges(challenges.filter((c) => c.id !== id));
        toast.success("Challenge deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete challenge");
    } finally {
      setDeleteId(null);
    }
  };

  const filteredChallenges = challenges.filter((challenge) => {
    const matchesSearch = challenge.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDifficulty =
      difficultyFilter === "all" || challenge.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  const challengesByDifficulty = {
    easy: challenges.filter((c) => c.difficulty === "easy").length,
    medium: challenges.filter((c) => c.difficulty === "medium").length,
    hard: challenges.filter((c) => c.difficulty === "hard").length,
  };

  return (
    <KindeAdminLayout title="Challenges Management">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Challenges
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {challenges.length}
                  </p>
                </div>
                <Zap className="w-6 h-6 text-jengacode-yellow" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Easy
                  </p>
                  <p className="text-3xl font-bold text-green-600 mt-2">
                    {challengesByDifficulty.easy}
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
                    Medium
                  </p>
                  <p className="text-3xl font-bold text-yellow-600 mt-2">
                    {challengesByDifficulty.medium}
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
                    Hard
                  </p>
                  <p className="text-3xl font-bold text-red-600 mt-2">
                    {challengesByDifficulty.hard}
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
              placeholder="Search challenges..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Select
            value={difficultyFilter}
            onValueChange={(value) =>
              setDifficultyFilter(value as "all" | "easy" | "medium" | "hard")
            }
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => handleOpenDialog()}
                className="bg-gradient-to-r from-jengacode-purple to-jengacode-cyan w-full sm:w-auto"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Challenge
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? "Edit Challenge" : "Create New Challenge"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Challenge Title *</Label>
                  <Input
                    id="title"
                    value={formData.title || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="e.g., Build a Calculator App"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="difficulty">Difficulty Level</Label>
                    <Select
                      value={formData.difficulty || "easy"}
                      onValueChange={(value) =>
                        setFormData({
                          ...formData,
                          difficulty: value as "easy" | "medium" | "hard",
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="xp">XP Points</Label>
                    <Input
                      id="xp"
                      type="number"
                      value={formData.xp || 0}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          xp: parseInt(e.target.value),
                        })
                      }
                      placeholder="e.g., 100"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    placeholder="Describe the challenge"
                    rows={5}
                  />
                </div>
                <div>
                  <Label htmlFor="resource">Resource Link (Optional)</Label>
                  <Input
                    id="resource"
                    value={formData.resourceLink || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        resourceLink: e.target.value,
                      })
                    }
                    placeholder="https://example.com/tutorial"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveChallenge}
                  className="bg-gradient-to-r from-jengacode-purple to-jengacode-cyan"
                >
                  {editingId ? "Update Challenge" : "Create Challenge"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Challenges Table */}
        <Card>
          <CardHeader>
            <CardTitle>Challenges ({filteredChallenges.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>XP Points</TableHead>
                    <TableHead>Resource</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredChallenges.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        No challenges found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredChallenges.map((challenge) => (
                      <TableRow key={challenge.id}>
                        <TableCell className="font-medium max-w-xs truncate">
                          {challenge.title}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              DIFFICULTY_COLORS[
                                challenge.difficulty as keyof typeof DIFFICULTY_COLORS
                              ]
                            }
                          >
                            {challenge.difficulty.charAt(0).toUpperCase() +
                              challenge.difficulty.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Zap className="w-4 h-4 text-jengacode-yellow" />
                            <span>{challenge.xp}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {challenge.resourceLink ? (
                            <a
                              href={challenge.resourceLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-jengacode-cyan hover:underline text-sm"
                            >
                              View
                            </a>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleOpenDialog(challenge)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setDeleteId(challenge.id)}
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
            <AlertDialogTitle>Delete Challenge</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this challenge? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogContent>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDeleteChallenge(deleteId)}
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
