import { createListCollection } from "@chakra-ui/react";
import type { Option } from "./types";

/**
 * Creates a select collection for the FormSelect component
 * @param options - Array of options with multilingual labels
 * @param allOptionLabel - Label for the "all" option
 * @param locale - Current locale to determine which label to use
 * @returns Collection object for Chakra UI Select component
 */
export const createSelectCollection = (
	options: Option[],
	allOptionLabel: string,
	locale: string,
) =>
	createListCollection({
		items: [
			{ label: allOptionLabel, value: "" },
			...options.map(({ slug, label_el, label_en }) => ({
				label: locale === "el" ? label_el : label_en,
				value: slug,
			})),
		],
	});
