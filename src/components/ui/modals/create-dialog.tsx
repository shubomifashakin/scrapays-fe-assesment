import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  Field,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useMutation } from "@apollo/client/react";

import { toaster } from "../toaster";

import { CREATE_BOOK, GET_BOOKS } from "@/data-service";

function CreateBookDialog() {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");

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

  function handleReset() {
    setName("");
    setDescription("");
    setOpen(false);
  }

  const [createBook, { loading: creating }] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],

    onCompleted() {
      displayToast({
        message: "Book created successfully",
        type: "success",
        title: "Success",
      });
      handleReset();
    },
  });

  async function handleCreateBook(e: React.FormEvent) {
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

    createBook({
      variables: { name, description },
      onError(error) {
        displayToast({ message: error.message, type: "error", title: "Error" });
      },
    });
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
          Create Book
        </Button>
      </Dialog.Trigger>

      <Portal>
        <Dialog.Backdrop />

        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Create Book</Dialog.Title>

              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>

            <form onSubmit={handleCreateBook}>
              <Dialog.Body>
                <VStack gap={8}>
                  <Field.Root>
                    <Field.Label>Name</Field.Label>

                    <Input
                      required
                      type="text"
                      autoFocus
                      value={name}
                      minLength={3}
                      maxLength={20}
                      placeholder="Enter name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Description</Field.Label>

                    <Input
                      required
                      type="text"
                      value={description}
                      minLength={10}
                      maxLength={20}
                      placeholder="Enter description"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Field.Root>
                </VStack>
              </Dialog.Body>

              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>

                <Button disabled={creating} type="submit">
                  Create
                </Button>
              </Dialog.Footer>
            </form>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

export default CreateBookDialog;
