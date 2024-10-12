import React from "react";
import { Button, Stack } from "@mui/material";
import { DeleteOutline, Save } from "@mui/icons-material";
import { colors } from "../../../theme/colors";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { TextInput } from "../../../components/inputs/TextInput";
import { ConfirmActionModal } from "../../../components/modals/ConfirmActionModal";

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
    <ConfirmActionModal
      isVisible={isVisible}
      title="Update Expense"
      onClose={onClose}
      actions={
        <>
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
        </>
      }
    >
      <Stack spacing={3}>
        <DatePicker label="Date" value={dayjs("2022-04-17")} />
        <TextInput
          fullWidth
          label="Description"
          endAdornment={<DeleteOutline />}
          EndIconComponent={undefined}
        />
        <TextInput fullWidth label="Amount" />
      </Stack>
    </ConfirmActionModal>
  );
};
