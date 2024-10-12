import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { ConfirmActionModal } from "../../../components/modals/ConfirmActionModal";

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
    <ConfirmActionModal
      isVisible={isVisible}
      title="Create expense category"
      onClose={onClose}
      actions={
        <>
          <Button onClick={onCancel}>Cancel</Button>
          <Button variant="contained" onClick={onSubmit}>
            Submit
          </Button>
        </>
      }
    >
      <TextField
        fullWidth
        label="Name"
        placeholder="Groceries, Electricity, etc."
      />
      <Box height="16px" />
    </ConfirmActionModal>
  );
};
