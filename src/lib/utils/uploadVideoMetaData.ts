import prisma from "../prisma"; // make sure this points to the generated client correctly

export interface ReturnData {
  id: string;
  title: string;
  cloudinaryUrl: string;
  duration: number;
}

export async function uploadVideoMetaData(
  title: string,
  cloudinaryUrl: string,
  duration: number,
  userId: string,
): Promise<ReturnData> {
  try {
    const video = await prisma.video.create({
      data: {
        title,
        cloudinaryUrl,
        duration,
        userId,
      },
    });
    return {
      id: video.id,
      title: video.title,
      cloudinaryUrl: video.cloudinaryUrl,
      duration: video.duration,
    };
  } catch (error) {
    console.error("Error uploading video metadata:", error);
    throw new Error("Failed to upload video details to the database");
  }
}
