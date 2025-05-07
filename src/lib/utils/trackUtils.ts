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
    .sort((a, b) => a.timestamp - b.timestamp);

  const focusIntervals: FocusInterval[] = [];
  let watchingFrom: number | null = null;

  for (let i = 0; i < logs.length; i++) {
    const { action, timestamp } = logs[i];

    if (action === "play") {
      if (watchingFrom === null) watchingFrom = timestamp;
    }

    if (["pause", "seek", "forward", "backward"].includes(action)) {
      if (watchingFrom !== null && timestamp > watchingFrom) {
        focusIntervals.push({ from: watchingFrom, to: timestamp });
        watchingFrom = null;
      }
    }
  }

  // If still watching when session ends
  if (watchingFrom !== null) {
    const lastTimestamp = logs[logs.length - 1].timestamp;
    if (lastTimestamp > watchingFrom) {
      focusIntervals.push({ from: watchingFrom, to: lastTimestamp });
    }
  }

  return focusIntervals;
}


// import { redis } from "@/lib/redis";

// export async function appendIntervalToRedis(
//   userId: string,
//   videoId: string,
//   action: string,
//   timestamp: number
// ) {
//   const sessionLogKey = `session:${userId}:${videoId}:log`;

//   const event = {
//     action,
//     timestamp,
//     at: new Date().toISOString(), 
//   };

//   await redis.rpush(sessionLogKey, JSON.stringify(event));

// }
