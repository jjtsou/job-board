import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container, VStack, Heading, Text, Box } from "@chakra-ui/react";
import { JobSearchForm, JobList } from "@/components/jobs";
import { fetchJobs, fetchFilters } from "@/lib/api";
import { createAbsoluteUrl } from "@/lib/url";
import type { JobSearchParams } from "@/types/job";
import type { Metadata } from "next";
import { LanguageSwitcher } from "@/components/ui";

interface Props {
	params: Promise<{ locale: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
	params,
	searchParams,
}: Props): Promise<Metadata> {
	const { locale } = await params;
	const searchParamsData = await searchParams;
	const t = await getTranslations({ locale, namespace: "meta" });

	const q = searchParamsData.q ?? "";
	const location = searchParamsData.location ?? "";
	const category = searchParamsData.category ?? "";
	const parts = [q, category, location && `in ${location}`].filter(Boolean);

	let title = t("title");
	let description = t("description");

	if (parts.length) {
		title = `${parts.join(" ")} Jobs - Job Search`;
		description = `Find ${parts.join(" ")} jobs and career opportunities. Browse thousands of job listings and apply today.`;
	}

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: "website",
			locale,
		},
		alternates: {
			canonical: createAbsoluteUrl("/"),
			languages: {
				en: createAbsoluteUrl("/en"),
				el: createAbsoluteUrl("/el"),
			},
		},
	};
}

export default async function JobsPage({ params, searchParams }: Props) {
	const { locale } = await params;

	// Enable static rendering
	setRequestLocale(locale);

	const t = await getTranslations({ locale, namespace: "jobs" });

	const { q, location, category, page } = await searchParams;

	const jobSearchParams = {
		lang: locale,
		q,
		location,
		category,
		page: page ? Number(page) : 1,
		pageSize: 10,
	} as JobSearchParams;

	const [jobsData, filtersData] = await Promise.all([
		fetchJobs(jobSearchParams),
		fetchFilters(),
	]);

	return (
		<Container maxW="container.xl" py={{ base: 4, md: 8 }} bg="brand.subtle">
			<VStack gap={{ base: 6, md: 8 }} align="stretch">
				<Box alignSelf="flex-end">
					<LanguageSwitcher />
				</Box>
				<VStack gap={2} textAlign="center">
					<Heading as="h1" size={{ base: "lg", md: "xl" }}>
						{t("title")}
					</Heading>
					<Text color="gray.600" fontSize={{ base: "md", md: "lg" }}>
						{t("subtitle")}
					</Text>
				</VStack>
				<JobSearchForm filters={filtersData} initialValues={jobSearchParams} />
				<JobList jobsData={jobsData} />
			</VStack>
		</Container>
	);
}
