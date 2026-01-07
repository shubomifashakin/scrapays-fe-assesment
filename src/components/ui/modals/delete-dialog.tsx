import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";

import type { Book } from "@/types/book";

interface DeleteBookModalProps {
  book: Book;
  isDeleting: boolean;
  onConfirm: (id: number) => void;
}

function DeleteDialog({ book, isDeleting, onConfirm }: DeleteBookModalProps) {
  const handleConfirm = async () => {
    onConfirm(book.id);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          Delete Book
        </Button>
      </Dialog.Trigger>

      <Portal>
        <Dialog.Backdrop />

        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Delete Book</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <p>Are you sure you want to delete this book?</p>
            </Dialog.Body>

            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>

              <Dialog.ActionTrigger asChild>
                <Button disabled={isDeleting} onClick={handleConfirm}>
                  Delete
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>

            <Dialog.CloseTrigger asChild>
              <CloseButton disabled={isDeleting} size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

export default DeleteDialog;
