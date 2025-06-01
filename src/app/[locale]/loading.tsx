import { Container, VStack, Spinner, Text } from "@chakra-ui/react";

export default function Loading() {
	return (
		<Container maxW="container.xl" py={16}>
			<VStack gap={4}>
				<Spinner size="xl" color="brand.500" />
				<Text fontSize="lg" color="gray.600">
					Loading jobs...
				</Text>
			</VStack>
		</Container>
	);
}
