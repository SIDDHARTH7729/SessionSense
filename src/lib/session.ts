import { redis } from './redis';

const SESSION_TTL_SECONDS = 60 * 5; // 5 minutes

// defining the expected session structure
type VideoSession = {
  videoId: string;
  sessionUUID: string;
  lastUpdated: number;
};

export async function setActiveSession(userId: string, videoId: string, sessionUUID: string) {
  const key = `user:${userId}:active_video_session`;
  await redis.set(key, JSON.stringify({ videoId, sessionUUID, lastUpdated: Date.now() }), {
    ex: SESSION_TTL_SECONDS,
  });
}

export async function getActiveSession(userId: string) {
  const key = `user:${userId}:active_video_session`;
  const session = await redis.get<VideoSession>(key);
  return session;
}

export async function clearSession(userId: string) {
  const key = `user:${userId}:active_video_session`;
  await redis.del(key);
}
