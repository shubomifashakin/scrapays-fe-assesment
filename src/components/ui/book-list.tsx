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

  if (books.length === 0) {
    return (
      <div className="text-center text-slate-500 py-12 bg-white rounded-lg border border-slate-200">
        No books yet. Create one to get started!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {books.map((book) => (
        <div
          key={book.id}
          className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1">
              <VStack gap={2}>
                <h2>{book.name}</h2>

                <p>{book.description}</p>
              </VStack>
            </div>

            <div>
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
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
