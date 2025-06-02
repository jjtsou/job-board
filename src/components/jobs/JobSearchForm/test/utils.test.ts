import { describe, it, expect } from "vitest";
import { updateSearchParams } from "../utils";
import type { FormData } from "../types";

describe("JobSearchForm utils", () => {
	describe("updateSearchParams", () => {
		it("adds form data to empty search params", () => {
			const formData: FormData = {
				q: "React Developer",
				location: "new-york",
				category: "technology",
			};
			const currentParams = new URLSearchParams();

			const result = updateSearchParams(formData, currentParams);

			expect(result.get("q")).toBe("React Developer");
			expect(result.get("location")).toBe("new-york");
			expect(result.get("category")).toBe("technology");
		});

		it("updates existing search params", () => {
			const formData: FormData = {
				q: "Frontend Developer",
				location: "london",
				category: "design",
			};
			const currentParams = new URLSearchParams("q=old&location=old");

			const result = updateSearchParams(formData, currentParams);

			expect(result.get("q")).toBe("Frontend Developer");
			expect(result.get("location")).toBe("london");
			expect(result.get("category")).toBe("design");
		});

		it("removes parameters when form values are empty", () => {
			const formData: FormData = {
				q: "",
				location: "",
				category: "technology",
			};
			const currentParams = new URLSearchParams(
				"q=old&location=old&category=old",
			);

			const result = updateSearchParams(formData, currentParams);

			expect(result.has("q")).toBe(false);
			expect(result.has("location")).toBe(false);
			expect(result.get("category")).toBe("technology");
		});

		it("deletes page parameter to reset pagination", () => {
			const formData: FormData = {
				q: "Developer",
				location: "",
				category: "",
			};
			const currentParams = new URLSearchParams("page=5&other=value");

			const result = updateSearchParams(formData, currentParams);

			expect(result.has("page")).toBe(false);
			expect(result.get("other")).toBe("value");
			expect(result.get("q")).toBe("Developer");
		});
	});
});
