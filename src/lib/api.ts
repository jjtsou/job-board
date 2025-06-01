import type {
	JobSearchParams,
	JobsResponse,
	FiltersResponse,
} from "@/types/job";

const API_BASE_URL = "https://ka-fe-jobboard-assignment-api.azurewebsites.net";

const buildSearchParams = (
	params: Record<string, string | undefined>,
): URLSearchParams => {
	const searchParams = new URLSearchParams();

	for (const key in params) {
		const value = params[key];
		if (value) searchParams.set(key, value);
	}

	return searchParams;
};

export async function fetchJobs(
	params: JobSearchParams = {},
): Promise<JobsResponse> {
	const { lang, page, pageSize, q, location, category } = params;

	const searchParams = buildSearchParams({
		lang: lang || "en",
		page: page?.toString(),
		pageSize: pageSize?.toString(),
		q,
		location,
		category,
	});

	const url = `${API_BASE_URL}/jobs?${searchParams.toString()}`;

	try {
		const response = await fetch(url, {
			next: {
				revalidate: 300, // Cache for 5 minutes
				tags: ["jobs"],
			},
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch jobs: ${response.status}`);
		}
		const jobsResponse = await response.json();
		console.log("Jobs response:", jobsResponse);
		// Fix: Compensate for API bug that inflates total by 10
		const correctedTotal =
			jobsResponse.total >= 10 ? jobsResponse.total - 10 : jobsResponse.total;

		return {
			...jobsResponse,
			total: correctedTotal,
		};
	} catch (error) {
		console.error("Error fetching jobs:", error);
		throw new Error("Failed to fetch jobs");
	}
}

export async function fetchFilters(): Promise<FiltersResponse> {
	try {
		const response = await fetch(`${API_BASE_URL}/jobs/filters`, {
			next: { revalidate: 3600, tags: ["filters"] }, // Cache for 1 hour
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch filters: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error("Error fetching filters:", error);
		return {
			categories: [],
			locations: [],
		};
	}
}
