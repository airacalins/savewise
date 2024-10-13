import React from "react";
import { Button, Stack } from "@mui/material";
import { DeleteOutline, Save } from "@mui/icons-material";
import { colors } from "../../../theme/colors";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { TextInput } from "../../../components/inputs/TextInput";
import { ConfirmActionModal } from "../../../components/modals/ConfirmActionModal";
import { mockTransactions } from "../../../api/transactions/mockTransactions";

interface EditExpenseModalProps {
  isVisible: boolean;
  expenseId: string;
  onClose: () => void;
  onDelete: () => void;
  onUpdate: () => void;
}

export const EditExpenseModal: React.FC<EditExpenseModalProps> = ({
  isVisible,
  expenseId,
  onClose,
  onDelete,
  onUpdate,
}) => {
  const expenseData = mockTransactions.find(
    (expense) => expense.id === expenseId
  );

  console.log(expenseData);

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
        <DatePicker label="Date" value={dayjs(expenseData?.date)} />
        <TextInput
          fullWidth
          label="Description"
          endAdornment={<DeleteOutline />}
          defaultValue={expenseData?.description}
          EndIconComponent={undefined}
        />
        <TextInput
          fullWidth
          label="Amount"
          defaultValue={expenseData?.amount}
        />
      </Stack>
    </ConfirmActionModal>
  );
};
