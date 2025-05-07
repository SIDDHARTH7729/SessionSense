import prisma from "../prisma";

type WatchedInterval = [number, number];

export async function getWatchedIntervals(userId: string, videoId: string): Promise<WatchedInterval[]> {
  const progress = await prisma.progress.findUnique({
    where: {
      userId_videoId: {
        userId,
        videoId,
      },
    },
    select: { watched: true },
  });

  if (!progress || !Array.isArray(progress.watched)) return [];

  // Filter and assert types
  const intervals = progress.watched.filter(
    (interval: any): interval is WatchedInterval =>
      Array.isArray(interval) &&
      interval.length === 2 &&
      typeof interval[0] === "number" &&
      typeof interval[1] === "number"
  );

  return intervals;
}
