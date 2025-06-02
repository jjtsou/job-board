/**
 * SEO and metadata utilities for canonical URLs and meta tags
 */

import { createAbsoluteUrl } from "./url";

interface SearchParamsInput {
	q?: string | undefined;
	location?: string | undefined;
	category?: string | undefined;
	page?: string | undefined;
}

interface NormalizedSearchParams {
	q: string;
	location: string;
	category: string;
	page: string;
}

/**
 * Normalizes search param values to strings
 */
export function normalizeSearchParams({
	q,
	location,
	category,
	page,
}: SearchParamsInput) {
	return {
		q: q ?? "",
		location: location ?? "",
		category: category ?? "",
		page: page ?? "",
	};
}

/**
 * Creates URL search parameters for canonical URLs, excluding default values
 */
export function createCanonicalParams(params: NormalizedSearchParams) {
	const paramEntries = [
		params.q && ["q", params.q],
		params.location && ["location", params.location],
		params.category && ["category", params.category],
		params.page !== "1" && params.page && ["page", params.page],
	].filter(Boolean) as [string, string][];

	return new URLSearchParams(paramEntries);
}

/**
 * Generates a canonical URL for the current page with search parameters
 */
export function generateCanonicalUrl(
	locale: string,
	searchParams: SearchParamsInput,
): string {
	const canonicalParams = createCanonicalParams(
		searchParams as NormalizedSearchParams,
	);

	const canonicalPath = `/${locale}${
		canonicalParams.toString() ? `?${canonicalParams.toString()}` : ""
	}`;

	return createAbsoluteUrl(canonicalPath);
}

/**
 * Creates title parts for SEO meta titles
 */
export function createTitleParts(params: NormalizedSearchParams): string[] {
	const { q, location, category } = params;
	return [q, category, location && `in ${location}`].filter(Boolean);
}

/**
 * Generates SEO-optimized meta title and description
 */
export function generateMetaTags(
	titleParts: string[],
	defaultTitle: string,
	defaultDescription: string,
) {
	if (!titleParts?.length)
		return {
			title: defaultTitle,
			description: defaultDescription,
		};

	const searchContext = titleParts.join(" ");
	return {
		title: `${searchContext} Jobs - Job Search`,
		description: `Find ${searchContext} jobs and career opportunities. Browse thousands of job listings and apply today.`,
	};
}
