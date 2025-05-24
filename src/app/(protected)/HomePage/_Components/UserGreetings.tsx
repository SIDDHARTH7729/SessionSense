"use client";

import { useUser } from "@clerk/nextjs"; // Import the useUser hook
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const greetings = ["Welcome back", "What's up", "Hey there", "Sup", "Back for more"];

const messages = [
  "Ready to pick up where you left off?",
  "Your videos missed you!",
  "Time to binge some more content?",
  "Let's continue the vibe",
  "Your watch journey continues...",
];

export function UserGreeting() { 
  const { user, isSignedIn} = useUser(); 
  const [greeting, setGreeting] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setGreeting(greetings[Math.floor(Math.random() * greetings.length)]);
    setMessage(messages[Math.floor(Math.random() * messages.length)]);
  }, []);

  

  if (!isSignedIn || !user) {
    return <p className="text-gray-500">Not signed in.</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row md:items-center justify-between"
    >
      <div className="mx-40">
        <h1 className="text-3xl md:text-4xl font-bold">
          {greeting}, <span className="text-purple-400">{user.firstName || "friend"}</span>!
        </h1>
        <p className="mt-2 text-gray-400 text-lg mr-40">{message}</p>
      </div>
      <div className="mt-4 md:mt-0 ml-10">
        <div className="flex items-center gap-3 bg-purple-300 rounded-lg p-3">
          <div className="relative">
            <img
              src={user.imageUrl || "/placeholder.svg?height=40&width=40"}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></span>
          </div>
          <div>
            <p className="font-bold">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs text-black-400">Active now</p>
          </div>
        </div>
      </div>
      
    </motion.div>
  );
}