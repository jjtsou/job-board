import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("next/navigation", () => ({
	useRouter: () => ({
		push: vi.fn(),
		replace: vi.fn(),
		back: vi.fn(),
		forward: vi.fn(),
		refresh: vi.fn(),
		prefetch: vi.fn(),
	}),
	usePathname: () => "/en",
	useSearchParams: () => new URLSearchParams(),
	useParams: () => ({ locale: "en" }),
}));

vi.mock("next-intl", () => ({
	useTranslations: () => (key: string) => key,
	useLocale: () => "en",
	NextIntlClientProvider: ({ children }: { children: React.ReactNode }) =>
		children,
}));
