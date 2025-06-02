import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { renderUtil } from "@/test/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { JobSearchForm } from "../JobSearchForm";
import type { JobSearchFormProps } from "../types";
import type { FiltersResponse } from "@/types/job";

vi.mock("next/navigation", () => ({
	useRouter: vi.fn(),
	useSearchParams: vi.fn(),
}));

vi.mock("@/components/ui", () => ({
	FormSelect: ({
		value,
		onChange,
		placeholder,
		ariaLabel,
	}: {
		value: string;
		onChange: (value: string) => void;
		placeholder: string;
		ariaLabel: string;
	}) => (
		<div
			data-testid={`form-select-${ariaLabel?.toLowerCase().replace(/ /g, "-")}`}
		>
			<input
				data-testid={`form-select-input-${ariaLabel?.toLowerCase().replace(/ /g, "-")}`}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				aria-label={ariaLabel}
			/>
		</div>
	),
}));

const mockPush = vi.fn();
const mockSearchParams = new URLSearchParams();

const mockFilters: FiltersResponse = {
	locations: [
		{ slug: "new-york", label_en: "New York", label_el: "Νέα Υόρκη" },
		{ slug: "london", label_en: "London", label_el: "Λονδίνο" },
	],
	categories: [
		{ slug: "technology", label_en: "Technology", label_el: "Τεχνολογία" },
		{ slug: "design", label_en: "Design", label_el: "Σχεδίαση" },
	],
};

const defaultProps: JobSearchFormProps = {
	filters: mockFilters,
	initialValues: {
		q: "",
		location: "",
		category: "",
	},
};

describe("JobSearchForm", () => {
	beforeEach(() => {
		vi.clearAllMocks();

		(useRouter as ReturnType<typeof vi.fn>).mockReturnValue({
			push: mockPush,
		});

		(useSearchParams as ReturnType<typeof vi.fn>).mockReturnValue(
			mockSearchParams,
		);
	});

	it("renders the search form with all elements", () => {
		renderUtil(<JobSearchForm {...defaultProps} />);

		expect(screen.getByLabelText("searchPlaceholder")).toBeInTheDocument();

		expect(
			screen.getByTestId("form-select-selectlocation"),
		).toBeInTheDocument();
		expect(
			screen.getByTestId("form-select-selectcategory"),
		).toBeInTheDocument();

		expect(
			screen.getByRole("button", { name: "searchJobs" }),
		).toBeInTheDocument();
	});

	it("displays initial values in form fields", () => {
		const propsWithInitialValues: JobSearchFormProps = {
			...defaultProps,
			initialValues: {
				q: "React Developer",
				location: "new-york",
				category: "technology",
			},
		};

		renderUtil(<JobSearchForm {...propsWithInitialValues} />);

		const searchInput = screen.getByLabelText("searchPlaceholder");
		expect(searchInput).toHaveValue("React Developer");

		const locationInput = screen.getByTestId(
			"form-select-input-selectlocation",
		);
		const categoryInput = screen.getByTestId(
			"form-select-input-selectcategory",
		);
		expect(locationInput).toHaveValue("new-york");
		expect(categoryInput).toHaveValue("technology");
	});

	it("updates search input value when typing", async () => {
		renderUtil(<JobSearchForm {...defaultProps} />);

		const searchInput = screen.getByLabelText("searchPlaceholder");

		fireEvent.change(searchInput, { target: { value: "Frontend Developer" } });

		expect(searchInput).toHaveValue("Frontend Developer");
	});

	it("calls router.push with correct parameters on form submission", async () => {
		renderUtil(<JobSearchForm {...defaultProps} />);

		const searchInput = screen.getByLabelText("searchPlaceholder");
		const locationInput = screen.getByTestId(
			"form-select-input-selectlocation",
		);
		const categoryInput = screen.getByTestId(
			"form-select-input-selectcategory",
		);
		const submitButton = screen.getByRole("button", { name: "searchJobs" });

		fireEvent.change(searchInput, { target: { value: "React Developer" } });
		fireEvent.change(locationInput, { target: { value: "new-york" } });
		fireEvent.change(categoryInput, { target: { value: "technology" } });

		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(mockPush).toHaveBeenCalledWith(
				expect.stringContaining("q=React+Developer"),
			);
			expect(mockPush).toHaveBeenCalledWith(
				expect.stringContaining("location=new-york"),
			);
			expect(mockPush).toHaveBeenCalledWith(
				expect.stringContaining("category=technology"),
			);
		});
	});

	it("handles empty form submission", async () => {
		renderUtil(<JobSearchForm {...defaultProps} />);

		const submitButton = screen.getByRole("button", { name: "searchJobs" });

		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(mockPush).toHaveBeenCalledWith("?");
		});
	});
});
