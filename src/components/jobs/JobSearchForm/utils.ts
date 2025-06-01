import type { FormData } from "./types";

/**
 * Updates URL search parameters with form data
 * @param formData - The form data to convert to URL parameters
 * @param currentParams - Current URLSearchParams
 * @returns Updated URLSearchParams object
 */
export const updateSearchParams = (
	formData: FormData,
	currentParams: URLSearchParams,
): URLSearchParams => {
	const params = new URLSearchParams(currentParams.toString());

	for (const key in formData) {
		const value = formData[key as keyof typeof formData];
		if (value) {
			params.set(key, value.trim());
		} else {
			params.delete(key);
		}
	}

	// Reset to first page when searching
	params.delete("page");

	return params;
};
