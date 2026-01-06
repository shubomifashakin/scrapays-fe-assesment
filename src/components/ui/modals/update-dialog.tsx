import { useState } from "react";
import type { Book } from "@/types/book";
import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  Field,
  Input,
  VStack,
} from "@chakra-ui/react";

interface UpdateBookModalProps {
  book: Book;
  isUpdating: boolean;
  onSubmit: (id: number, name: string, description: string) => void;
}

function UpdateDialog({ book, isUpdating, onSubmit }: UpdateBookModalProps) {
  const [name, setName] = useState(book.name);
  const [description, setDescription] = useState(book.description);

  function handleConfirm() {
    onSubmit(book.id, name, description);
  }

  return (
    <Dialog.Root size="cover" placement="center" motionPreset="slide-in-bottom">
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          Update Book
        </Button>
      </Dialog.Trigger>

      <Portal>
        <Dialog.Backdrop />

        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Update Book</Dialog.Title>

              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>

            <Dialog.Body>
              <form>
                <VStack gap={8}>
                  <Field.Root>
                    <Field.Label>Name</Field.Label>

                    <Input
                      type="text"
                      value={name}
                      placeholder="Enter name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Description</Field.Label>

                    <Input
                      type="text"
                      value={description}
                      placeholder="Enter description"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Field.Root>
                </VStack>
              </form>
            </Dialog.Body>

            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>

              <Dialog.ActionTrigger asChild>
                <Button disabled={isUpdating} onClick={handleConfirm}>
                  Update
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

export default UpdateDialog;
