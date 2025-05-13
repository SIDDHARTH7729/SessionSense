"use client";

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function VideoPlayerWithProgress() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [url, setUrl] = useState("");
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const params = useParams(); 
  const videoId = params?.videoId as string;

  // Action counts
  const [pauses, setPauses] = useState(0);
  const [forwards, setForwards] = useState(0);
  const [rewinds, setRewinds] = useState(0);

  const [lastTime, setLastTime] = useState(0);
  const user = {
    id: "USER_ID", // Get from auth
    email: "user@example.com", // Get from auth
    username: "Siddharth", // Get from auth
  };

  useEffect(() => {
    async function fetchVideoData() {
      const res = await fetch(`/api/video/${videoId}`);
      const data = await res.json();
      setUrl(data.cloudinaryUrl);
      setDuration(data.duration);
    }
    fetchVideoData();
  }, [videoId]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const totalDuration = videoRef.current.duration;
      const percent = (currentTime / totalDuration) * 100;
      setProgress(percent);
    }
  };

  const handlePause = () => {
    setPauses((prev) => prev + 1);
    logEvent("pause");
  };

  const handlePlay = () => {
    logEvent("play");
  };

  const handleSeeked = () => {
    if (!videoRef.current) return;
    const currentTime = videoRef.current.currentTime;
    const diff = currentTime - lastTime;

    if (diff > 5) {
      setForwards((prev) => prev + 1);
      logEvent("forward");
    } else if (diff < -5) {
      setRewinds((prev) => prev + 1);
      logEvent("backward");
    } else {
      logEvent("seek");
    }

    setLastTime(currentTime);
  };

  const logEvent = async (action: string) => {
    if (!videoRef.current) return;

    const timestamp = Math.floor(videoRef.current.currentTime);
    await fetch("/api/log-event", {
      method: "POST",
      body: JSON.stringify({
        userId: user.id,
        videoId,
        action,
        timestamp,
      }),
      headers: { "Content-Type": "application/json" },
    });
  };

  // Send session summary on tab close
  useEffect(() => {
    const sendSummary = async () => {
      try {
        await fetch("/api/send-session-summary", {
          method: "POST",
          body: JSON.stringify({
            email: user.email,
            username: user.username,
            userId: user.id,
            videoId,
            pauses,
            forwards,
            rewinds,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          keepalive: true,
        });
      } catch (err) {
        console.error("Failed to send session summary:", err);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        sendSummary();
      }
    };

    window.addEventListener("beforeunload", sendSummary);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", sendSummary);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [pauses, forwards, rewinds, videoId]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      {url ? (
        <>
          <video
            ref={videoRef}
            src={url}
            controls
            className="w-full rounded-lg"
            onTimeUpdate={handleTimeUpdate}
            onPlay={handlePlay}
            onPause={handlePause}
            onSeeked={handleSeeked}
          />
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              Total Duration: {duration} seconds
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-right mt-1">
              Progress: {progress.toFixed(1)}%
            </p>
          </div>
        </>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
}

// // app/video/[videoId]/page.tsx or .tsx (Client Component)
// "use client";

// import { useParams } from "next/navigation";
// import { useEffect, useRef, useState } from "react";
// import axios from "axios";

// export default function VideoPlayerWithProgress() {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [url, setUrl] = useState("");
//   const [duration, setDuration] = useState(0);
//   const [progress, setProgress] = useState(0);
//   const [playStart, setPlayStart] = useState<number | null>(null);
//   const params = useParams(); 
//   const videoId = params?.videoId as string;

//   useEffect(() => {
//     async function fetchVideoData() {
//       const res = await fetch(`/api/video/${videoId}`);
//       const data = await res.json();
//       setUrl(data.cloudinaryUrl);
//       setDuration(data.duration);
//     }
//     fetchVideoData();
//   }, [videoId]);

//   const handleTimeUpdate = () => {
//     if (videoRef.current) {
//       const currentTime = videoRef.current.currentTime;
//       const totalDuration = videoRef.current.duration;
//       const percent = (currentTime / totalDuration) * 100;
//       setProgress(percent);
//     }
//   };

//   const sendFocusIntervalToRedis = async (from: number, to: number) => {
//     if (to <= from) return;
//     try {
//       await axios.post("/api/video/log", {
//         videoId,
//         from: Math.floor(from),
//         to: Math.floor(to),
//       });
//     } catch (err) {
//       console.error("Failed to log focus interval", err);
//     }
//   };

//   const handlePlay = () => {
//     if (videoRef.current) {
//       setPlayStart(videoRef.current.currentTime);
//     }
//   };

//   const handleInterrupt = () => {
//     if (videoRef.current && playStart !== null) {
//       const currentTime = videoRef.current.currentTime;
//       sendFocusIntervalToRedis(playStart, currentTime);
//       setPlayStart(null);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-4">
//       {url ? (
//         <>
//           <video
//             ref={videoRef}
//             src={url}
//             controls
//             className="w-full rounded-lg"
//             onTimeUpdate={handleTimeUpdate}
//             onPlay={handlePlay}
//             onPause={handleInterrupt}
//             onSeeked={handleInterrupt}
//             onEnded={handleInterrupt}
//           />
//           <div className="mt-4">
//             <p className="text-sm text-gray-600">
//               Total Duration: {duration} seconds
//             </p>
//             <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
//               <div
//                 className="bg-blue-600 h-2.5 rounded-full"
//                 style={{ width: `${progress}%` }}
//               ></div>
//             </div>
//             <p className="text-xs text-right mt-1">
//               Progress: {progress.toFixed(1)}%
//             </p>
//           </div>
//         </>
//       ) : (
//         <p>Loading video...</p>
//       )}
//     </div>
//   );
// }

