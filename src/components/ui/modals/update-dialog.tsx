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
import { toaster } from "../toaster";

interface UpdateBookModalProps {
  book: Book;
  isUpdating: boolean;
  onSubmit: (id: number, name: string, description: string) => void;
}

function UpdateDialog({ book, isUpdating, onSubmit }: UpdateBookModalProps) {
  const [name, setName] = useState(book.name);
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState(book.description);

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

  function handleConfirm(e: React.FormEvent) {
    e.preventDefault();

    if (name.length < 3) {
      return displayToast({
        message: "Name must be at least 3 characters long",
        type: "error",
        title: "Error",
      });
    }

    if (description.length < 10) {
      return displayToast({
        message: "Description must be at least 10 characters long",
        type: "error",
        title: "Error",
      });
    }

    if (name !== book.name || description !== book.description) {
      onSubmit(book.id, name, description);
    }

    setOpen(false);
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(d) => setOpen(d.open)}
      size="cover"
      placement="center"
      motionPreset="slide-in-bottom"
    >
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

            <form onSubmit={handleConfirm}>
              <Dialog.Body>
                <VStack gap={8}>
                  <Field.Root>
                    <Field.Label>Name</Field.Label>

                    <Input
                      required
                      type="text"
                      name="name"
                      value={name}
                      placeholder="Enter name"
                      minLength={3}
                      maxLength={20}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Description</Field.Label>

                    <Input
                      required
                      type="text"
                      name="description"
                      value={description}
                      placeholder="Enter description"
                      minLength={10}
                      maxLength={20}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Field.Root>
                </VStack>
              </Dialog.Body>

              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>

                <Button disabled={isUpdating} type="submit">
                  Update
                </Button>
              </Dialog.Footer>
            </form>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

export default UpdateDialog;
