// app/api/video/log/route.ts
import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { videoId, from, to } = await req.json();
  if (!videoId || from === undefined || to === undefined || to <= from) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
  const sessionLogKey = `session:${userId}:${videoId}:log`;
  const log = {
    action: "focus",
    timestamp: Date.now(),
    from,
    to,
  };

  await redis.rpush(sessionLogKey, JSON.stringify(log));

  return NextResponse.json({ success: true });
}
