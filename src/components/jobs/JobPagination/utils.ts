import type { ReadonlyURLSearchParams } from "next/navigation";

/**
 * Generates an array of page numbers for pagination display with intelligent windowing.
 *
 * This function creates a "sliding window" of page numbers that:
 * - Shows all pages if total pages ≤ 5
 * - Shows exactly 5 pages when total pages > 5
 * - Attempts to center the current page within the visible range
 * - Handles edge cases near the beginning and end of pagination
 *
 * @param totalPages - The total number of pages available
 * @param currentPage - The currently active page (1-indexed)
 * @returns Array of page numbers to display in the pagination UI
 *
 * @example
 * // Simple case: few pages
 * getPageNumbers(3, 2) → [1, 2, 3]
 *
 * // Centered case: current page in middle
 * getPageNumbers(20, 10) → [8, 9, 10, 11, 12]
 *
 * // Edge case: near beginning
 * getPageNumbers(20, 2) → [1, 2, 3, 4, 5]
 *
 * // Edge case: near end
 * getPageNumbers(20, 19) → [16, 17, 18, 19, 20]
 */
export const getPageNumbers = (
	totalPages: number,
	currentPage: number,
): number[] => {
	const maxVisible = 5;

	// Simple case: show all pages if we have 5 or fewer
	if (totalPages <= maxVisible)
		return [...Array(totalPages)].map((_, i) => i + 1);

	// Complex case: calculate sliding window boundaries
	const start = Math.max(
		1,
		Math.min(
			currentPage - 2, // Try to center current page (ideal positioning)
			totalPages - maxVisible + 1, // Don't exceed total pages (boundary constraint)
		),
	);

	// Generate array of consecutive page numbers
	return [...Array(maxVisible)].map((_, i) => start + i);
};

/**
 * Creates a URL with updated page parameter
 * @param page - The page number to navigate to
 * @param urlSearchParams - Current URL search parameters
 * @returns URL string with updated page parameter
 */
export const createPageUrl = (
	page: number,
	urlSearchParams: ReadonlyURLSearchParams,
): string => {
	const params = new URLSearchParams(urlSearchParams);
	params.set("page", page.toString());
	return `?${params}`;
};
