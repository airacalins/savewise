import React from "react";
import { Modal } from "../../../components/modals/Modal";
import { Box, Button, Stack, TextField } from "@mui/material";

interface AddFundModalProps {
  isVisible: boolean;
  onClose: () => void;
  onCancel: () => void;
  onSubmit: () => void;
}

export const AddFundModal: React.FC<AddFundModalProps> = ({
  isVisible,
  onClose,
  onCancel,
  onSubmit,
}) => {
  return (
    <Modal isVisible={isVisible} title="Create Fund" onClose={onClose}>
      <TextField fullWidth label="Account Name" />
      <Box height="16px" />
      <TextField fullWidth label="Initial Balance" />
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
