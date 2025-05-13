import prisma from "../prisma";

export async function getVideoDurationAndURL(videoId: string){
    const durationVideoAndURL = await prisma.video.findUnique({
        where: {id: videoId},
        select : {duration:true,cloudinaryUrl:true},
    });
    return {
        duration: durationVideoAndURL?.duration || 0,
        cloudinaryUrl: durationVideoAndURL?.cloudinaryUrl || "",
    }
}