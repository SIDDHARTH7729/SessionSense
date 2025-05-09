
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { clerkId } = await req.json();
    if (!clerkId) {
      return NextResponse.json({ error: "Missing clerkId" }, { status: 400 });
    }
    
    let user = await prisma.user.findUnique({
      where: { clerkId },
      select: { id: true },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { clerkId },
        select: { id: true },
      });
      console.log("✅ A new user has been created:", user.id);
    }
    return NextResponse.json({ success: true, userId: user.id });
  } catch (error) {
    console.error("❌ Error in /check-user route:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
