"use client";

import { Select, Portal } from "@chakra-ui/react";
import { useLocale } from "next-intl";
import type { FormSelectProps } from "./types";
import { createSelectCollection } from "./utils";

export function FormSelect({
	value,
	onChange,
	placeholder,
	allOptionLabel,
	options,
}: FormSelectProps) {
	const locale = useLocale();
	const collection = createSelectCollection(options, allOptionLabel, locale);

	return (
		<Select.Root
			collection={collection}
			value={[value]}
			onValueChange={({ value }) => onChange(value[0] ?? "")}
			size={{ base: "md", md: "lg" }}
		>
			<Select.HiddenSelect />
			<Select.Control>
				<Select.Trigger>
					<Select.ValueText placeholder={placeholder} />
				</Select.Trigger>
				<Select.IndicatorGroup>
					<Select.Indicator />
				</Select.IndicatorGroup>
			</Select.Control>
			<Portal>
				<Select.Positioner>
					<Select.Content>
						{collection.items.map((item) => (
							<Select.Item item={item} key={item.value}>
								{item.label}
								<Select.ItemIndicator />
							</Select.Item>
						))}
					</Select.Content>
				</Select.Positioner>
			</Portal>
		</Select.Root>
	);
}
