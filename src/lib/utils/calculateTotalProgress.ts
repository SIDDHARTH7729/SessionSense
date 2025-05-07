type WatchedInterval = [number, number];

export async function calculateTotalProgress(watchedIntervals: WatchedInterval[], totalDuration: number): Promise<number> {
  if (!totalDuration || totalDuration <= 0) {
    return 0;
  }
  let totalWatchedTime = 0;
  for (const interval of watchedIntervals) {
    totalWatchedTime += interval[1] - interval[0];
  }
  const progressPercentage = (totalWatchedTime / totalDuration) * 100;
  return progressPercentage;
}