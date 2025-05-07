
export function getDebounceInterval(durationInSeconds: number): number {
    if (durationInSeconds <= 10) return 2000;     // Every 2s
    if (durationInSeconds <= 60) return 3000;     // Every 3s
    return 5000;                                  // Every 5s
  }
  