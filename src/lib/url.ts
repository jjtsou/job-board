export function createAbsoluteUrl(path: string): string {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

	return `${baseUrl}${path}`;
}
