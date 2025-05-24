import { NextResponse } from "next/server";
import prisma from "../prisma";


type watchedIntervals = [number, number]

export async function getVideoIntervals({userId,videoId}:{userId:string,videoId:string}) {
    try {
        const intervals = await prisma.watchedInterval.findMany({
            where:{
                userId:userId,
                videoId:videoId
            },
            select:{
                start:true,
                end:true,
            },
            orderBy:{
                start:'asc',
            }
        })

        if(!intervals){
            console.log("We couldn't fetch the intervals from the database");
            return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
        }

        const mappedIntervals: watchedIntervals[] = intervals.map(
            (interval) => [interval.start, interval.end]
        );

        return NextResponse.json(mappedIntervals);
    } catch (error) {
        console.log("An error occured whole fetching the intervals from the database",error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}