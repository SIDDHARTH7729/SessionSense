type WatchedInterval = [number, number];
export function mergeIntervals(intervals: WatchedInterval[]): WatchedInterval[] {
  if (intervals.length === 0) return [];

  // Sorting intervals by start time
  const sorted = intervals.slice().sort((a, b) => a[0] - b[0]);

  const merged: WatchedInterval[] = [sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    const [currStart, currEnd] = sorted[i];
    const last = merged[merged.length - 1];

    if (currStart <= last[1]) {
      last[1] = Math.max(last[1], currEnd);
    } else {
      merged.push([currStart, currEnd]); 
    }
  }

  return merged;
}
