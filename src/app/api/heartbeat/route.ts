import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

const SESSION_TTL_SECONDS = 60 * 5; 

type VideoSession = {
    videoId: string;
    sessionUUID: string;
    lastUpdated: number;
  };

export async function POST(req: NextRequest) {
  const { userId, videoId, sessionUUID } = await req.json();
  const key = `user:${userId}:active_video_session`;

  const sessionStr = await redis.get(key) as string;
  if (!sessionStr) {
    return NextResponse.json({ error: 'No active session found.' }, { status: 404 });
  }

  const session:VideoSession = JSON.parse(sessionStr);
  if (session.videoId !== videoId || session.sessionUUID !== sessionUUID) {
    return NextResponse.json({ error: 'Session mismatch. Cannot refresh.' }, { status: 403 });
  }

  // Refresh TTL to keep session alive
  await redis.expire(key, SESSION_TTL_SECONDS);
  return NextResponse.json({ success: true });
}
