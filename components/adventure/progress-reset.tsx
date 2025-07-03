"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { RotateCcw, AlertTriangle } from "lucide-react";
import { useAdventureProgress } from "./adventure-storage";

export function ProgressReset() {
  const [isOpen, setIsOpen] = useState(false);
  const { resetProgress } = useAdventureProgress();

  const handleReset = () => {
    resetProgress();
    setIsOpen(false);
    toast.success("Progress reset! Start your coding adventure again! 🚀");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-gray-400 border-gray-600 hover:text-red-400 hover:border-red-400"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset Progress
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gradient-to-br from-slate-800 to-slate-700 border-red-500/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-red-400 flex items-center">
            <AlertTriangle className="w-6 h-6 mr-2" />
            Reset Adventure Progress?
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
            <h3 className="font-semibold text-red-300 mb-2">Warning!</h3>
            <p className="text-gray-300 text-sm">
              This will permanently delete all your adventure progress,
              including:
            </p>
            <ul className="text-gray-300 text-sm mt-2 space-y-1">
              <li>• All completed activities</li>
              <li>• Earned XP and badges</li>
              <li>• Explored zones</li>
              <li>• Achievement progress</li>
            </ul>
          </div>

          <p className="text-gray-300 text-sm">
            This action cannot be undone. Are you sure you want to start over?
          </p>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={() => setIsOpen(false)}
              variant="outline"
              className="flex-1 border-gray-500 text-gray-300 hover:bg-gray-600"
            >
              Cancel
            </Button>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1"
            >
              <Button
                onClick={handleReset}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                Yes, Reset Progress
              </Button>
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
