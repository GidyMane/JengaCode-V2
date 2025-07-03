"use client";

import { useState, useEffect } from "react";

interface AdventureProgress {
  exploredZones: Set<string>;
  completedActivities: Set<string>;
  userXP: Record<string, number>;
  achievements: Set<string>;
}

const STORAGE_KEY = "jengacode-adventure-progress";

export function useAdventureProgress() {
  const [progress, setProgress] = useState<AdventureProgress>({
    exploredZones: new Set(),
    completedActivities: new Set(),
    userXP: {},
    achievements: new Set(),
  });

  // Load progress from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setProgress({
          exploredZones: new Set(parsed.exploredZones || []),
          completedActivities: new Set(parsed.completedActivities || []),
          userXP: parsed.userXP || {},
          achievements: new Set(parsed.achievements || []),
        });
      }
    } catch (error) {
      console.warn("Failed to load adventure progress:", error);
    }
  }, []);

  // Save progress to localStorage whenever it changes
  const saveProgress = (newProgress: AdventureProgress) => {
    if (typeof window === "undefined") return;

    try {
      const toSave = {
        exploredZones: Array.from(newProgress.exploredZones),
        completedActivities: Array.from(newProgress.completedActivities),
        userXP: newProgress.userXP,
        achievements: Array.from(newProgress.achievements),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
      setProgress(newProgress);
    } catch (error) {
      console.warn("Failed to save adventure progress:", error);
    }
  };

  const exploreZone = (zoneId: string) => {
    const newProgress = {
      ...progress,
      exploredZones: new Set([...progress.exploredZones, zoneId]),
    };
    saveProgress(newProgress);
  };

  const completeActivity = (zoneId: string, activityId: string, xp: number) => {
    const newProgress = {
      ...progress,
      completedActivities: new Set([
        ...progress.completedActivities,
        activityId,
      ]),
      userXP: {
        ...progress.userXP,
        [zoneId]: (progress.userXP[zoneId] || 0) + xp,
      },
    };

    // Check for achievements
    const newAchievements = new Set(progress.achievements);

    // First Steps achievement
    if (newProgress.completedActivities.size === 1) {
      newAchievements.add("first-steps");
    }

    // Zone Explorer achievement
    if (newProgress.exploredZones.size === 3) {
      newAchievements.add("explorer");
    }

    // Project Builder achievement
    if (newProgress.completedActivities.size >= 5) {
      newAchievements.add("builder");
    }

    newProgress.achievements = newAchievements;
    saveProgress(newProgress);
  };

  const unlockAchievement = (achievementId: string) => {
    const newProgress = {
      ...progress,
      achievements: new Set([...progress.achievements, achievementId]),
    };
    saveProgress(newProgress);
  };

  const resetProgress = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
    setProgress({
      exploredZones: new Set(),
      completedActivities: new Set(),
      userXP: {},
      achievements: new Set(),
    });
  };

  return {
    progress,
    exploreZone,
    completeActivity,
    unlockAchievement,
    resetProgress,
  };
}
