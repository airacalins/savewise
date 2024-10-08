import React from "react";
import { Modal } from "../../../components/modals/Modal";
import { Box, Button, Stack, TextField } from "@mui/material";

interface CreateExpenseCategoryModalProps {
  isVisible: boolean;
  onClose: () => void;
  onCancel: () => void;
  onSubmit: () => void;
}

export const CreateExpenseCategoryModal: React.FC<
  CreateExpenseCategoryModalProps
> = ({ isVisible, onClose, onCancel, onSubmit }) => {
  return (
    <Modal
      isVisible={isVisible}
      title="Create expense category"
      onClose={onClose}
    >
      <TextField
        fullWidth
        label="Name"
        placeholder="Groceries, Electricity, etc."
      />
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
