import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderUtil } from "@/test/utils";
import { JobCard } from "../JobCard";
import type { Job } from "@/types/job";

const mockJob: Job = {
	id: 1,
	slug: "frontend-developer",
	title: "Frontend Developer",
	company: "Tech Company",
	location: "New York, NY",
	category: "Technology",
	tags: ["React", "TypeScript", "CSS"],
	description: "We are looking for a skilled Frontend Developer...",
	postedAt: "2024-06-01T00:00:00.000Z",
};

describe("JobCard", () => {
	it("renders job information correctly", () => {
		renderUtil(<JobCard job={mockJob} />);

		expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
		expect(screen.getByText("Tech Company")).toBeInTheDocument();
		expect(screen.getByText("New York, NY")).toBeInTheDocument();
	});

	it("displays job description", () => {
		renderUtil(<JobCard job={mockJob} />);

		expect(
			screen.getByText(/We are looking for a skilled Frontend Developer/),
		).toBeInTheDocument();
	});

	it("shows tags when provided", () => {
		renderUtil(<JobCard job={mockJob} />);

		expect(screen.getByText("React")).toBeInTheDocument();
		expect(screen.getByText("TypeScript")).toBeInTheDocument();
		expect(screen.getByText("CSS")).toBeInTheDocument();
	});
});
