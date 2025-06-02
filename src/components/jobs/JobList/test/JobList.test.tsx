import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderUtil } from "@/test/utils";
import { JobList } from "../JobList";
import type { JobsResponse, Job } from "@/types/job";

vi.mock("next/navigation", () => ({
	useRouter: () => ({
		push: vi.fn(),
	}),
	useSearchParams: () => ({
		get: vi.fn(),
		toString: vi.fn(() => ""),
	}),
}));

const mockJob1: Job = {
	id: 1,
	slug: "frontend-developer",
	title: "Frontend Developer",
	company: "Tech Company",
	location: "New York, NY",
	category: "Technology",
	tags: ["React", "TypeScript"],
	description: "We are looking for a skilled Frontend Developer...",
	postedAt: "2024-06-01T00:00:00.000Z",
};

const mockJob2: Job = {
	id: 2,
	slug: "backend-developer",
	title: "Backend Developer",
	company: "Startup Inc",
	location: "San Francisco, CA",
	category: "Technology",
	tags: ["Node.js", "Python"],
	description: "Join our team as a Backend Developer...",
	postedAt: "2024-06-02T00:00:00.000Z",
};

const mockJobsResponse: JobsResponse = {
	total: 2,
	page: 0,
	pageSize: 10,
	results: [mockJob1, mockJob2],
};

describe("JobList", () => {
	it("renders job list with results count", () => {
		renderUtil(<JobList jobsData={mockJobsResponse} />);

		expect(screen.getByText("results: 2")).toBeInTheDocument();
	});

	it("renders all job cards", () => {
		renderUtil(<JobList jobsData={mockJobsResponse} />);

		expect(screen.getByTestId("job-card-1")).toBeInTheDocument();
		expect(screen.getByTestId("job-card-2")).toBeInTheDocument();
		expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
		expect(screen.getByText("Backend Developer")).toBeInTheDocument();
	});

	it("renders pagination component with correct props", () => {
		const jobsDataWithPagination: JobsResponse = {
			total: 25,
			page: 1,
			pageSize: 10,
			results: [mockJob1],
		};

		renderUtil(<JobList jobsData={jobsDataWithPagination} />);

		const pagination = screen.getByTestId("job-pagination");
		expect(pagination).toBeInTheDocument();
		expect(pagination).toHaveTextContent("page 2 of 3");
	});

	it("calculates pagination correctly", () => {
		const jobsDataWithPagination: JobsResponse = {
			total: 15,
			page: 0,
			pageSize: 5,
			results: [mockJob1, mockJob2],
		};

		renderUtil(<JobList jobsData={jobsDataWithPagination} />);

		const pagination = screen.getByTestId("job-pagination");
		expect(pagination).toHaveTextContent("page 1 of 3");
	});

	it("shows no results message when jobsData is null", () => {
		renderUtil(<JobList jobsData={null as unknown as JobsResponse} />);

		expect(screen.getByText("noResults")).toBeInTheDocument();
		expect(screen.queryByTestId("job-card-1")).not.toBeInTheDocument();
		expect(screen.queryByTestId("job-pagination")).not.toBeInTheDocument();
	});

	it("shows no results message when jobsData.results is null", () => {
		const emptyJobsData = {
			total: 0,
			page: 0,
			pageSize: 10,
			results: null,
		} as unknown as JobsResponse;

		renderUtil(<JobList jobsData={emptyJobsData} />);

		expect(screen.getByText("noResults")).toBeInTheDocument();
		expect(screen.queryByTestId("job-card-1")).not.toBeInTheDocument();
		expect(screen.queryByTestId("job-pagination")).not.toBeInTheDocument();
	});

	it("renders with single job", () => {
		const singleJobData: JobsResponse = {
			total: 1,
			page: 0,
			pageSize: 10,
			results: [mockJob1],
		};

		renderUtil(<JobList jobsData={singleJobData} />);

		expect(screen.getByText("results: 1")).toBeInTheDocument();
		expect(screen.getByTestId("job-card-1")).toBeInTheDocument();
		expect(screen.queryByTestId("job-card-2")).not.toBeInTheDocument();
	});

	it("handles large datasets correctly", () => {
		const largeDataset: JobsResponse = {
			total: 100,
			page: 5,
			pageSize: 10,
			results: [mockJob1, mockJob2],
		};

		renderUtil(<JobList jobsData={largeDataset} />);

		expect(screen.getByText("results: 100")).toBeInTheDocument();
		const pagination = screen.getByTestId("job-pagination");

		expect(pagination).toHaveTextContent("page 6 of 10");
	});

	it("renders job cards in correct order", () => {
		renderUtil(<JobList jobsData={mockJobsResponse} />);

		const jobCards = screen.getAllByTestId(/job-card-/);
		expect(jobCards).toHaveLength(2);
		expect(jobCards[0]).toHaveAttribute("data-testid", "job-card-1");
		expect(jobCards[1]).toHaveAttribute("data-testid", "job-card-2");
	});
});
