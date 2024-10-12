import React from "react";
import { Button, Stack } from "@mui/material";
import { ConfirmActionModal } from "../../../components/modals/ConfirmActionModal";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { TextInput } from "../../../components/inputs/TextInput";
import { DeleteOutline } from "@mui/icons-material";

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
    <ConfirmActionModal
      isVisible={isVisible}
      title="Create expense"
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
