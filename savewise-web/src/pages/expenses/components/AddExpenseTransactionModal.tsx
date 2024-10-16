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
import { mockFundsCollection } from "../../../api/funds/mockFundsCollection";
import {
  createExpenseTransactionSchema,
  TCreateExpenseTransactionSchema,
} from "../../../api/transactions/schema";
import { ContainedButton } from "../../../components/buttons/ContainedButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

const DEFAULT_VALUES = {
  date: new Date(),
  description: "",
  fundCollectionId: "",
};

interface AddExpenseTransactionModalProps {
  isVisible: boolean;
  expenseCollectionName: string;
  onClose: () => void;
  onCancel: () => void;
  onSubmit: (data: TCreateExpenseTransactionSchema) => void;
}

export const AddExpenseTransactionModal: React.FC<
  AddExpenseTransactionModalProps
> = ({ isVisible, expenseCollectionName, onClose, onCancel, onSubmit }) => {
  // API
  const fundsCollectionData = mockFundsCollection;

  const {
    control,
    formState: { errors, isValid },
    reset,
    handleSubmit,
  } = useForm<TCreateExpenseTransactionSchema>({
    resolver: yupResolver(createExpenseTransactionSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onChange",
  });

  // Functions
  const handleFormSubmit = (data: TCreateExpenseTransactionSchema) => {
    onSubmit(data);
    reset();
  };

  return (
    <ConfirmActionModal
      isVisible={isVisible}
      title={`Add ${expenseCollectionName} Expense`}
      onClose={() => {
        reset();
        onClose();
      }}
      actions={
        <>
          <Button
            onClick={() => {
              reset();
              onCancel();
            }}
          >
            Cancel
          </Button>
          <ContainedButton
            disabled={!isValid}
            onClick={handleSubmit(handleFormSubmit)}
          >
            Submit
          </ContainedButton>
        </>
      }
    >
      <Stack spacing={3}>
        <Controller
          name="date"
          control={control}
          render={() => (
            <DatePicker
              label="Date"
              defaultValue={dayjs(DEFAULT_VALUES.date)}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextInput
              label="Description"
              placeholder="e.g., Business lunch, office supplies, travel expenses"
              error={!!errors.description}
              defaultValue={DEFAULT_VALUES.description}
              helperText={errors.description?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <TextInput
              label="Amount"
              placeholder="Enter amount"
              error={!!errors.amount}
              helperText={errors.amount?.message}
              {...field}
              onChange={(e) => {
                const value = e.target.value;

                if (Number(value) >= 0 || value === "") {
                  field.onChange(value);
                }
              }}
            />
          )}
        />
        <Controller
          name="fundCollectionId"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel id="source-select-label">Source</InputLabel>
              <Select
                labelId="source-select-label"
                label="Fund Source"
                defaultValue={DEFAULT_VALUES.fundCollectionId}
                {...field}
              >
                {fundsCollectionData.map((fund) => (
                  <MenuItem key={fund.id} value={fund.id}>
                    {fund.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
      </Stack>
    </ConfirmActionModal>
  );
};
