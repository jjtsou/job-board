import { useTranslations } from "next-intl";
import {
	Box,
	Text,
	VStack,
	HStack,
	Badge,
	Heading,
	Flex,
} from "@chakra-ui/react";
import { MapPin, Tag, Calendar } from "lucide-react";
import type { JobCardProps } from "./types";

function Tags({ tags }: { tags: string[] }) {
	if (!tags?.length) return null;
	return (
		<HStack gap={1} flexWrap="wrap" align="center">
			<Tag size={16} color="gray" />
			{tags.map((tag) => (
				<Badge key={tag} size="sm" variant="outline" colorScheme="secondary">
					{tag}
				</Badge>
			))}
		</HStack>
	);
}

export function JobCard({ job }: JobCardProps) {
	const t = useTranslations("jobs");
	const { title, company, category, location, tags, description, postedAt } =
		job;

	return (
		<Box
			bg="white"
			p={{ base: 4, md: 6 }}
			borderRadius="lg"
			shadow="md"
			border="1px"
			borderColor="gray.200"
			_hover={{
				shadow: "lg",
				borderColor: "brand.300",
				transform: "translateY(-2px)",
				transition: "all 0.2s ease-in-out",
			}}
			minH="200px"
		>
			<VStack align="stretch" gap={4}>
				<Flex
					direction={{ base: "column", sm: "row" }}
					align={{ base: "stretch", sm: "flex-start" }}
					gap={{ base: 2, sm: 0 }}
				>
					<VStack align="start" gap={1} flex="1">
						<Heading size={{ base: "sm", md: "md" }}>{title}</Heading>
						<Text
							color="gray.600"
							fontWeight="medium"
							fontSize={{ base: "sm", md: "md" }}
						>
							{company}
						</Text>
					</VStack>
					<VStack align={{ base: "start", sm: "end" }} gap={1}>
						<Badge
							colorScheme="brand"
							variant="subtle"
							fontSize={{ base: "xs", md: "sm" }}
						>
							{category}
						</Badge>
					</VStack>
				</Flex>

				<VStack align="start" gap={3}>
					<VStack align="start" gap={2}>
						<HStack align="center" gap={2}>
							<MapPin size={16} color="gray" />
							<Text color="gray.600" fontSize={{ base: "xs", md: "sm" }}>
								{location}
							</Text>
						</HStack>
						<Tags tags={tags} />
					</VStack>

					<Text
						fontSize={{ base: "sm", md: "md" }}
						color="gray.700"
						lineClamp={{ base: 2, md: 3 }}
					>
						{description}
					</Text>

					<Flex
						direction={{ base: "column", sm: "row" }}
						justify="space-between"
						align={{ base: "stretch", sm: "center" }}
						w="full"
						gap={{ base: 3, sm: 0 }}
					>
						<HStack align="center" gap={1}>
							<Calendar size={12} color="gray" />
							<Text fontSize="xs" color="gray.500">
								{t("postedOn")} {new Date(postedAt).toLocaleDateString()}
							</Text>
						</HStack>
					</Flex>
				</VStack>
			</VStack>
		</Box>
	);
}
