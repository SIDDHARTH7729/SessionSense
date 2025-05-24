import prisma from "@/lib/prisma";

type WatchedInterval = [number, number];

export async function updateVideoIntervals(
  userId: string,
  videoId: string,
  newIntervals: WatchedInterval[]
): Promise<{ success: boolean }> {
  try {
    // for atomicity
    await prisma.$transaction(async (tx) => {
      await tx.watchedInterval.deleteMany({
        where: {
          userId: userId,
          videoId: videoId,
        },
      });

      if (newIntervals.length > 0) {
        await tx.watchedInterval.createMany({
          data: newIntervals.map((interval) => ({
            userId: userId,
            videoId: videoId,
            start: interval[0],
            end: interval[1],
          })),
        });
      }
    });

    console.log(`Successfully updated intervals for user ${userId} and video ${videoId}`);
    return { success: true };
  } catch (error) {
    console.error(`Error updating intervals for user ${userId} and video ${videoId}:`, error);
    throw new Error("Failed to update video intervals.");
  }
}

/*
Topic to be thought about ->

Here the question arises from the fact that  firstly deleting and then inserting
all the data directly into the database can be thought about as an major issue for the performance and
querying fro the database.
But it does come around with a threshold scenario
if the intervals are few, then taking this technology wont have much
affect on the performance.
If its sort of falls in medium category(number we havent defined here)
then some morelogic can be added
But if it falls in the large category then it would create a mjaor
isue and slow down of the performance. In these cases NoSql databses lie
CassandraDb whc have a very high throughput rate  serves as a better option for
this scenario.


*/