import type { ButtonProps } from "./types";

export const getButtonProps = (
	currentLocale: string,
	buttonLocale: string,
): ButtonProps => {
	const isActive = currentLocale === buttonLocale;
	return {
		variant: isActive ? "solid" : "outline",
		colorScheme: isActive ? "brand" : "gray",
	};
};
