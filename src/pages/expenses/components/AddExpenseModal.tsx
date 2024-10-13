import React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { ConfirmActionModal } from "../../../components/modals/ConfirmActionModal";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { TextInput } from "../../../components/inputs/TextInput";
import { DeleteOutline } from "@mui/icons-material";
import { mockFundsCollection } from "../../../api/funds/mockFundsCollection";

interface AddExpenseModalProps {
  isVisible: boolean;
  expenseCollectionName: string;
  onClose: () => void;
  onCancel: () => void;
  onSubmit: () => void;
}

export const AddExpenseModal: React.FC<AddExpenseModalProps> = ({
  isVisible,
  expenseCollectionName,
  onClose,
  onCancel,
  onSubmit,
}) => {
  const fundsCollectionData = mockFundsCollection;

  return (
    <ConfirmActionModal
      isVisible={isVisible}
      title={`Add ${expenseCollectionName} Expense`}
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
        <DatePicker label="Date" value={dayjs(new Date())} />
        <TextInput
          fullWidth
          label="Description"
          endAdornment={<DeleteOutline />}
          EndIconComponent={undefined}
        />
        <TextInput fullWidth label="Amount" />
        <FormControl fullWidth>
          <InputLabel id="source-select-label">Source</InputLabel>
          <Select labelId="source-select-label" label="Fund Source">
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
