import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";

import { useQuery } from "@apollo/client/react";

import BookList from "@/components/ui/book-list";
import LogoutButton from "@/components/ui/buttons/logOut";
import { useColorModeValue } from "@/components/ui/color-mode";
import CreateBookDialog from "@/components/ui/modals/create-dialog";

import type { Book } from "@/types/book";

import { GET_BOOKS } from "@/data-service";

export default function Dashboard() {
  const bgColor = useColorModeValue(
    "linear(to-br, slate.50, slate.100)",
    "linear(to-br, gray.800, gray.900)"
  );

  const { loading, error, data, refetch, dataState } = useQuery<{
    books: Book[];
  }>(GET_BOOKS);

  return (
    <Box minH="vh" w="full" bg={bgColor} p={8}>
      <VStack spaceY={0} spaceX={0} align="stretch">
        <HStack justify="space-between" mb={8}>
          <Heading as="h1" size="3xl" color={"blue.100"}>
            My Books
          </Heading>

          <HStack gap={4}>
            <CreateBookDialog />

            <LogoutButton />
          </HStack>
        </HStack>

        {loading && (
          <Center py={12}>
            <VStack>
              <Spinner />

              <Text color={"blue.200"}>Loading books</Text>
            </VStack>
          </Center>
        )}

        {error && (
          <Center py={12}>
            <VStack>
              <Text color={"blue.200"}>{error.message}</Text>
              <Button colorScheme="red" onClick={() => refetch()}>
                Try Again
              </Button>
            </VStack>
          </Center>
        )}

        {!loading && !error && dataState === "complete" && (
          <BookList books={data!.books} />
        )}
      </VStack>
    </Box>
  );
}
