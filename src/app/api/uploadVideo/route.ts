import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server"; // ← Clerk backend auth utility // ← Function to get user ID from Clerk ID
import { getCurrentUser } from "@/lib/utils/getCurrentUser";
import { upload } from "@/lib/utils/uploadCloudinary";
import { uploadVideoMetaData } from "@/lib/utils/uploadVideoMetaData";

export async function POST(req: NextRequest) {
  try {
    const { userId: clerkId } = await auth(); 

    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const videoFile = formData.get("video") as File;
    const title = formData.get("title") as string;

    if (!videoFile||!title) {
      return NextResponse.json({ error: "Missing title or video" }, { status: 400 });
    }

    const userId = await getCurrentUser(clerkId);
    if (!userId) {
      return NextResponse.json({ error: "User not found in DB" }, { status: 404 });
    }

    // Upload to Cloudinary
    const cloudinaryResponse = await upload(null, formData);

    // Store metadata
    const videoData = await uploadVideoMetaData(
      title,  
      cloudinaryResponse.url,
      cloudinaryResponse.duration,
      userId
    );
    return NextResponse.json({ success: true, video: videoData.id }, { status: 201 });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message || "Upload failed" }, { status: 500 });
  }
}
