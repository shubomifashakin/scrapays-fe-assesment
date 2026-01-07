import { HStack, VStack } from "@chakra-ui/react";
import { useMutation } from "@apollo/client/react";

import type { Book } from "@/types/book";

import { toaster } from "./toaster";
import DeleteDialog from "./modals/delete-dialog";
import UpdateDialog from "./modals/update-dialog";

import { DELETE_BOOK, GET_BOOKS, UPDATE_BOOK } from "@/data-service";

interface BookListProps {
  books: Book[];
}

export default function BookList({ books }: BookListProps) {
  function displayToast({
    type,
    message,
    title,
  }: {
    message: string;
    title: string;
    type: "error" | "success";
  }) {
    toaster.create({
      type,
      title,
      description: message,
    });
  }

  const [updateBook, { loading: updating }] = useMutation(UPDATE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],

    onCompleted() {
      displayToast({
        message: "Book updated successfully",
        type: "success",
        title: "Success",
      });
    },
  });

  const [deleteBook, { loading: deleting }] = useMutation(DELETE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],

    onCompleted() {
      displayToast({
        message: "Book deleted successfully",
        type: "success",
        title: "Success",
      });
    },
  });

  async function handleDeleteBook({ id }: { id: number }) {
    deleteBook({
      variables: { id },
      onError(error) {
        displayToast({
          message: error.message,
          type: "error",
          title: "Delete Error",
        });
      },
    });
  }

  function handleUpdateBook({
    name,
    description,
    id,
  }: {
    id: number;
    name: string;
    description: string;
  }) {
    updateBook({
      variables: { name, description, id },
      onError(error) {
        displayToast({
          message: error.message,
          type: "error",
          title: "Update Error",
        });
      },
    });
  }

  if (!books.length) {
    return <div>No books yet. Create one to get started!</div>;
  }

  return (
    <VStack gap={4} align="stretch">
      {books.map((book) => (
        <div key={book.id}>
          <VStack gap={4} align="stretch">
            <VStack align="start" gap={2}>
              <h2>{book.name}</h2>

              <p>{book.description}</p>
            </VStack>

            <HStack gap={4}>
              <UpdateDialog
                book={book}
                isUpdating={updating}
                onSubmit={(id, name, description) =>
                  handleUpdateBook({ id, name, description })
                }
              />

              <DeleteDialog
                book={book}
                isDeleting={deleting}
                onConfirm={() => handleDeleteBook({ id: book.id })}
              />
            </HStack>
          </VStack>
        </div>
      ))}
    </VStack>
  );
}
