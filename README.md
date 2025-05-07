> ⚠️ This project is currently a work in progress. Major features and improvements are still being implemented. Stay tuned!

Project Workflow:

 - Can be seen in SessionSense_WorkFlow.pdf in directory (download if not visbile)

# 🎥 SessionSense - Smart Video Focus Tracker

SessionSense is an intelligent video tracking platform designed to help users monitor their engagement while watching educational content. It detects actions like play, pause, seek, rewind, and forward to compute how focused a user remained during a session. At the end of each session, users receive a detailed summary email of their interactions and focus intervals which can be use by the user to track it's progress, as well as the companies like coursera , udemy or private instituions for tracking their user's progress as well as the content they provide. Perfect tracking can help them realise if any portions of their content need more improvement or better explanations as well as stricter norms are required for  their sites.

Upcoming Features / In Progress

    🚫 Single Tab Enforcement: Users will be restricted to only one active video session per account to prevent simultaneous sessions in multiple tabs.

    🔒 Auth Integration (Planned): Support for user authentication to associate sessions with accounts.

    🎯 Focus Drop Alerts: Planned alerts when users appear distracted (e.g., tab switch detection, inactivity).

    📉 Content Weakness Insights (Admin View): Insights for creators to identify where users most frequently rewind or drop off, helping improve content.

## 📌 Features

- 📊 Tracks user interactions with videos (play, pause, seek, forward, rewind)
- ⏱️ Calculates total watch time and continuous focused intervals
- 🔁 Identifies engagement patterns and rewatches
- 📧 Sends session summary emails to users post-session using [Resend](https://resend.com)
- ⚡ Real-time data tracking using Redis

---

## 🚀 Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database/Cache:** Redis using upstash (for high-speed tracking and session storage)
- **Email Service:** Resend
- **Authentication:** (If applicable, e.g., Clerk/Auth.js)
- **Deployment:** Vercel(will happen)

---


