import React from "react";
import { Modal } from "../../../components/modals/Modal";
import { Box, Button, Stack, TextField } from "@mui/material";

interface AddExpenseModalProps {
  isVisible: boolean;
  onClose: () => void;
  onCancel: () => void;
  onSubmit: () => void;
}

export const AddExpenseModal: React.FC<AddExpenseModalProps> = ({
  isVisible,
  onClose,
  onCancel,
  onSubmit,
}) => {
  return (
    <Modal isVisible={isVisible} title="Create expense" onClose={onClose}>
      <TextField
        fullWidth
        label="Description"
        placeholder="Transaction or item description"
      />
      <Box height="16px" />
      <TextField fullWidth label="Amount" placeholder="100" />
      <Box height="16px" />
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button onClick={onCancel}>Cancel</Button>
        <Button variant="contained" onClick={onSubmit}>
          Submit
        </Button>
      </Stack>
    </Modal>
  );
};
