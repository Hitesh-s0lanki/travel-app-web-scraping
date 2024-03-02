import { Browser } from "puppeteer";
import client from "@/lib/prisma";
import { startLocationScrapping } from "./scraping/location-scraping";
import { Job } from "bullmq";
import { startPackageScraping } from "./scraping/package-scraping";

export const register = async () => {
    if (process.env.NEXT_RUNTIME === "nodejs") {
        const { Worker } = await import("bullmq");
        const { connection } = await import("./lib/redis");
        const { jobsQueue } = await import("./lib/queue");
        const puppeteer = await import("puppeteer");
        const SBR_WS_ENDPOINT = 'wss://brd-customer-hl_4960c828-zone-travel_scraping_browser:j7a3ephwyiba@brd.superproxy.io:9222';
        new Worker("jobsQueue", async (job: Job) => {
            let browser: undefined | Browser = undefined
            try {

                browser = await puppeteer.connect({
                    browserWSEndpoint: SBR_WS_ENDPOINT,
                });

                const page = await browser.newPage()

                if (job.data.jobType.type === "location") {
                    console.log("Connected! Navigateing to " + job.data.url)
                    await page.goto(job.data.url, { timeout: 60000 })
                    console.log("Navigated! Scraping page content...")
                    const packages = await startLocationScrapping(page)
                    await client.jobs.update({
                        where: { id: job.data.id },
                        data: { isComplete: true, status: "complete" },
                    });

                    for (const pkg of packages) {
                        const jobCreated = await client.jobs.findFirst({
                            where: {
                                url: `https://packages.yatra.com/holidays/intl/details.htm?packageId=${pkg?.id}`,
                            },
                        });
                        if (!jobCreated) {
                            const job = await client.jobs.create({
                                data: {
                                    url: `https://packages.yatra.com/holidays/intl/details.htm?packageId=${pkg?.id}`,
                                    jobType: { type: "package" },
                                },
                            });
                            jobsQueue.add("package", { ...job, packageDetails: pkg });
                        }
                    }
                } else if (job.data.jobType.type === "package") {
                    // Already Scrapped Check
                    const alreadyScrapped = await client.trips.findUnique({
                        where: {
                            id: job.data.packageDetails.id
                        }
                    })

                    if (!alreadyScrapped) {
                        console.log("Connected! Navigating to " + job.data.url);
                        await page.goto(job.data.url, { timeout: 60000 });
                        console.log("Navigated! Scraping page content...");
                        const pkg = await startPackageScraping(page, job.data.packageDetails)
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        await client.trips.create({ data: pkg })
                        await client.jobs.update({
                            where: { id: job.data.id },
                            data: { isComplete: true, status: "complete" },
                        });
                    }
                    // Scrape the Package
                    // Store the Package in trips model
                    // Mark the job as complete
                }

            } catch (error) {
                console.log(error)
                await client.jobs.update({
                    where: {
                        id: job.data.id
                    },
                    data: {
                        isComplete: true, status: "failed"
                    }
                })
            } finally {
                await browser?.close();
                console.log("Browser closed successfully")
            }


        }, {
            connection,
            concurrency: 10,
            removeOnComplete: { count: 1000 },
            removeOnFail: { count: 5000 }
        })
    }
}