"use client";

import React, { useState, useRef, useEffect } from "react";
import { Upload, CheckCircle, AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from 'next/navigation';
import { useUser } from "@clerk/clerk-react";

const VideoUploadSection = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoId, setVideoId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const [videoTitle, setVideoTitle] = useState('');
  

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    handleFile(file);
  };

  const handleFile = (file: File | undefined) => {
    if (file && file.type.startsWith("video/")) {
      if (file.size > 100 * 1024 * 1024) {
        setError("File size too large. Please upload a video under 100MB.");
        setVideoFile(null);
      } else {
        setError(null);
        setVideoFile(file);
      }
    } else if (file) {
      setError("Invalid file type. Please upload a video file.");
      setVideoFile(null);
    }
  };

  const handleClick = () => fileInputRef.current?.click();

  const handleAnalysis = async () => {
    if (!videoFile) {
      setError("Please upload a video before analyzing.");
      return;
    }
    if (!videoTitle.trim()) {
      setError("Please enter a title for the video.");
      return;
    }
    setLoading(true);
    setError(null);
    setVideoId(null);

    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("title", videoTitle);

    try {
      const res = await fetch("/api/uploadVideo", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        let errorMessage = "Video processing failed.";
        try {
          const errorData = await res.json();
          if (errorData && errorData.error) {
            errorMessage = errorData.error;
          }
        } catch (parseError) {
          console.error("Failed to parse error response:", parseError);
          errorMessage = "Video processing failed. Please try again.";
        }
        throw new Error(errorMessage);
      }

      const data = await res.json();
      if (data) {
        setVideoId(data);
      } else {
        throw new Error("Invalid response from server: videoId is missing");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during video processing.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

 

  useEffect(() => {
    return () => {
      if (videoFile) {
        URL.revokeObjectURL(URL.createObjectURL(videoFile));
      }
    };
  }, [videoFile]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary">
            Upload Your Learning Video
          </h1>
          <p className="text-muted-foreground mt-3 text-lg">
            Upload your video to begin tracking your progress and engagement.
          </p>
        </div>
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Enter video title"
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
            className="w-full"
          />
        </div>

        <div
          className={cn(
            "border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 cursor-pointer",
            isDragging
              ? "border-blue-500 bg-blue-500/10"
              : "border-border hover:border-primary hover:bg-primary/5",
            error && "border-red-500 bg-red-500/10"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {error ? (
            <>
              <AlertTriangle size={48} className="text-red-500 mb-4 mx-auto" />
              <p className="text-red-500 text-base">{error}</p>
            </>
          ) : (
            <>
              <Upload size={48} className="text-primary mb-4 mx-auto" />
              <p className="text-muted-foreground text-base">
                Drag & drop your video, or click to select a file.
              </p>
              <p className="text-muted-foreground text-sm mt-2">
                (MP4, MOV, etc. - Max 100MB)
              </p>
            </>
          )}
        </div>

        <div className="mt-8 text-center">
          <Button
            onClick={handleAnalysis}
            disabled={loading}
            className={cn(
              "px-8 py-3 rounded-full transition-all text-white font-semibold",
              loading
                ? "bg-muted cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-xl"
            )}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Upload and Process"
            )}
          </Button>
          {videoId && (
            <div className="mt-4">
              <p className="text-green-500 flex items-center justify-center gap-2">
                <CheckCircle size={20} />
                <span className="font-medium">Video uploaded successfully!</span>
              </p>
              <video
                ref={videoRef}
                controls
                className="mt-4 rounded-lg w-full max-w-md mx-auto"
                src={videoFile ? URL.createObjectURL(videoFile) : ''}
              />
              <p className="mt-2 text-sm text-gray-400">
                You can view your uploaded video.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => router.push(`/lecture/${videoId}`)}
              >
                Go to Lecture
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoUploadSection;

