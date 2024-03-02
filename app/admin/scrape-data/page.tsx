"use client";

import CurrentlyScrapingTable from "@/components/admin/currently-scraping-table";
import ScrapingQueue from "@/components/admin/scraping-queue";
import ApiClient from "@/lib/api-client";
import { ADMIN_API_ROUTES } from "@/lib/utils";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Listbox,
  ListboxItem,
  Tab,
  Tabs,
} from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";

const Page = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState<undefined | string>(
    undefined
  );
  const [jobs, setJobs] = useState([]);

  const searchCities = async (searchQuery: string) => {
    if (searchQuery) {
      const response = await axios.get(
        `https://secure.geonames.org/searchJSON?q=${searchQuery}&maxRows=5&username=kishan&style=SHORT`
      );
      const parsed = response.data;
      setCities(
        parsed?.geonames.map((city: { name: string }) => city.name) ?? []
      );
    } else {
      setCities([]);
    }
  };

  const startScraping = async () => {
    await ApiClient.post(ADMIN_API_ROUTES.CREATE_JOB, {
      url:
        "https://packages.yatra.com/holidays/intl/search.htm?destination=" +
        selectedCity,
      jobType: { type: "location" },
    });
  };

  useEffect(() => {
    const getData = async () => {
      const data = await ApiClient.get(ADMIN_API_ROUTES.JOB_DETAILS);
      setJobs(data?.data.jobs);
    };
    const interval = setInterval(() => getData(), 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="m-10 grid grid-cols-3 gap-5">
      <Card className=" col-span-2">
        <CardBody>
          <Tabs>
            <Tab key="location" title="Location">
              <Input
                type="text"
                label="Search for a loaction"
                onChange={(e) => searchCities(e.target.value)}
              />
              <div className="w-full min-h-[200px] max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100 mt-5">
                <Listbox
                  aria-label="Actions"
                  onAction={(key) => setSelectedCity(key as string)}
                >
                  {cities &&
                    cities.map((city) => (
                      <ListboxItem
                        key={city}
                        color="primary"
                        className="text-primary-500"
                      >
                        {city}
                      </ListboxItem>
                    ))}
                </Listbox>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
        <CardFooter className="flex flex-col gap-5">
          <div>
            {selectedCity && (
              <h1 className=" text-xl">Scrape data for {selectedCity}</h1>
            )}
          </div>
          <Button
            size="lg"
            className="w-full"
            color="primary"
            onClick={startScraping}
          >
            Scrape
          </Button>
        </CardFooter>
      </Card>
      <ScrapingQueue />
      <div className="col-span-3">
        <CurrentlyScrapingTable jobs={jobs} />
      </div>
    </section>
  );
};

export default Page;
