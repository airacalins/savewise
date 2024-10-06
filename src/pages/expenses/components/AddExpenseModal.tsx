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
    <Modal isVisible={isVisible} title="Create Expense" onClose={onClose}>
      <TextField fullWidth label="Expense Name" />
      <Box height="16px" />
      <TextField fullWidth label="Amount" />
      <Box height="24px" />
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button variant="contained" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSubmit}>Submit</Button>
      </Stack>
    </Modal>
  );
};
