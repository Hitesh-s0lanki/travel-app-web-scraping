"use client";

import Navbar from "@/components/client/navbar";
import Loading from "@/components/loading";
import ApiClient from "@/lib/api-client";
import { USER_API_ROUTES, removeHtmlTags } from "@/lib/utils";
import { TripType } from "@/types/trips";
import { Button, Chip } from "@nextui-org/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";

const TripsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchCity = searchParams.get("city");
  const [trips, setTrips] = useState<TripType[]>([]);

  const fetchTrips = useCallback(async () => {
    if (searchCity) {
      const data = await ApiClient.get(
        `${USER_API_ROUTES.GET_CITY_TRIPS}?city=${searchCity}`
      );
      if (data.data.trips) setTrips(data.data.trips);
    }
  }, [searchCity]);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  return (
    <div className="h-full w-full bg-white">
      <Navbar />
      <div className="px-28 py-10 flex flex-col">
        <div>
          <Button
            className="my-5"
            variant="shadow"
            color="primary"
            size="lg"
            onClick={() => router.push("/")}
          >
            <FaChevronLeft />
            Go Back
          </Button>
        </div>
        {!trips && <Loading />}
        <div className=" grid grid-cols-2 gap-5">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="grid grid-cols-9 gap-5 rounded-2xl border border-neutral-300 cursor-pointer"
              onClick={() => router.push(`/trips/${trip.id}`)}
            >
              {/* Image */}
              <div className="relative w-full h-48 col-span-3 ">
                <Image
                  src={trip.images[0]}
                  alt="trip"
                  fill
                  className="rounded-2xl"
                />
              </div>
              <div
                className="col-span-6 pt-5 pr-5 flex flex-col gap-1
            "
              >
                <h2 className="text-lg font-medium capitalize">
                  <span className="line-clamp-1">{trip.name} </span>
                </h2>
                <div>
                  <ul className="flex  gap-5 w-full overflow-hidden">
                    {trip.destinationDetails.map((detail, index) => (
                      <li key={detail.name}>
                        <Chip
                          color={index % 2 === 0 ? "secondary" : "danger"}
                          variant="flat"
                        >
                          {detail.name}
                        </Chip>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="line-clamp-1">
                    {removeHtmlTags(trip.description)}
                  </p>
                </div>
                <div className="flex gap-4">
                  <div>{trip.days} days</div>
                  <div>{trip.nights} nights</div>
                </div>

                {/* Activities */}
                <div className="flex justify-between">
                  <span>{trip.id}</span>
                  <span>
                    <strong>${trip.price}</strong> / person
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TripsPage;
