import { NextRequest, NextResponse } from "next/server";
import { getVideoDurationAndURL } from "@/lib/utils/getVideoDuration";

export async function GET(req: NextRequest, { params }: { params: { videoId: string } }) {
  try {
    const videoId = params.videoId;

    const video = await getVideoDurationAndURL(videoId);

    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    return NextResponse.json(video);
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
