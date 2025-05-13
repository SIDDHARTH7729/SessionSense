import { redis } from "@/lib/redis";

interface FocusInterval {
  from: number;
  to: number;
}

export async function getFocusedIntervals(userId: string, videoId: string): Promise<FocusInterval[]> {
  const sessionLogKey = `session:${userId}:${videoId}:log`;
  const rawLogs = await redis.lrange(sessionLogKey, 0, -1);
  if (!rawLogs || rawLogs.length === 0) return [];

  const logs = rawLogs
    .map((log) => JSON.parse(log))
    .filter((log) => log.action === "focus") // only use logged focus intervals
    .sort((a, b) => a.from - b.from); // sort based on start time

  const mergedIntervals: FocusInterval[] = [];

  for (const log of logs) {
    const { from, to } = log;

    if (mergedIntervals.length === 0) {
      mergedIntervals.push({ from, to });
    } else {
      const last = mergedIntervals[mergedIntervals.length - 1];
      if (from <= last.to) {
        // merge overlapping or continuous intervals
        last.to = Math.max(last.to, to);
      } else {
        mergedIntervals.push({ from, to });
      }
    }
  }

  return mergedIntervals;
}

// import { redis } from "@/lib/redis";

// interface FocusInterval {
//   from: number;
//   to: number;
// }

// export async function getFocusedIntervals(userId: string, videoId: string): Promise<FocusInterval[]> {
//   const sessionLogKey = `session:${userId}:${videoId}:log`;
//   const rawLogs = await redis.lrange(sessionLogKey, 0, -1);
//   if (!rawLogs || rawLogs.length === 0) return [];

//   const logs = rawLogs
//     .map((log) => JSON.parse(log))
//     .sort((a, b) => a.timestamp - b.timestamp);

//   const focusIntervals: FocusInterval[] = [];
//   let watchingFrom: number | null = null;

//   for (let i = 0; i < logs.length; i++) {
//     const { action, timestamp } = logs[i];

//     if (action === "play") {
//       if (watchingFrom === null) watchingFrom = timestamp;
//     }

//     if (["pause", "seek", "forward", "backward"].includes(action)) {
//       if (watchingFrom !== null && timestamp > watchingFrom) {
//         focusIntervals.push({ from: watchingFrom, to: timestamp });
//         watchingFrom = null;
//       }
//     }
//   }

//   // If still watching when session ends
//   if (watchingFrom !== null) {
//     const lastTimestamp = logs[logs.length - 1].timestamp;
//     if (lastTimestamp > watchingFrom) {
//       focusIntervals.push({ from: watchingFrom, to: lastTimestamp });
//     }
//   }

//   return focusIntervals;
// }

