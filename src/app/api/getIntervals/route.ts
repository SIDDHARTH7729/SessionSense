import { NextResponse, NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { getVideoIntervals } from "@/lib/utils/getVideoIntervals";
import { getCurrentUser } from "@/lib/utils/getCurrentUser";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const videoId = searchParams.get("videoId");

    const { userId: clerkId } = getAuth(request);

    if (!clerkId) {
        console.warn("Unauthorized: Clerk userId not found.");
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!videoId) {
        console.warn("Bad Request: videoId is missing from query parameters.");
        return NextResponse.json({ error: "Bad Request: videoId is required" }, { status: 400 });
    }

    try {
        const databaseUserId = await getCurrentUser(clerkId);

        if (!databaseUserId) {
            console.error(`User not found in database for Clerk ID: ${clerkId}`);
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const intervals = await getVideoIntervals({
            userId: databaseUserId,
            videoId: videoId,
        });
        console.log(`Successfully fetched intervals for user ${databaseUserId}`);
        return NextResponse.json({ intervals }, { status: 200 });
    } catch (error) {
        console.error("API Error fetching intervals:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}