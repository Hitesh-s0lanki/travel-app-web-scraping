import client from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const trips = await client.trips.findMany({
            orderBy: { scrapedOn: "desc" }
        })
        if (trips) return NextResponse.json({ trips }, { status: 200 })

        return NextResponse.json({ msg: "No trips found." }, { status: 404 })
    } catch (error) {
        return NextResponse.json({
            message: "An unexpected error occured."
        }, { status: 500 })
    }
}