import { Container, VStack, Heading, Text, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function NotFound() {
	return (
		<Container maxW="container.md" py={16}>
			<VStack gap={6} textAlign="center">
				<Heading size="xl" color="gray.700">
					404 - Page Not Found
				</Heading>
				<Text color="gray.600" fontSize="lg">
					The page you're looking for doesn't exist or has been moved.
				</Text>
				<Link href="/">
					<Button colorScheme="brand">Back to Home</Button>
				</Link>
			</VStack>
		</Container>
	);
}
