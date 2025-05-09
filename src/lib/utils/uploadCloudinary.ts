import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function upload(previousState: any, formData: FormData) {
  const file = formData.get("video") as File;

  if (!file || file.size === 0) {
    throw new Error("No video file provided");
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const uploadStream = (): Promise<any> =>
    new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "video",
          public_id: `video_${Date.now()}`,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      Readable.from(buffer).pipe(stream);
    });

  try {
    const response = await uploadStream();

    return {
      url: response.secure_url,
      publicId: response.public_id,
      duration: Math.round(response.duration),
      format: response.format,
      width: response.width,
      height: response.height,
      resourceType: response.resource_type,
      createdAt: response.created_at,
    };
  } catch (error: any) {
    console.error("Upload failed:", error);
    throw new Error("Upload failed");
  }
}
