import client from "@/lib/prisma";
import { jobsQueue } from "@/lib/queue";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try {
        const { url, jobType } = await request.json()
        const response = await client.jobs.create({ data: { url, jobType } })

        await jobsQueue.add("new location", { url, jobType, id: response.id })

        return NextResponse.json({ jobCreated: true }, { status: 201 })
    } catch (error) {
        return NextResponse.json({
            message: "An unexpected error occured"
        }, { status: 500 })
    }
}