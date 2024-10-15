import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { DeleteOutline, Save } from "@mui/icons-material";
import { colors } from "../../../theme/colors";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { TextInput } from "../../../components/inputs/TextInput";
import { ConfirmActionModal } from "../../../components/modals/ConfirmActionModal";
import { mockTransactions } from "../../../api/transactions/mockTransactions";
import { mockFundsCollection } from "../../../api/funds/mockFundsCollection";

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
  // API
  const expenseData = mockTransactions.find(
    (expense) => expense.id === expenseId
  );
  const fundsCollectionData = mockFundsCollection;

  const [selectedFund, setSelectedFund] = useState("");

  // Set the default value when expenseData changes
  useEffect(() => {
    if (expenseData && expenseData.fundCollectionId) {
      setSelectedFund(expenseData.fundCollectionId);
    }
  }, [expenseData]);

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
        <FormControl fullWidth>
          <InputLabel id="source-select-label">Source</InputLabel>
          <Select
            labelId="source-select-label"
            label="Fund Source"
            value={selectedFund}
          >
            {fundsCollectionData.map((fund) => (
              <MenuItem key={fund.id} value={fund.id}>
                {fund.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </ConfirmActionModal>
  );
};
