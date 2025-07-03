"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  XCircle,
  Star,
  Lightbulb,
  RotateCcw,
  Brain,
  Zap,
} from "lucide-react";

interface LogicPattern {
  sequence: string[];
  options: string[];
  correct: string;
  explanation: string;
}

export function LogicPuzzleChallenge() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [completedLevels, setCompletedLevels] = useState<boolean[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());

  const patterns: LogicPattern[] = [
    {
      sequence: ["🔴", "🟡", "🔴", "🟡", "?"],
      options: ["🔴", "🟡", "🟢", "🔵"],
      correct: "🔴",
      explanation:
        "This is an alternating pattern: Red, Yellow, Red, Yellow... so the next should be Red!",
    },
    {
      sequence: ["1", "2", "4", "8", "?"],
      options: ["12", "16", "10", "6"],
      correct: "16",
      explanation:
        "Each number doubles: 1→2→4→8→16. This is a multiplication pattern!",
    },
    {
      sequence: ["🐱", "🐶", "🐱", "🐶", "🐱", "?"],
      options: ["🐱", "🐶", "🐭", "🐰"],
      correct: "🐶",
      explanation:
        "Cat and Dog alternate: Cat, Dog, Cat, Dog, Cat... so next is Dog!",
    },
    {
      sequence: ["A", "C", "E", "G", "?"],
      options: ["H", "I", "J", "K"],
      correct: "I",
      explanation:
        "Skip one letter each time: A(skip B)→C(skip D)→E(skip F)→G(skip H)→I",
    },
    {
      sequence: ["🔺", "🔺🔺", "🔺🔺🔺", "🔺🔺🔺��", "?"],
      options: ["🔺🔺🔺🔺🔺", "🔺🔺🔺", "🔺🔺", "🔺"],
      correct: "🔺🔺🔺🔺🔺",
      explanation:
        "Each step adds one more triangle: 1, 2, 3, 4... so next is 5 triangles!",
    },
  ];

  const hints = [
    "Look for repeating patterns - do things alternate back and forth?",
    "Check if numbers are getting bigger or smaller by the same amount",
    "Sometimes patterns skip items - like every other letter or number",
    "Count how many of something there are - does it increase each time?",
    "Try saying the sequence out loud - sometimes you can hear the pattern!",
  ];

  useEffect(() => {
    setCompletedLevels(new Array(patterns.length).fill(false));
    setStartTime(Date.now());
  }, []);

  const checkAnswer = () => {
    if (!selectedAnswer) return;

    setAttempts(attempts + 1);
    const correct = selectedAnswer === patterns[currentLevel].correct;
    setIsCorrect(correct);
    setShowExplanation(true);

    if (correct) {
      const newCompleted = [...completedLevels];
      newCompleted[currentLevel] = true;
      setCompletedLevels(newCompleted);
    }
  };

  const nextLevel = () => {
    if (currentLevel < patterns.length - 1) {
      setCurrentLevel(currentLevel + 1);
      resetLevel();
    }
  };

  const prevLevel = () => {
    if (currentLevel > 0) {
      setCurrentLevel(currentLevel - 1);
      resetLevel();
    }
  };

  const resetLevel = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowExplanation(false);
    setShowHint(false);
  };

  const resetAll = () => {
    setCurrentLevel(0);
    setCompletedLevels(new Array(patterns.length).fill(false));
    setAttempts(0);
    setStartTime(Date.now());
    resetLevel();
  };

  const isAllCompleted = completedLevels.every(Boolean);
  const currentPattern = patterns[currentLevel];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-purple-300 mb-2">
          Logic Puzzle Challenge
        </h2>
        <p className="text-gray-300">
          Find the pattern and complete the sequence!
        </p>
        <div className="flex justify-center gap-4 mt-4 flex-wrap">
          <Badge
            variant="outline"
            className="text-yellow-400 border-yellow-400"
          >
            Difficulty: Medium
          </Badge>
          <Badge variant="outline" className="text-blue-400 border-blue-400">
            Level: {currentLevel + 1}/{patterns.length}
          </Badge>
          <Badge variant="outline" className="text-green-400 border-green-400">
            Completed: {completedLevels.filter(Boolean).length}/
            {patterns.length}
          </Badge>
        </div>
      </div>

      {/* Progress Bar */}
      <Card className="bg-gradient-to-r from-slate-800 to-slate-700 border border-purple-500/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-purple-300">
              Progress
            </span>
            <span className="text-sm text-gray-400">
              {Math.round(
                (completedLevels.filter(Boolean).length / patterns.length) *
                  100,
              )}
              %
            </span>
          </div>
          <div className="w-full bg-slate-600 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${(completedLevels.filter(Boolean).length / patterns.length) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Main Challenge */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-cyan-500/30">
        <CardContent className="p-8">
          {/* Pattern Display */}
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-white mb-6">
              Find the Missing Piece
            </h3>
            <div className="flex justify-center items-center gap-4 mb-8 flex-wrap">
              {currentPattern.sequence.map((item, index) => (
                <motion.div
                  key={index}
                  className={`
                    w-16 h-16 rounded-lg border-2 flex items-center justify-center text-2xl font-bold
                    ${
                      item === "?"
                        ? "border-yellow-400 bg-yellow-400/20 text-yellow-400"
                        : "border-gray-600 bg-slate-700 text-white"
                    }
                  `}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {item === "?" ? (
                    <motion.span
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      ?
                    </motion.span>
                  ) : (
                    item
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Answer Options */}
          <div className="mb-8">
            <h4 className="text-lg font-medium text-gray-300 mb-4 text-center">
              Choose the correct answer:
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-md mx-auto">
              {currentPattern.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedAnswer(option)}
                  className={`
                    w-16 h-16 rounded-lg border-2 flex items-center justify-center text-2xl font-bold transition-all
                    ${
                      selectedAnswer === option
                        ? "border-cyan-400 bg-cyan-400/20 text-cyan-400"
                        : "border-gray-600 bg-slate-700 text-white hover:border-gray-500"
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={showExplanation}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mb-6">
            <Button
              onClick={checkAnswer}
              disabled={!selectedAnswer || showExplanation}
              className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Check Answer
            </Button>
            <Button
              onClick={() => setShowHint(!showHint)}
              variant="outline"
              className="border-yellow-600 text-yellow-400 hover:bg-yellow-600/20"
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              {showHint ? "Hide" : "Show"} Hint
            </Button>
            <Button
              onClick={resetLevel}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>

          {/* Level Navigation */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={prevLevel}
              disabled={currentLevel === 0}
              variant="outline"
              className="border-purple-600 text-purple-400 hover:bg-purple-600/20"
            >
              ← Previous
            </Button>
            <Button
              onClick={nextLevel}
              disabled={currentLevel === patterns.length - 1}
              variant="outline"
              className="border-purple-600 text-purple-400 hover:bg-purple-600/20"
            >
              Next →
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Hint Panel */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Lightbulb className="w-5 h-5 text-yellow-400 mt-1" />
                  <div>
                    <h4 className="font-bold text-yellow-300 mb-2">
                      Puzzle-Solving Tips:
                    </h4>
                    <ul className="text-yellow-100 space-y-1">
                      {hints.map((hint, index) => (
                        <li key={index} className="text-sm">
                          • {hint}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Explanation Panel */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card
              className={`border ${isCorrect ? "border-green-500/50 bg-green-500/10" : "border-red-500/50 bg-red-500/10"}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  {isCorrect ? (
                    <CheckCircle className="w-6 h-6 text-green-400 mt-1" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-400 mt-1" />
                  )}
                  <div>
                    <h4
                      className={`font-bold mb-2 ${isCorrect ? "text-green-300" : "text-red-300"}`}
                    >
                      {isCorrect
                        ? "Correct! Well done!"
                        : "Not quite right, but keep trying!"}
                    </h4>
                    <p className="text-gray-300 mb-4">
                      {currentPattern.explanation}
                    </p>
                    {isCorrect &&
                      !isAllCompleted &&
                      currentLevel < patterns.length - 1 && (
                        <Button
                          onClick={nextLevel}
                          className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white"
                        >
                          Next Challenge <Zap className="w-4 h-4 ml-2" />
                        </Button>
                      )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* All Completed Modal */}
      <AnimatePresence>
        {isAllCompleted && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gradient-to-br from-purple-600 to-cyan-600 p-8 rounded-xl text-center max-w-md mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <motion.div
                className="text-6xl mb-4"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🧠
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Logic Master!
              </h3>
              <p className="text-purple-100 mb-4">
                Congratulations! You've solved all the logic puzzles! Your
                pattern recognition skills are excellent!
              </p>
              <div className="bg-white/20 rounded-lg p-3 mb-4">
                <p className="text-sm text-white">
                  Total attempts: {attempts}
                  <br />
                  Time: {Math.round((Date.now() - startTime) / 1000)}s
                </p>
              </div>
              <Button
                onClick={resetAll}
                className="bg-white text-purple-600 hover:bg-gray-100"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
