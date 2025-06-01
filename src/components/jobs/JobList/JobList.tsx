import { useTranslations } from "next-intl";
import { Box, Text, VStack } from "@chakra-ui/react";
import { JobPagination } from "../JobPagination/JobPagination";
import { JobCard } from "../JobCard/JobCard";
import type { JobListProps } from "./types";

export function JobList({ jobsData }: JobListProps) {
	const t = useTranslations("common");

	if (!jobsData?.results)
		return (
			<Box textAlign="center" py={8}>
				<Text fontSize="lg" color="gray.600">
					{t("noResults")}
				</Text>
			</Box>
		);

	const { results, total, page, pageSize } = jobsData;
	const totalPages = Math.ceil(total / pageSize);

	return (
		<VStack gap={6} align="stretch">
			<Text color="gray.600">
				{t("results")}: {total}
			</Text>
			<VStack gap={4} align="stretch">
				{results.map((job) => (
					<JobCard key={job.id} job={job} />
				))}
			</VStack>
			<JobPagination
				currentPage={page}
				totalPages={totalPages}
				hasNextPage={page < totalPages}
				hasPreviousPage={page > 1}
			/>
		</VStack>
	);
}
