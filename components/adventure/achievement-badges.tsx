"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Star, Trophy, Medal, Crown, Zap, Heart } from "lucide-react";
import { useAdventureProgress } from "./adventure-storage";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

interface AchievementBadgesProps {
  className?: string;
  compact?: boolean;
}

export function AchievementBadges({
  className = "",
  compact = false,
}: AchievementBadgesProps) {
  const { progress } = useAdventureProgress();

  const achievements: Achievement[] = [
    {
      id: "first-steps",
      name: "First Steps",
      description: "Complete your first coding activity",
      icon: <Star className="w-4 h-4" />,
      color: "bg-yellow-500",
      unlocked: progress.achievements.has("first-steps"),
      progress: Math.min(progress.completedActivities.size, 1),
      maxProgress: 1,
    },
    {
      id: "explorer",
      name: "Zone Explorer",
      description: "Explore all three adventure zones",
      icon: <Medal className="w-4 h-4" />,
      color: "bg-blue-500",
      unlocked: progress.achievements.has("explorer"),
      progress: progress.exploredZones.size,
      maxProgress: 3,
    },
    {
      id: "builder",
      name: "Project Builder",
      description: "Complete 5 coding projects",
      icon: <Trophy className="w-4 h-4" />,
      color: "bg-green-500",
      unlocked: progress.achievements.has("builder"),
      progress: Math.min(progress.completedActivities.size, 5),
      maxProgress: 5,
    },
    {
      id: "collaborator",
      name: "Team Player",
      description: "Work on a team project",
      icon: <Heart className="w-4 h-4" />,
      color: "bg-pink-500",
      unlocked: progress.achievements.has("collaborator"),
      progress: progress.achievements.has("collaborator") ? 1 : 0,
      maxProgress: 1,
    },
    {
      id: "innovator",
      name: "Young Innovator",
      description: "Create an original project idea",
      icon: <Zap className="w-4 h-4" />,
      color: "bg-purple-500",
      unlocked: progress.achievements.has("innovator"),
      progress: progress.achievements.has("innovator") ? 1 : 0,
      maxProgress: 1,
    },
    {
      id: "master",
      name: "Coding Master",
      description: "Complete all activities in a zone",
      icon: <Crown className="w-4 h-4" />,
      color: "bg-orange-500",
      unlocked: progress.achievements.has("master"),
      progress: progress.achievements.has("master") ? 1 : 0,
      maxProgress: 1,
    },
  ];

  if (compact) {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {achievements.slice(0, 3).map((achievement) => (
          <motion.div
            key={achievement.id}
            whileHover={{ scale: 1.05 }}
            className="flex items-center"
          >
            <Badge
              variant={achievement.unlocked ? "default" : "outline"}
              className={`${
                achievement.unlocked
                  ? `${achievement.color} text-white`
                  : "text-gray-400 border-gray-400"
              } transition-all duration-300`}
            >
              {achievement.icon}
              <span className="ml-1 text-xs">{achievement.name}</span>
            </Badge>
          </motion.div>
        ))}
        <Badge variant="outline" className="text-gray-400 border-gray-400">
          +{achievements.length - 3} more
        </Badge>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
        <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
        Achievement Badges
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className={`p-4 rounded-lg border transition-all duration-300 ${
              achievement.unlocked
                ? "bg-white/10 border-white/30 shadow-lg"
                : "bg-gray-800/50 border-gray-600"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  achievement.unlocked ? achievement.color : "bg-gray-600"
                } transition-colors duration-300`}
              >
                {achievement.icon}
              </div>
              {achievement.unlocked && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, delay: 0.2 }}
                >
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                </motion.div>
              )}
            </div>

            <h4
              className={`font-semibold mb-1 ${
                achievement.unlocked ? "text-white" : "text-gray-400"
              }`}
            >
              {achievement.name}
            </h4>

            <p
              className={`text-xs ${
                achievement.unlocked ? "text-gray-300" : "text-gray-500"
              }`}
            >
              {achievement.description}
            </p>

            {achievement.progress !== undefined && achievement.maxProgress && (
              <div className="mt-2">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>
                    {achievement.progress}/{achievement.maxProgress}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1.5">
                  <motion.div
                    className={`h-1.5 rounded-full ${achievement.color}`}
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(achievement.progress / achievement.maxProgress) * 100}%`,
                    }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-gray-400 text-sm"
      >
        <p>🏆 Unlock badges by completing activities and exploring zones!</p>
      </motion.div>
    </div>
  );
}
