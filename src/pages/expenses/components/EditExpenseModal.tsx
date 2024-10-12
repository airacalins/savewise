import React from "react";
import { Modal } from "../../../components/modals/Modal";
import { Box, Button, Stack, TextField } from "@mui/material";
import { DeleteOutline, Save, Today } from "@mui/icons-material";
import { colors } from "../../../theme/colors";
import { TextInput } from "../../../components/inputs/TextInput";

interface EditExpenseModalProps {
  isVisible: boolean;
  onClose: () => void;
  onDelete: () => void;
  onUpdate: () => void;
}

export const EditExpenseModal: React.FC<EditExpenseModalProps> = ({
  isVisible,
  onClose,
  onDelete,
  onUpdate,
}) => {
  return (
    <Modal isVisible={isVisible} title="Update Expense" onClose={onClose}>
      <Stack spacing={3}>
        <TextInput label="Date" EndIconComponent={<Today />} />
        <TextField fullWidth label="Description" />
        <TextField fullWidth label="Amount" />
      </Stack>
      <Box height="32px" />
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button
          color="error"
          startIcon={<DeleteOutline sx={{ color: colors.error }} />}
          onClick={onDelete}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          startIcon={<Save sx={{ color: colors.primary }} />}
          onClick={onUpdate}
        >
          Update
        </Button>
      </Stack>
    </Modal>
  );
};
