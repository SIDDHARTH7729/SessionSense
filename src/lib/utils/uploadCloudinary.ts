
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function upload(previousState: string | undefined | null, formData: FormData) {

    // gets the videofile as input
  const file = formData.get("video") as File;

  if (!file || file.size === 0) {
    throw new Error("No video file provided");
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    const base64Video = `data:${file.type};base64,${buffer.toString("base64")}`;
    console.log(`Uploading video: ${file.name}...`);

    // sends video to upload on the cloudinary
    const response = await cloudinary.uploader.upload(base64Video, {
      resource_type: "video",
      public_id: `video_${Date.now()}`,
    });

    console.log("Uploaded video URL:", response.secure_url);
    // returns whatever we need to push to database
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
    console.error("Cloudinary upload failed:", error);
    throw new Error("Upload failed");
  }
}
