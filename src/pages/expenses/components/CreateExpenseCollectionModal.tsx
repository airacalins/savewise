import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { ConfirmActionModal } from "../../../components/modals/ConfirmActionModal";

interface CreateExpenseCollectionModalProps {
  isVisible: boolean;
  onClose: () => void;
  onCancel: () => void;
  onSubmit: () => void;
}

export const CreateExpenseCollectionModal: React.FC<
  CreateExpenseCollectionModalProps
> = ({ isVisible, onClose, onCancel, onSubmit }) => {
  return (
    <ConfirmActionModal
      isVisible={isVisible}
      title="Create expense collection"
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
