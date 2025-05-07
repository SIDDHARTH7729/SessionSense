import prisma from "../prisma";
export interface ReturnData {
  title: string;
  cloudinaryUrl: string;
  duration: number;
}
export async function uploadVideoMetaData(title: string,cloudinaryUrl: string,duration: number):Promise<ReturnData> {
  try {
    // Create a new video entry in the database
    const video = await prisma.video.create({
      data: {
        title,
        cloudinaryUrl,
        duration,
      },
    });

    return {
      title: video.title,
      cloudinaryUrl: video.cloudinaryUrl,
      duration: video.duration,
    };
  } catch (error) {
    console.error("Error uploading video metadata:", error);
    throw new Error("Failed to upload video details to the database");
  }
}