"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  RotateCcw,
  CheckCircle,
  Star,
  Lightbulb,
  Zap,
  Plus,
  Minus,
  Eye,
  EyeOff,
} from "lucide-react";

interface CodeBlock {
  id: string;
  type: "start" | "action" | "condition" | "end";
  content: string;
  color: string;
  icon: React.ReactNode;
  dragData?: any;
}

interface Variable {
  name: string;
  value: number;
  color: string;
}

export function CodeBuilderChallenge() {
  const [draggedBlock, setDraggedBlock] = useState<CodeBlock | null>(null);
  const [programBlocks, setProgramBlocks] = useState<CodeBlock[]>([]);
  const [variables, setVariables] = useState<Variable[]>([
    { name: "score", value: 0, color: "text-blue-400" },
    { name: "lives", value: 3, color: "text-red-400" },
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [executingIndex, setExecutingIndex] = useState(-1);
  const [showVariables, setShowVariables] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const availableBlocks: CodeBlock[] = [
    {
      id: "start",
      type: "start",
      content: "START PROGRAM",
      color: "bg-green-500",
      icon: <Play className="w-4 h-4" />,
    },
    {
      id: "add-score",
      type: "action",
      content: "Add 10 to score",
      color: "bg-blue-500",
      icon: <Plus className="w-4 h-4" />,
    },
    {
      id: "subtract-life",
      type: "action",
      content: "Subtract 1 from lives",
      color: "bg-red-500",
      icon: <Minus className="w-4 h-4" />,
    },
    {
      id: "check-score",
      type: "condition",
      content: "If score >= 50",
      color: "bg-yellow-500",
      icon: <Eye className="w-4 h-4" />,
    },
    {
      id: "victory",
      type: "action",
      content: "Show victory message",
      color: "bg-purple-500",
      icon: <Star className="w-4 h-4" />,
    },
    {
      id: "end",
      type: "end",
      content: "END PROGRAM",
      color: "bg-gray-500",
      icon: <CheckCircle className="w-4 h-4" />,
    },
  ];

  const targetProgram = [
    "START PROGRAM",
    "Add 10 to score",
    "Add 10 to score",
    "Add 10 to score",
    "Add 10 to score",
    "Add 10 to score",
    "If score >= 50",
    "Show victory message",
    "END PROGRAM",
  ];

  const handleDragStart = (block: CodeBlock) => {
    setDraggedBlock(block);
  };

  const handleDrop = (e: React.DragEvent, index?: number) => {
    e.preventDefault();
    if (!draggedBlock) return;

    const newBlock = {
      ...draggedBlock,
      id: `${draggedBlock.id}-${Date.now()}`,
    };

    if (index !== undefined) {
      const newBlocks = [...programBlocks];
      newBlocks.splice(index, 0, newBlock);
      setProgramBlocks(newBlocks);
    } else {
      setProgramBlocks([...programBlocks, newBlock]);
    }

    setDraggedBlock(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeBlock = (index: number) => {
    setProgramBlocks(programBlocks.filter((_, i) => i !== index));
  };

  const clearProgram = () => {
    setProgramBlocks([]);
    setVariables([
      { name: "score", value: 0, color: "text-blue-400" },
      { name: "lives", value: 3, color: "text-red-400" },
    ]);
    setExecutingIndex(-1);
    setCompleted(false);
  };

  const updateVariable = (name: string, value: number) => {
    setVariables((vars) =>
      vars.map((v) => (v.name === name ? { ...v, value } : v)),
    );
  };

  const getVariable = (name: string) => {
    return variables.find((v) => v.name === name)?.value || 0;
  };

  const runProgram = async () => {
    if (programBlocks.length === 0) return;

    setIsRunning(true);
    setAttempts(attempts + 1);
    setExecutingIndex(0);

    // Reset variables
    setVariables([
      { name: "score", value: 0, color: "text-blue-400" },
      { name: "lives", value: 3, color: "text-red-400" },
    ]);

    for (let i = 0; i < programBlocks.length; i++) {
      setExecutingIndex(i);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const block = programBlocks[i];

      switch (block.content) {
        case "Add 10 to score":
          updateVariable("score", getVariable("score") + 10);
          break;
        case "Subtract 1 from lives":
          updateVariable("lives", getVariable("lives") - 1);
          break;
        case "If score >= 50":
          if (getVariable("score") < 50) {
            // Skip to end if condition not met
            break;
          }
          break;
        case "Show victory message":
          if (getVariable("score") >= 50) {
            await new Promise((resolve) => setTimeout(resolve, 500));
            setCompleted(true);
          }
          break;
      }
    }

    setExecutingIndex(-1);
    setIsRunning(false);

    // Check if program matches target
    const programContent = programBlocks.map((b) => b.content);
    const isCorrect =
      JSON.stringify(programContent) === JSON.stringify(targetProgram);

    if (isCorrect && getVariable("score") >= 50) {
      setCompleted(true);
    }
  };

  const hints = [
    "Start with 'START PROGRAM' and end with 'END PROGRAM'",
    "You need to add 10 to score multiple times to reach 50",
    "Use 'If score >= 50' to check if you have enough points",
    "Don't forget to 'Show victory message' when you win!",
    "The order of blocks matters - think step by step",
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-green-300 mb-2">
          Code Builder Challenge
        </h2>
        <p className="text-gray-300">
          Drag and drop code blocks to create a program that reaches 50 points!
        </p>
        <div className="flex justify-center gap-4 mt-4 flex-wrap">
          <Badge variant="outline" className="text-blue-400 border-blue-400">
            Difficulty: Beginner
          </Badge>
          <Badge
            variant="outline"
            className="text-purple-400 border-purple-400"
          >
            Attempts: {attempts}
          </Badge>
          <Badge
            variant="outline"
            className="text-yellow-400 border-yellow-400"
          >
            Target: 50 points
          </Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Available Blocks */}
        <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-green-500/30">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">
              Available Blocks
            </h3>
            <div className="space-y-3">
              {availableBlocks.map((block) => (
                <motion.div
                  key={block.id}
                  draggable
                  onDragStart={() => handleDragStart(block)}
                  className={`${block.color} text-white p-3 rounded-lg cursor-grab active:cursor-grabbing flex items-center space-x-2 hover:opacity-80 transition-opacity`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {block.icon}
                  <span className="text-sm font-medium">{block.content}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-600">
              <Button
                onClick={() => setShowVariables(!showVariables)}
                variant="outline"
                size="sm"
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                {showVariables ? (
                  <EyeOff className="w-4 h-4 mr-2" />
                ) : (
                  <Eye className="w-4 h-4 mr-2" />
                )}
                {showVariables ? "Hide" : "Show"} Variables
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Program Builder */}
        <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-purple-500/30">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">Your Program</h3>

            <div
              className="min-h-[300px] bg-slate-900 rounded-lg p-4 border-2 border-dashed border-gray-600"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {programBlocks.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-500 text-center">
                    Drag code blocks here to build your program!
                    <br />
                    <span className="text-sm">
                      Start with the green "START PROGRAM" block
                    </span>
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {programBlocks.map((block, index) => (
                    <motion.div
                      key={block.id}
                      className={`${block.color} text-white p-3 rounded-lg flex items-center justify-between cursor-pointer hover:opacity-80 relative ${
                        executingIndex === index
                          ? "ring-2 ring-yellow-400 animate-pulse"
                          : ""
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => removeBlock(index)}
                    >
                      <div className="flex items-center space-x-2">
                        {block.icon}
                        <span className="text-sm font-medium">
                          {block.content}
                        </span>
                      </div>
                      <div className="text-xs opacity-60">#{index + 1}</div>
                      {executingIndex === index && (
                        <motion.div
                          className="absolute -right-2 -top-2 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                        >
                          <Zap className="w-2 h-2 text-yellow-900" />
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-2 mt-4">
              <Button
                onClick={runProgram}
                disabled={isRunning || programBlocks.length === 0}
                className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white flex-1"
              >
                {isRunning ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Run Program
                  </>
                )}
              </Button>
              <Button
                onClick={clearProgram}
                variant="outline"
                disabled={isRunning}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Variables & Info */}
        <div className="space-y-6">
          {/* Variables Panel */}
          <AnimatePresence>
            {showVariables && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-cyan-500/30">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-4">
                      Variables
                    </h3>
                    <div className="space-y-4">
                      {variables.map((variable) => (
                        <motion.div
                          key={variable.name}
                          className="bg-slate-900 p-3 rounded-lg border border-gray-600"
                          animate={{
                            scale: executingIndex >= 0 ? [1, 1.05, 1] : 1,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300 font-medium">
                              {variable.name}
                            </span>
                            <motion.span
                              className={`text-2xl font-bold ${variable.color}`}
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 0.5 }}
                              key={variable.value}
                            >
                              {variable.value}
                            </motion.span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Target Goal */}
          <Card className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-yellow-300 mb-2">
                🎯 Goal
              </h3>
              <p className="text-yellow-100 text-sm">
                Create a program that:
                <br />• Starts with "START PROGRAM"
                <br />• Adds points to reach 50
                <br />• Checks if score ≥ 50
                <br />• Shows victory message
                <br />• Ends with "END PROGRAM"
              </p>
            </CardContent>
          </Card>

          {/* Hint Button */}
          <Button
            onClick={() => {
              const hint = hints[Math.floor(Math.random() * hints.length)];
              alert(`💡 Hint: ${hint}`);
            }}
            variant="outline"
            className="w-full border-purple-600 text-purple-400 hover:bg-purple-600/20"
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            Get Hint
          </Button>
        </div>
      </div>

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
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎉
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Program Successful!
              </h3>
              <p className="text-green-100 mb-4">
                Congratulations! You've built a working program that reached{" "}
                {getVariable("score")} points!
                {attempts === 1
                  ? " Perfect on the first try!"
                  : ` You did it in ${attempts} attempts!`}
              </p>
              <div className="bg-white/20 rounded-lg p-3 mb-4">
                <p className="text-sm text-white">
                  Final Score: {getVariable("score")}
                  <br />
                  Blocks Used: {programBlocks.length}
                </p>
              </div>
              <Button
                onClick={() => {
                  setCompleted(false);
                  clearProgram();
                }}
                className="bg-white text-green-600 hover:bg-gray-100"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Build Another Program
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
