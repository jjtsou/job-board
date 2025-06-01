import type { ConditionalValue } from "@chakra-ui/react";

export interface ButtonProps {
	variant: ConditionalValue<"solid" | "outline">;
	colorScheme: ConditionalValue<"brand" | "gray">;
}
