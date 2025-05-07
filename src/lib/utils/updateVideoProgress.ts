import prisma from "../prisma";

type WatchedInterval = [number, number];

export async function updateVideoProgressInDatabase(
  userId: string,
  videoId: string,
  watchedIntervals: WatchedInterval[],
  lastPosition: number
): Promise<void> {
  try {
    await prisma.progress.upsert({
      where: {
        userId_videoId: {
          userId,
          videoId,
        },
      },
      update: {
        watched: watchedIntervals,
        lastPosition,
      },
      create: {
        userId,
        videoId,
        watched: watchedIntervals,
        lastPosition,
      },
    });
    console.log(`Progress updated for user ${userId}, video ${videoId}`);
  } catch (error) {
    console.error(
      `Error updating progress for user ${userId}, video ${videoId}:`,
      error
    );
    throw error; 
  }
}