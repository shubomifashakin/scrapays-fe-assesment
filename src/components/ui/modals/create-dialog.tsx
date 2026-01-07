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

  const [createBook, { loading: creating }] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],

    onCompleted() {
      displayToast({
        message: "Book created successfully",
        type: "success",
        title: "Success",
      });
    },
  });

  async function handleCreateBook() {
    createBook({
      variables: { name, description },
      onError(error) {
        displayToast({ message: error.message, type: "error", title: "Error" });
      },
    });
  }

  return (
    <Dialog.Root size="cover" placement="center" motionPreset="slide-in-bottom">
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
                <Button disabled={creating} onClick={handleCreateBook}>
                  Create
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

export default CreateBookDialog;
