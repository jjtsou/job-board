"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { Button, HStack, Text } from "@chakra-ui/react";
import { Globe } from "lucide-react";
import { getButtonProps } from "./utils";

export function LanguageSwitcher() {
	const locale = useLocale();
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();
	const t = useTranslations("common");

	const switchLanguage = (locale: string) => {
		const currentSearchParams = searchParams.toString();
		const pathWithParams = currentSearchParams
			? `${pathname}?${currentSearchParams}`
			: pathname;

		router.replace(pathWithParams, { locale });
	};

	return (
		<HStack gap={2} align="center">
			<Globe size={16} color="gray" />
			<Text fontSize="sm" color="gray.600">
				{t("language")}:
			</Text>
			<Button
				size="sm"
				{...getButtonProps(locale, "en")}
				onClick={() => switchLanguage("en")}
				minW="60px"
			>
				EN
			</Button>
			<Button
				size="sm"
				{...getButtonProps(locale, "el")}
				onClick={() => switchLanguage("el")}
				minW="60px"
			>
				ΕΛ
			</Button>
		</HStack>
	);
}
