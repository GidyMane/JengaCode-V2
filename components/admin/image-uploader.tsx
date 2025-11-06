"use client";

import React, { useRef, useState } from "react";
import { Upload, X, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ImageUploaderProps {
  onUploadSuccess: (url: string) => void;
  folder?: string;
  maxSize?: number;
}

export function ImageUploader({
  onUploadSuccess,
  folder = "jengacode/events",
  maxSize = 5 * 1024 * 1024,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > maxSize) {
      toast.error(`File size must be less than ${maxSize / 1024 / 1024}MB`);
      return;
    }

    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      toast.error("Only image and video files are allowed");
      return;
    }

    await uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          const percentComplete = (e.loaded / e.total) * 100;
          setProgress(percentComplete);
        }
      });

      xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
          try {
            const response = JSON.parse(xhr.responseText);
            if (response.success) {
              onUploadSuccess(response.url);
              toast.success("Image uploaded successfully");
              if (fileInputRef.current) {
                fileInputRef.current.value = "";
              }
            } else {
              toast.error(response.error || "Upload failed");
            }
          } catch (error) {
            toast.error("Failed to parse response");
          }
        } else {
          toast.error("Upload failed");
        }
        setIsUploading(false);
        setProgress(0);
      });

      xhr.addEventListener("error", () => {
        toast.error("Upload error occurred");
        setIsUploading(false);
        setProgress(0);
      });

      xhr.open("POST", "/api/upload");
      xhr.send(formData);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Upload failed"
      );
      setIsUploading(false);
      setProgress(0);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add("bg-purple-50", "dark:bg-purple-900/20");
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove("bg-purple-50", "dark:bg-purple-900/20");
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove("bg-purple-50", "dark:bg-purple-900/20");

    const file = e.dataTransfer.files?.[0];
    if (file) {
      await uploadFile(file);
    }
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        onChange={handleFileSelect}
        disabled={isUploading}
        className="hidden"
      />

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className="relative border-2 border-dashed border-purple-300 dark:border-purple-700 rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-purple-500 dark:hover:border-purple-400"
      >
        {!isUploading && (
          <>
            <Upload className="w-12 h-12 mx-auto mb-4 text-purple-500 opacity-50" />
            <p className="text-gray-700 dark:text-gray-300 font-medium mb-1">
              Click to upload or drag and drop
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              PNG, JPG, GIF, WebP, MP4 up to 5MB
            </p>
          </>
        )}

        {isUploading && (
          <div className="flex flex-col items-center gap-3">
            <Loader className="w-8 h-8 text-purple-500 animate-spin" />
            <p className="text-gray-700 dark:text-gray-300">
              Uploading... {Math.round(progress)}%
            </p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
              <div
                className="bg-gradient-to-r from-jengacode-purple to-jengacode-cyan h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
