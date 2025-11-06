import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(
  file: File,
  folder: string = "jengacode"
): Promise<string> {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
          resource_type: "auto",
          quality: "auto",
          fetch_format: "auto",
        },
        (error, result) => {
          if (error) {
            reject(new Error(`Upload failed: ${error.message}`));
          } else if (result) {
            resolve(result.secure_url);
          } else {
            reject(new Error("Upload failed: No result returned"));
          }
        }
      );

      uploadStream.end(buffer);
    });
  } catch (error) {
    throw new Error(
      `Cloudinary upload error: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    throw new Error(
      `Cloudinary delete error: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

export function extractPublicId(url: string): string {
  const match = url.match(/\/([^/]+)$/);
  return match ? match[1].split(".")[0] : "";
}
