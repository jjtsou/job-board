import { render, type RenderOptions } from "@testing-library/react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { NextIntlClientProvider } from "next-intl";
import type { ReactElement } from "react";

// Mock messages for testing
const mockMessages = {
	common: {
		loading: "Loading...",
		error: "Error",
		search: "Search",
		filter: "Filter",
		reset: "Reset",
		submit: "Submit",
		cancel: "Cancel",
		save: "Save",
		delete: "Delete",
		edit: "Edit",
		view: "View",
		close: "Close",
		previous: "Previous",
		next: "Next",
		page: "Page",
		of: "of",
		results: "results",
		noResults: "No results found",
	},
	jobs: {
		title: "Job Title",
		company: "Company",
		location: "Location",
		type: "Job Type",
		experience: "Experience Level",
		salary: "Salary",
		posted: "Posted",
		apply: "Apply Now",
		searchPlaceholder: "Search jobs...",
		locationPlaceholder: "Location",
		noJobsFound: "No jobs found",
		loadingJobs: "Loading jobs...",
		errorLoadingJobs: "Error loading jobs",
		filters: {
			all: "All",
			fullTime: "Full Time",
			partTime: "Part Time",
			contract: "Contract",
			remote: "Remote",
			onSite: "On Site",
			hybrid: "Hybrid",
		},
	},
	navigation: {
		home: "Home",
		jobs: "Jobs",
		about: "About",
		contact: "Contact",
	},
	aria: {
		selectJobType: "Select job type",
		selectLocation: "Select location",
		selectExperience: "Select experience level",
		pagination: "Pagination navigation",
		jobCard: "Job listing",
		searchForm: "Job search form",
	},
};

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
	locale?: string;
	messages?: Record<string, unknown>;
}

function Wrapper({
	children,
	locale = "en",
	messages = mockMessages,
}: {
	children: React.ReactNode;
	locale?: string;
	messages?: Record<string, unknown>;
}) {
	return (
		<NextIntlClientProvider locale={locale} messages={messages}>
			<ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
		</NextIntlClientProvider>
	);
}

export const renderUtil = (
	ui: ReactElement,
	options: CustomRenderOptions = {},
) => {
	const { locale, messages, ...renderOptions } = options;

	return render(ui, {
		wrapper: ({ children }) => (
			<Wrapper locale={locale} messages={messages}>
				{children}
			</Wrapper>
		),
		...renderOptions,
	});
};
