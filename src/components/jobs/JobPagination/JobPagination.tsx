"use client";

// I could use Chakras Pagination component as I did in FormSelect, but because this is an assignment
// I implemented my own pagination component to demonstrate my understanding of pagination logic and UI design

import {
	type ReadonlyURLSearchParams,
	useRouter,
	useSearchParams,
} from "next/navigation";
import { useTranslations } from "next-intl";
import { HStack, Button, Text, Flex } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { JobPaginationProps } from "./types";
import { getPageNumbers, createPageUrl } from "./utils";

export function JobPagination({
	currentPage,
	totalPages,
	hasNextPage,
	hasPreviousPage,
}: JobPaginationProps) {
	const t = useTranslations("common");
	const router = useRouter();
	const urlSearchParams = useSearchParams();

	if (totalPages <= 1) return null;

	const handlePageChange = (page: number) => {
		const url = createPageUrl(page, urlSearchParams);
		router.push(url);
	};
	const pageNumbers = getPageNumbers(totalPages, currentPage);

	return (
		<Flex
			align="center"
			justify={{ base: "center", md: "space-between" }}
			gap={4}
			py={4}
			direction={{ base: "column", md: "row" }}
			data-testid="job-pagination"
		>
			<Text fontSize="sm" color="gray.500" fontWeight="medium">
				{t("page")} {currentPage} {t("of")} {totalPages}
			</Text>

			<HStack gap={2}>
				<Button
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={!hasPreviousPage}
					variant="outline"
					size="sm"
				>
					<HStack gap={1}>
						<ChevronLeft size={16} color="gray" />
						<span>{t("previous")}</span>
					</HStack>
				</Button>

				{pageNumbers.map((page) => (
					<Button
						key={page}
						onClick={() => handlePageChange(page)}
						variant={page === currentPage ? "solid" : "outline"}
						colorScheme={page === currentPage ? "brand" : "gray"}
						size="sm"
						minW="40px"
						display={{ base: "none", sm: "inline-flex" }}
					>
						{page}
					</Button>
				))}

				<Button
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={!hasNextPage}
					variant="outline"
					size="sm"
				>
					<HStack gap={1}>
						<span>{t("next")}</span>
						<ChevronRight size={16} color="gray" />
					</HStack>
				</Button>
			</HStack>
		</Flex>
	);
}
