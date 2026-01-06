import { useState } from "react";

import { Button } from "@chakra-ui/react";

import { useMutation, useQuery } from "@apollo/client/react";

import BookList from "@/components/ui/book-list";
import { toaster } from "@/components/ui/toaster";
import LogoutButton from "@/components/ui/buttons/logOut";

import CreateBookModal from "@/components/ui/modals/create-book";
import UpdateBookModal from "@/components/ui/modals/update-book";
import DeleteBookModal from "@/components/ui/modals/delete-book";

import type { Book } from "@/types/book";
import type { ModalType } from "@/types/modal";

import {
  CREATE_BOOK,
  UPDATE_BOOK,
  DELETE_BOOK,
  GET_BOOKS,
} from "@/data-service";

export default function Dashboard() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleCreateClick = () => {
    setSelectedBook(null);
    setActiveModal("create");
  };

  const handleUpdateClick = (book: Book) => {
    setSelectedBook(book);
    setActiveModal("update");
  };

  const handleDeleteClick = (book: Book) => {
    setSelectedBook(book);
    setActiveModal("delete");
  };

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

  const { loading, error, data, refetch, dataState } = useQuery<{
    books: Book[];
  }>(GET_BOOKS);

  const [createBook, { loading: creating }] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],

    onCompleted() {
      displayToast({
        message: "Book created successfully",
        type: "success",
        title: "Success",
      });
      setActiveModal(null);
    },
  });

  const [updateBook, { loading: updating }] = useMutation(UPDATE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],

    onCompleted() {
      displayToast({
        message: "Book updated successfully",
        type: "success",
        title: "Success",
      });
      setActiveModal(null);
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
      setActiveModal(null);
    },
  });

  async function handleCreateBook({
    name,
    description,
  }: {
    name: string;
    description: string;
  }) {
    createBook({
      variables: { name, description },
      onError(error) {
        displayToast({ message: error.message, type: "error", title: "Error" });
      },
    });
  }

  async function handleUpdateBook({
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
        displayToast({ message: error.message, type: "error", title: "Error" });
      },
    });
  }

  async function handleDeleteBook({ id }: { id: number }) {
    deleteBook({
      variables: { id },
      onError(error) {
        displayToast({ message: error.message, type: "error", title: "Error" });
      },
    });
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-slate-900">My Books</h1>

          <div className="flex flex-row gap-x-4">
            <Button
              onClick={handleCreateClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              New Book
            </Button>

            <LogoutButton />
          </div>
        </div>

        {loading && (
          <div className="text-center text-slate-500 py-12">Loading books</div>
        )}

        {error && (
          <div className="text-center text-slate-500 py-12">
            <p>{error.message}</p>

            <button
              className="border border-white rounded-sm px-4 py-2 bg-red-500"
              onClick={() => refetch()}
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && dataState === "complete" && (
          <BookList
            books={data!.books}
            onUpdate={handleUpdateClick}
            onDelete={handleDeleteClick}
          />
        )}
      </div>

      {activeModal === "create" && (
        <CreateBookModal
          isCreating={creating}
          onClose={() => setActiveModal(null)}
          onSubmit={(name, description) =>
            handleCreateBook({ name, description })
          }
        />
      )}

      {activeModal === "update" && selectedBook && (
        <UpdateBookModal
          isUpdating={updating}
          book={selectedBook}
          onClose={() => setActiveModal(null)}
          onSubmit={(id, name, description) =>
            handleUpdateBook({ id, name, description })
          }
        />
      )}

      {activeModal === "delete" && selectedBook && (
        <DeleteBookModal
          isDeleting={deleting}
          book={selectedBook}
          onClose={() => setActiveModal(null)}
          onConfirm={(id) => handleDeleteBook({ id })}
        />
      )}
    </main>
  );
}
