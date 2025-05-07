import prisma from "../prisma";

export async function getVideoDuration(videoId: string){
    const durationVideo = await prisma.video.findUnique({
        where: {id: videoId},
        select : {duration:true},
    });
    return durationVideo?.duration || 0;
}