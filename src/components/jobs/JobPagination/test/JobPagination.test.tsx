import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderUtil } from "@/test/utils";
import { JobPagination } from "../JobPagination";
import type { JobPaginationProps } from "../types";

const defaultProps: JobPaginationProps = {
	currentPage: 1,
	totalPages: 5,
	hasNextPage: true,
	hasPreviousPage: false,
};

describe("JobPagination", () => {
	it("renders pagination info and controls", () => {
		renderUtil(<JobPagination {...defaultProps} />);

		expect(screen.getByText("page 1 of 5")).toBeInTheDocument();
		expect(screen.getByTestId("job-pagination")).toBeInTheDocument();
	});

	it("does not render when totalPages is 1 or less", () => {
		renderUtil(<JobPagination {...defaultProps} totalPages={1} />);
		expect(screen.queryByTestId("job-pagination")).not.toBeInTheDocument();
	});

	it("disables previous button on first page", () => {
		renderUtil(
			<JobPagination
				{...defaultProps}
				currentPage={1}
				hasPreviousPage={false}
			/>,
		);

		const previousButton = screen.getByRole("button", { name: /previous/i });
		expect(previousButton).toBeDisabled();
	});

	it("disables next button on last page", () => {
		renderUtil(
			<JobPagination
				{...defaultProps}
				currentPage={5}
				totalPages={5}
				hasNextPage={false}
				hasPreviousPage={true}
			/>,
		);

		const nextButton = screen.getByRole("button", { name: /next/i });
		expect(nextButton).toBeDisabled();
	});

	it("displays correct page info for different pages", () => {
		renderUtil(
			<JobPagination {...defaultProps} currentPage={3} totalPages={10} />,
		);

		expect(screen.getByText("page 3 of 10")).toBeInTheDocument();
	});
});
