"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  RotateCcw,
  CheckCircle,
  XCircle,
  Star,
  Lightbulb,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Zap,
} from "lucide-react";

interface CodeBlock {
  id: string;
  command: string;
  icon: React.ReactNode;
  color: string;
}

export function FixTheRobotChallenge() {
  const [robotPosition, setRobotPosition] = useState({ x: 0, y: 0 });
  const [targetPosition] = useState({ x: 3, y: 2 });
  const [playerCode, setPlayerCode] = useState<CodeBlock[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const availableBlocks: CodeBlock[] = [
    {
      id: "move-up",
      command: "moveUp",
      icon: <ArrowUp className="w-4 h-4" />,
      color: "bg-blue-500",
    },
    {
      id: "move-down",
      command: "moveDown",
      icon: <ArrowDown className="w-4 h-4" />,
      color: "bg-blue-500",
    },
    {
      id: "move-left",
      command: "moveLeft",
      icon: <ArrowLeft className="w-4 h-4" />,
      color: "bg-green-500",
    },
    {
      id: "move-right",
      command: "moveRight",
      icon: <ArrowRight className="w-4 h-4" />,
      color: "bg-green-500",
    },
  ];

  const addBlock = (block: CodeBlock) => {
    if (playerCode.length < 8) {
      setPlayerCode([
        ...playerCode,
        { ...block, id: `${block.id}-${Date.now()}` },
      ]);
    }
  };

  const removeBlock = (index: number) => {
    setPlayerCode(playerCode.filter((_, i) => i !== index));
  };

  const clearCode = () => {
    setPlayerCode([]);
    setRobotPosition({ x: 0, y: 0 });
    setCompleted(false);
  };

  const runCode = async () => {
    if (playerCode.length === 0) return;

    setIsRunning(true);
    setAttempts(attempts + 1);
    let currentPos = { x: 0, y: 0 };

    for (let i = 0; i < playerCode.length; i++) {
      const block = playerCode[i];

      // Animate the current block being executed
      const blockElement = document.querySelector(`[data-block-index="${i}"]`);
      if (blockElement) {
        blockElement.classList.add(
          "animate-pulse",
          "ring-2",
          "ring-yellow-400",
        );
      }

      await new Promise((resolve) => setTimeout(resolve, 800));

      switch (block.command) {
        case "moveUp":
          if (currentPos.y > 0) currentPos.y--;
          break;
        case "moveDown":
          if (currentPos.y < 4) currentPos.y++;
          break;
        case "moveLeft":
          if (currentPos.x > 0) currentPos.x--;
          break;
        case "moveRight":
          if (currentPos.x < 4) currentPos.x++;
          break;
      }

      setRobotPosition({ ...currentPos });

      if (blockElement) {
        blockElement.classList.remove(
          "animate-pulse",
          "ring-2",
          "ring-yellow-400",
        );
      }

      // Check if reached target
      if (
        currentPos.x === targetPosition.x &&
        currentPos.y === targetPosition.y
      ) {
        setCompleted(true);
        break;
      }
    }

    setIsRunning(false);
  };

  const getGridCell = (x: number, y: number) => {
    const isRobot = robotPosition.x === x && robotPosition.y === y;
    const isTarget = targetPosition.x === x && targetPosition.y === y;
    const isPath = false; // Could add path visualization here

    return (
      <motion.div
        key={`${x}-${y}`}
        className={`
          w-12 h-12 border-2 border-gray-600 flex items-center justify-center relative
          ${isTarget ? "bg-yellow-400/20 border-yellow-400" : "bg-slate-700"}
        `}
        whileHover={{ scale: 1.05 }}
      >
        {isTarget && !isRobot && (
          <motion.div
            className="text-yellow-400 text-2xl"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            ⭐
          </motion.div>
        )}
        {isRobot && (
          <motion.div
            className="text-3xl"
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: isTarget ? [0, 360] : 0 }}
            transition={{
              scale: { duration: 0.3 },
              rotate: isTarget ? { duration: 1, repeat: Infinity } : {},
            }}
          >
            {isTarget ? "🎉" : "🤖"}
          </motion.div>
        )}
      </motion.div>
    );
  };

  const hints = [
    "The robot needs to move right 3 steps and down 2 steps to reach the star!",
    "Try using: Right → Right → Right → Down → Down",
    "Remember: the robot starts at the top-left corner (0,0)",
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-cyan-300 mb-2">
          Fix the Robot Challenge
        </h2>
        <p className="text-gray-300">
          Help the robot reach the golden star by arranging the code blocks!
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <Badge variant="outline" className="text-green-400 border-green-400">
            Difficulty: Easy
          </Badge>
          <Badge variant="outline" className="text-blue-400 border-blue-400">
            Attempts: {attempts}
          </Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Game Grid */}
        <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-cyan-500/30">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white mb-4 text-center">
              Robot World
            </h3>
            <div className="grid grid-cols-5 gap-1 max-w-sm mx-auto">
              {Array.from({ length: 25 }, (_, i) => {
                const x = i % 5;
                const y = Math.floor(i / 5);
                return getGridCell(x, y);
              })}
            </div>
            <div className="mt-4 text-center text-sm text-gray-400">
              <p>🤖 Robot | ⭐ Target</p>
            </div>
          </CardContent>
        </Card>

        {/* Code Builder */}
        <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-purple-500/30">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">Code Blocks</h3>

            {/* Available Blocks */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-300 mb-3">
                Available Commands:
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {availableBlocks.map((block) => (
                  <motion.button
                    key={block.id}
                    onClick={() => addBlock(block)}
                    className={`${block.color} text-white p-3 rounded-lg flex items-center justify-center space-x-2 hover:opacity-80 transition-opacity`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={playerCode.length >= 8}
                  >
                    {block.icon}
                    <span className="text-sm font-medium">{block.command}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Player's Code */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-300 mb-3">
                Your Program:
              </h4>
              <div className="min-h-[120px] bg-slate-900 rounded-lg p-3 border border-gray-600">
                {playerCode.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    Drag code blocks here to build your program!
                  </p>
                ) : (
                  <div className="space-y-2">
                    {playerCode.map((block, index) => (
                      <motion.div
                        key={block.id}
                        data-block-index={index}
                        className={`${block.color} text-white p-2 rounded flex items-center justify-between cursor-pointer hover:opacity-80`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => removeBlock(index)}
                      >
                        <div className="flex items-center space-x-2">
                          {block.icon}
                          <span className="text-sm">{block.command}</span>
                        </div>
                        <XCircle className="w-4 h-4" />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={runCode}
                disabled={isRunning || playerCode.length === 0}
                className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white flex-1"
              >
                {isRunning ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Running...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Run Code
                  </>
                )}
              </Button>
              <Button
                onClick={clearCode}
                variant="outline"
                disabled={isRunning}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button
                onClick={() => setShowHint(!showHint)}
                variant="outline"
                className="border-yellow-600 text-yellow-400 hover:bg-yellow-600/20"
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                Hint
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

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
                      Helpful Hints:
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

      {/* Success Modal */}
      <AnimatePresence>
        {completed && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gradient-to-br from-green-600 to-teal-600 p-8 rounded-xl text-center max-w-md mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <motion.div
                className="text-6xl mb-4"
                animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                transition={{ duration: 1 }}
              >
                🎉
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Congratulations!
              </h3>
              <p className="text-green-100 mb-4">
                You successfully helped the robot reach the star!
                {attempts === 1
                  ? " Perfect on the first try!"
                  : ` It took ${attempts} attempts - great persistence!`}
              </p>
              <div className="flex gap-2 justify-center">
                <Button
                  onClick={() => {
                    setCompleted(false);
                    clearCode();
                  }}
                  className="bg-white text-green-600 hover:bg-gray-100"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
