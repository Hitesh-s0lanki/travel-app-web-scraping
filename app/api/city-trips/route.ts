// @ts-nocheck

import client from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const city = searchParams.get("city")

        if (city) {
            const allTrips = await client.trips.findMany()
            const filterTrips = allTrips.filter((trip) => {
                const destinationItinerary = trip.destinationItinerary || []

                return destinationItinerary.some(
                    (destination) => destination.place.toLowerCase() === city.toLowerCase()
                )
            })

            if (filterTrips) {
                return NextResponse.json({ trips: filterTrips }, { status: 200 })
            }

            return NextResponse.json({ message: "No Trip found" }, { status: 404 })
        }

        return NextResponse.json({ message: "City name is Required" }, { status: 404 })

    } catch (error) {
        return NextResponse.json({
            message: "An unexpected error occured."
        }, { status: 500 })
    }

}