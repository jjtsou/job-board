// Multiple sitemaps implementation using Next.js generateSitemaps
// Sitemap types: 0 = static pages, 1 = categories, 2 = locations
// Google's limit is 50,000 URLs per sitemap
import type { MetadataRoute } from "next";
import { fetchFilters } from "@/lib/api";

const createSitemapGenerators = (baseUrl: string, currentDate: Date) => ({
	0: async (): Promise<MetadataRoute.Sitemap> => [
		{
			url: `${baseUrl}/en`,
			lastModified: currentDate,
			changeFrequency: "daily",
			priority: 1,
		},
		{
			url: `${baseUrl}/el`,
			lastModified: currentDate,
			changeFrequency: "daily",
			priority: 1,
		},
	],

	1: async (): Promise<MetadataRoute.Sitemap> => {
		// Category pages
		const filters = await fetchFilters();
		const categoryPages: MetadataRoute.Sitemap = [];

		for (const category of filters.categories) {
			const encodedCategory = encodeURIComponent(category.slug);
			categoryPages.push(
				{
					url: `${baseUrl}/en?category=${encodedCategory}`,
					lastModified: currentDate,
					changeFrequency: "weekly",
					priority: 0.8,
				},
				{
					url: `${baseUrl}/el?category=${encodedCategory}`,
					lastModified: currentDate,
					changeFrequency: "weekly",
					priority: 0.8,
				},
			);
		}
		return categoryPages;
	},

	2: async (): Promise<MetadataRoute.Sitemap> => {
		// Location pages
		const filters = await fetchFilters();
		const locationPages: MetadataRoute.Sitemap = [];

		for (const location of filters.locations) {
			const encodedLocation = encodeURIComponent(location.slug);
			locationPages.push(
				{
					url: `${baseUrl}/en?location=${encodedLocation}`,
					lastModified: currentDate,
					changeFrequency: "weekly",
					priority: 0.7,
				},
				{
					url: `${baseUrl}/el?location=${encodedLocation}`,
					lastModified: currentDate,
					changeFrequency: "weekly",
					priority: 0.7,
				},
			);
		}
		return locationPages;
	},
});

export async function generateSitemaps() {
	return [{ id: 0 }, { id: 1 }, { id: 2 }];
}

export default async function sitemap({
	id,
}: {
	id: number | string;
}): Promise<MetadataRoute.Sitemap> {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
	const currentDate = new Date();
	const numericId = Number(id);

	const sitemapGenerators = createSitemapGenerators(baseUrl, currentDate);

	try {
		const generator =
			sitemapGenerators[numericId as keyof typeof sitemapGenerators];

		return await generator();
	} catch (error) {
		console.error(`Error generating sitemap ${id}:`, error);
		return [];
	}
}
