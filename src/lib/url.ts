export function createAbsoluteUrl(path: string): string {
	const baseUrl =
		process.env.NODE_ENV === "production"
			? "https://your-domain.com"
			: "http://localhost:3000";

	return `${baseUrl}${path}`;
}
