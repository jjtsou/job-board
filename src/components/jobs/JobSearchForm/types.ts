import type { FiltersResponse, JobSearchParams } from "@/types/job";

export interface JobSearchFormProps {
	filters: FiltersResponse;
	initialValues: JobSearchParams;
}

export interface FormData {
	q: string;
	location: string;
	category: string;
}
