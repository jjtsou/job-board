import { describe, it, expect } from "vitest";
import type { ReadonlyURLSearchParams } from "next/navigation";
import { getPageNumbers, createPageUrl } from "../utils";

describe("JobPagination utils", () => {
	describe("getPageNumbers", () => {
		it("returns all pages when totalPages <= 5", () => {
			expect(getPageNumbers(1, 1)).toEqual([1]);
			expect(getPageNumbers(3, 2)).toEqual([1, 2, 3]);
			expect(getPageNumbers(5, 3)).toEqual([1, 2, 3, 4, 5]);
		});

		it("returns 5 pages when totalPages > 5", () => {
			expect(getPageNumbers(10, 5)).toHaveLength(5);
			expect(getPageNumbers(20, 10)).toHaveLength(5);
			expect(getPageNumbers(100, 50)).toHaveLength(5);
		});

		it("centers current page when possible", () => {
			// Current page in middle, should be centered
			expect(getPageNumbers(20, 10)).toEqual([8, 9, 10, 11, 12]);
			expect(getPageNumbers(15, 8)).toEqual([6, 7, 8, 9, 10]);
		});

		it("handles edge case near beginning", () => {
			// When current page is near start, show first 5 pages
			expect(getPageNumbers(20, 1)).toEqual([1, 2, 3, 4, 5]);
			expect(getPageNumbers(20, 2)).toEqual([1, 2, 3, 4, 5]);
			expect(getPageNumbers(20, 3)).toEqual([1, 2, 3, 4, 5]);
		});

		it("handles edge case near end", () => {
			// When current page is near end, show last 5 pages
			expect(getPageNumbers(20, 20)).toEqual([16, 17, 18, 19, 20]);
			expect(getPageNumbers(20, 19)).toEqual([16, 17, 18, 19, 20]);
			expect(getPageNumbers(20, 18)).toEqual([16, 17, 18, 19, 20]);
		});

		it("handles transition from edge to center correctly", () => {
			// Test the transition points
			expect(getPageNumbers(20, 4)).toEqual([2, 3, 4, 5, 6]);
			expect(getPageNumbers(20, 17)).toEqual([15, 16, 17, 18, 19]);
		});

		it("returns consecutive page numbers", () => {
			const result = getPageNumbers(50, 25);

			// Check that all numbers are consecutive
			for (let i = 1; i < result.length; i++) {
				expect(result[i]).toBe(result[i - 1] + 1);
			}
		});

		it("always includes current page in result when totalPages > 5", () => {
			expect(getPageNumbers(10, 3)).toContain(3);
			expect(getPageNumbers(20, 7)).toContain(7);
			expect(getPageNumbers(100, 42)).toContain(42);
			expect(getPageNumbers(50, 1)).toContain(1);
			expect(getPageNumbers(50, 50)).toContain(50);
		});
	});

	describe("createPageUrl", () => {
		it("creates URL with page parameter", () => {
			const emptyParams = new URLSearchParams() as ReadonlyURLSearchParams;
			expect(createPageUrl(2, emptyParams)).toBe("?page=2");
			expect(createPageUrl(10, emptyParams)).toBe("?page=10");
		});

		it("preserves existing search parameters", () => {
			const existingParams = new URLSearchParams(
				"q=developer&location=ny",
			) as ReadonlyURLSearchParams;
			const result = createPageUrl(3, existingParams);

			expect(result).toContain("q=developer");
			expect(result).toContain("location=ny");
			expect(result).toContain("page=3");
		});

		it("overwrites existing page parameter", () => {
			const paramsWithPage = new URLSearchParams(
				"page=5&q=engineer",
			) as ReadonlyURLSearchParams;
			const result = createPageUrl(8, paramsWithPage);

			expect(result).toContain("page=8");
			expect(result).not.toContain("page=5");
			expect(result).toContain("q=engineer");
		});

		it("returns properly formatted URL string", () => {
			const params = new URLSearchParams(
				"test=value",
			) as ReadonlyURLSearchParams;
			const result = createPageUrl(1, params);

			expect(result).toMatch(/^\?/); // Should start with ?
			expect(result).toContain("test=value");
			expect(result).toContain("page=1");
		});
	});
});
