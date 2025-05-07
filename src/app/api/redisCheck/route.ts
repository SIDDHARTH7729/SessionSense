import { NextRequest, NextResponse } from 'next/server';
import { getActiveSession, setActiveSession } from '@/lib/session';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, videoId, sessionUUID } = body;

  const active = await getActiveSession(userId);

  if (active && active.videoId === videoId && active.sessionUUID !== sessionUUID) {
    return NextResponse.json({ error: 'Video already open in another tab.' }, { status: 403 });
  }

  if (active && active.videoId !== videoId) {
    return NextResponse.json({ error: 'Another video is currently active.' }, { status: 403 });
  }

  await setActiveSession(userId, videoId, sessionUUID);
  return NextResponse.json({ success: true });
}
