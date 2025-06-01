"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Box, Button, Input, VStack, Stack, HStack } from "@chakra-ui/react";
import { Search } from "lucide-react";
import { FormSelect } from "@/components/ui";
import type { JobSearchFormProps } from "./types";
import { updateSearchParams } from "./utils";

export function JobSearchForm({ filters, initialValues }: JobSearchFormProps) {
	const t = useTranslations("jobs");
	const router = useRouter();
	const searchParams = useSearchParams();

	const { q = "", location = "", category = "" } = initialValues;
	const [formData, setFormData] = useState({
		q,
		location,
		category,
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const params = updateSearchParams(
			formData,
			new URLSearchParams(searchParams.toString()),
		);

		router.push(`?${params.toString()}`);
	};

	const handleInputChange = (field: string, value: string) =>
		setFormData((prev) => ({ ...prev, [field]: value }));

	return (
		<Box
			as="form"
			onSubmit={handleSubmit}
			bg="white"
			p={6}
			borderRadius="lg"
			shadow="md"
			border="1px"
			borderColor="gray.200"
		>
			<VStack gap={4} align="stretch">
				<Input
					placeholder={t("searchPlaceholder")}
					value={formData.q}
					onChange={(e) => handleInputChange("q", e.target.value)}
					size={{ base: "md", md: "lg" }}
					aria-label={t("searchPlaceholder")}
					id="job-search-input"
				/>
				<Stack direction={{ base: "column", md: "row" }} gap={4}>
					<Box flex="1">
						<FormSelect
							value={formData.location}
							onChange={(value) => handleInputChange("location", value)}
							placeholder={t("selectLocation")}
							allOptionLabel={t("allLocations")}
							options={filters.locations}
							ariaLabel={t("selectLocation")}
						/>
					</Box>
					<Box flex="1">
						<FormSelect
							value={formData.category}
							onChange={(value) => handleInputChange("category", value)}
							placeholder={t("selectCategory")}
							allOptionLabel={t("allCategories")}
							options={filters.categories}
							ariaLabel={t("selectCategory")}
						/>
					</Box>
					<Button
						type="submit"
						colorScheme="brand"
						size={{ base: "md", md: "lg" }}
						minW={{ base: "full", md: "120px" }}
						aria-label={t("searchJobs")}
					>
						<HStack gap={2}>
							<Search size={18} />
							<span>{t("search")}</span>
						</HStack>
					</Button>
				</Stack>
			</VStack>
		</Box>
	);
}
