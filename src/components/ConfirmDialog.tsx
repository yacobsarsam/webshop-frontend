import { Button, CloseButton, Dialog, Portal, Text } from "@chakra-ui/react";
import { useState } from "react";

interface ConfirmDialogProps {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  trigger: React.ReactNode;
}

const ConfirmDialog = ({
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  trigger,
}: ConfirmDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false); // Close the dialog after confirmation
  };

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(details) => setIsOpen(details.open)}
      role="alertdialog"
    >
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Text>{message}</Text>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  {cancelText}
                </Button>
              </Dialog.ActionTrigger>
              <Button colorPalette="red" onClick={handleConfirm}>
                {confirmText}
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default ConfirmDialog;
