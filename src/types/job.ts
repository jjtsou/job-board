export interface Job {
	id: number;
	slug: string;
	title: string;
	company: string;
	location: string;
	category: string;
	tags: string[];
	description: string;
	postedAt: string;
}

export interface JobsResponse {
	total: number;
	page: number;
	pageSize: number;
	results: Job[];
}

export interface FilterOption {
	slug: string;
	label_en: string;
	label_el: string;
}

export interface FiltersResponse {
	locations: FilterOption[];
	categories: FilterOption[];
}

export interface JobSearchParams {
	lang?: string;
	q?: string;
	location?: string;
	category?: string;
	page?: number;
	pageSize?: number;
}
