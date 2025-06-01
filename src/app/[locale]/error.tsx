"use client";

import { Container, VStack, Heading, Text, Button } from "@chakra-ui/react";

export default function ErrorPage({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	return (
		<Container maxW="container.md" py={16}>
			<VStack gap={6} textAlign="center">
				<Heading size="lg" color="red.500">
					Something went wrong!
				</Heading>
				<Text color="gray.600" fontSize="lg">
					We encountered an unexpected error. Please try again.
				</Text>
				{process.env.NODE_ENV === "development" && (
					<Text fontSize="sm" color="gray.500" fontFamily="mono">
						{error.message}
					</Text>
				)}
				<Button colorScheme="brand" onClick={reset}>
					Try again
				</Button>
			</VStack>
		</Container>
	);
}
