"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  Star,
  Trophy,
  Lock,
  Play,
  ChevronRight,
  Gamepad2,
  Code,
  Rocket,
  Users,
  Brain,
  Wrench,
  Sparkles,
} from "lucide-react";
import { useAdventureProgress } from "./adventure-storage";

interface Activity {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: "Beginner" | "Easy" | "Medium" | "Hard";
  xp: number;
  unlocked: boolean;
  completed: boolean;
}

interface Zone {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  bgGradient: string;
  activities: Activity[];
  totalXP: number;
  userXP: number;
}

export function AdventureZones() {
  const { progress, exploreZone, completeActivity } = useAdventureProgress();
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const zones: Zone[] = [
    {
      id: "5-8",
      title: "Play & Learn Zone",
      subtitle: "Ages 5-8",
      description: "Discover coding through games and colorful adventures!",
      icon: "🎮",
      color: "from-purple-400 to-purple-600",
      bgGradient: "from-purple-600/20 to-purple-700/20",
      totalXP: 300,
      userXP: 0,
      activities: [
        {
          id: "scratch-jr",
          title: "Scratch Jr Adventures",
          description: "Create animated stories with colorful characters",
          icon: "🎨",
          difficulty: "Beginner",
          xp: 50,
          unlocked: true,
          completed: false,
        },
        {
          id: "robot-dance",
          title: "Robot Dance Party",
          description: "Program a robot to dance to your favorite songs",
          icon: "🤖",
          difficulty: "Easy",
          xp: 75,
          unlocked: true,
          completed: false,
        },
        {
          id: "color-quest",
          title: "Color Code Quest",
          description: "Learn colors and patterns through coding games",
          icon: "🌈",
          difficulty: "Beginner",
          xp: 50,
          unlocked: true,
          completed: false,
        },
        {
          id: "magic-shapes",
          title: "Magic Shape Creator",
          description: "Draw amazing shapes using simple code commands",
          icon: "✨",
          difficulty: "Easy",
          xp: 75,
          unlocked: false,
          completed: false,
        },
        {
          id: "story-builder",
          title: "Interactive Story Builder",
          description: "Create your own choose-your-adventure stories",
          icon: "📚",
          difficulty: "Medium",
          xp: 100,
          unlocked: false,
          completed: false,
        },
      ],
    },
    {
      id: "9-12",
      title: "Build & Explore Zone",
      subtitle: "Ages 9-12",
      description: "Create amazing projects and solve fun challenges!",
      icon: "🔧",
      color: "from-cyan-400 to-cyan-600",
      bgGradient: "from-cyan-600/20 to-cyan-700/20",
      totalXP: 500,
      userXP: 0,
      activities: [
        {
          id: "minecraft-mods",
          title: "Minecraft Mods Creator",
          description: "Build custom blocks and items for Minecraft",
          icon: "⛏️",
          difficulty: "Easy",
          xp: 100,
          unlocked: true,
          completed: false,
        },
        {
          id: "app-inventor",
          title: "App Inventor Workshop",
          description: "Create your first mobile app with drag-and-drop",
          icon: "📱",
          difficulty: "Medium",
          xp: 125,
          unlocked: true,
          completed: false,
        },
        {
          id: "arduino-robots",
          title: "Arduino Robot Builder",
          description: "Build and program robots that respond to sensors",
          icon: "🤖",
          difficulty: "Medium",
          xp: 150,
          unlocked: true,
          completed: false,
        },
        {
          id: "game-maker",
          title: "2D Game Maker",
          description: "Design and build your own platformer game",
          icon: "🎮",
          difficulty: "Hard",
          xp: 175,
          unlocked: false,
          completed: false,
        },
        {
          id: "ai-chatbot",
          title: "AI Chatbot Creator",
          description: "Build a smart chatbot that answers questions",
          icon: "🧠",
          difficulty: "Hard",
          xp: 200,
          unlocked: false,
          completed: false,
        },
      ],
    },
    {
      id: "13-17",
      title: "Hack & Lead Zone",
      subtitle: "Ages 13-17",
      description: "Lead teams, build real apps, and change the world!",
      icon: "🚀",
      color: "from-yellow-400 to-yellow-600",
      bgGradient: "from-yellow-600/20 to-yellow-700/20",
      totalXP: 750,
      userXP: 0,
      activities: [
        {
          id: "web-dev",
          title: "Full-Stack Web Development",
          description: "Build modern websites with React and Node.js",
          icon: "💻",
          difficulty: "Medium",
          xp: 150,
          unlocked: true,
          completed: false,
        },
        {
          id: "ai-projects",
          title: "Machine Learning Projects",
          description: "Train AI models to recognize images and text",
          icon: "🧠",
          difficulty: "Hard",
          xp: 200,
          unlocked: true,
          completed: false,
        },
        {
          id: "startup-challenge",
          title: "Startup Challenge",
          description: "Pitch and build a real startup with mentorship",
          icon: "💡",
          difficulty: "Hard",
          xp: 250,
          unlocked: true,
          completed: false,
        },
        {
          id: "blockchain-dev",
          title: "Blockchain Development",
          description: "Create smart contracts and decentralized apps",
          icon: "⛓️",
          difficulty: "Hard",
          xp: 200,
          unlocked: false,
          completed: false,
        },
        {
          id: "mentorship",
          title: "Peer Mentorship Program",
          description: "Lead and mentor younger JengaCode members",
          icon: "🎓",
          difficulty: "Medium",
          xp: 100,
          unlocked: false,
          completed: false,
        },
      ],
    },
  ];

  const handleExploreZone = (zoneId: string) => {
    exploreZone(zoneId);
    setSelectedZone(zoneId);
    toast.success("Zone explored! Keep going to unlock more activities! 🚀");
  };

  const handleCompleteActivity = (zoneId: string, activityId: string) => {
    const zone = zones.find((z) => z.id === zoneId);
    const activity = zone?.activities.find((a) => a.id === activityId);

    if (zone && activity && !progress.completedActivities.has(activityId)) {
      completeActivity(zoneId, activityId, activity.xp);
      toast.success(`🎉 Activity completed! +${activity.xp} XP earned!`);
    }
  };

  const getZoneBadge = (zone: Zone) => {
    const completedCount = zone.activities.filter((a) =>
      progress.completedActivities.has(a.id),
    ).length;

    if (completedCount === 0) return null;
    if (completedCount < 3) return "Explorer";
    if (completedCount < 5) return "Builder";
    return "Master";
  };

  // Update zones with current progress
  zones.forEach((zone) => {
    zone.userXP = progress.userXP[zone.id] || 0;

    // Update activity unlock status based on completed activities
    zone.activities.forEach((activity, index) => {
      if (index === 0) {
        activity.unlocked = true; // First activity is always unlocked
      } else {
        // Unlock if previous activity is completed
        const previousActivity = zone.activities[index - 1];
        activity.unlocked = progress.completedActivities.has(
          previousActivity.id,
        );
      }

      activity.completed = progress.completedActivities.has(activity.id);
    });
  });

  const selectedZoneData = zones.find((z) => z.id === selectedZone);

  return (
    <div className="space-y-8">
      {/* Zone Selection Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {zones.map((zone, index) => (
          <motion.div
            key={zone.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.05, rotateY: 5 }}
            className="cursor-pointer"
            onClick={() => handleExploreZone(zone.id)}
          >
            <Card
              className={`bg-gradient-to-br ${zone.color} border-0 shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 h-full relative overflow-hidden`}
            >
              <CardContent className="p-8 text-center text-white relative z-10">
                <div className="text-6xl mb-4">{zone.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{zone.title}</h3>
                <p className="text-lg opacity-90 mb-4">{zone.subtitle}</p>
                <p className="mb-6 opacity-80">{zone.description}</p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm opacity-90 mb-2">
                    <span>Progress</span>
                    <span>
                      {zone.userXP}/{zone.totalXP} XP
                    </span>
                  </div>
                  <Progress
                    value={(zone.userXP / zone.totalXP) * 100}
                    className="h-2"
                  />
                </div>

                {/* Activity Preview */}
                <div className="space-y-2 mb-6">
                  {zone.activities.slice(0, 3).map((activity) => (
                    <div
                      key={activity.id}
                      className={`bg-white/20 rounded-full px-3 py-1 text-sm flex items-center justify-between ${
                        progress.completedActivities.has(activity.id)
                          ? "bg-green-500/30"
                          : ""
                      }`}
                    >
                      <span>
                        {activity.icon} {activity.title}
                      </span>
                      {progress.completedActivities.has(activity.id) && (
                        <Star className="w-3 h-3 text-yellow-300" />
                      )}
                    </div>
                  ))}
                </div>

                <Button className="bg-white/20 hover:bg-white/30 text-white border-0 rounded-full mb-4 w-full">
                  Explore Zone <ChevronRight className="ml-2 w-4 h-4" />
                </Button>

                {/* Zone Badge */}
                {progress.exploredZones.has(zone.id) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mt-4"
                  >
                    <Badge className="bg-yellow-400 text-yellow-900 font-bold">
                      <Star className="w-4 h-4 mr-1" />
                      {getZoneBadge(zone) || "Explorer"} Badge!
                    </Badge>
                  </motion.div>
                )}
              </CardContent>

              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                {zone.id === "5-8" && (
                  <Gamepad2 className="w-32 h-32 absolute top-4 right-4" />
                )}
                {zone.id === "9-12" && (
                  <Wrench className="w-32 h-32 absolute top-4 right-4" />
                )}
                {zone.id === "13-17" && (
                  <Rocket className="w-32 h-32 absolute top-4 right-4" />
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Detailed Zone View */}
      <AnimatePresence>
        {selectedZoneData && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className={`bg-gradient-to-br ${selectedZoneData.bgGradient} rounded-xl p-8 border border-white/20`}
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2 flex items-center">
                  {selectedZoneData.icon} {selectedZoneData.title}
                </h3>
                <p className="text-gray-300">{selectedZoneData.description}</p>
              </div>
              <Button
                onClick={() => setSelectedZone(null)}
                variant="ghost"
                className="text-white hover:bg-white/20"
              >
                ✕
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedZoneData.activities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className={`bg-white/10 border-white/20 ${!activity.unlocked ? "opacity-50" : ""}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="text-2xl">{activity.icon}</div>
                        {!activity.unlocked && (
                          <Lock className="w-4 h-4 text-gray-400" />
                        )}
                        {progress.completedActivities.has(activity.id) && (
                          <Trophy className="w-4 h-4 text-yellow-400" />
                        )}
                      </div>

                      <h4 className="font-bold text-white mb-2">
                        {activity.title}
                      </h4>
                      <p className="text-sm text-gray-300 mb-3">
                        {activity.description}
                      </p>

                      <div className="flex justify-between items-center mb-3">
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            activity.difficulty === "Beginner"
                              ? "border-green-400 text-green-400"
                              : activity.difficulty === "Easy"
                                ? "border-blue-400 text-blue-400"
                                : activity.difficulty === "Medium"
                                  ? "border-yellow-400 text-yellow-400"
                                  : "border-red-400 text-red-400"
                          }`}
                        >
                          {activity.difficulty}
                        </Badge>
                        <span className="text-xs text-gray-300">
                          {activity.xp} XP
                        </span>
                      </div>

                      <Button
                        className="w-full"
                        disabled={!activity.unlocked}
                        onClick={() =>
                          handleCompleteActivity(
                            selectedZoneData.id,
                            activity.id,
                          )
                        }
                        variant={
                          progress.completedActivities.has(activity.id)
                            ? "secondary"
                            : "default"
                        }
                      >
                        {progress.completedActivities.has(activity.id) ? (
                          <>
                            <Trophy className="w-4 h-4 mr-2" />
                            Completed
                          </>
                        ) : activity.unlocked ? (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Start Activity
                          </>
                        ) : (
                          <>
                            <Lock className="w-4 h-4 mr-2" />
                            Locked
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
