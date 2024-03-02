import client from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
    try {
        const jobs = await client.jobs.findMany({ orderBy: { createdAt: "desc" } })
        const onGoingJobs = await client.jobs.findMany({
            where: {
                isComplete: false
            }
        })

        return NextResponse.json({ jobs, onGoingJobs: onGoingJobs?.length ?? 0 }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            message: "An unexpected error occured"
        }, { status: 500 })
    }
}