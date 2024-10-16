import React, { useEffect, useMemo } from "react";
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
import { TextInput } from "../../../components/inputs/TextInput";
import { ConfirmActionModal } from "../../../components/modals/ConfirmActionModal";
import { mockTransactions } from "../../../api/transactions/mockTransactions";
import { mockFundsCollection } from "../../../api/funds/mockFundsCollection";
import {
  TUpdateExpenseTransactionSchema,
  updateExpenseTransactionSchema,
} from "../../../api/transactions/schema";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ContainedButton } from "../../../components/buttons/ContainedButton";
import dayjs from "dayjs";

interface EditExpenseTransactionModalProps {
  isVisible: boolean;
  expenseId: string;
  onClose: () => void;
  onDelete: () => void;
  onUpdate: (data: TUpdateExpenseTransactionSchema) => void;
}

export const EditExpenseTransactionModal: React.FC<
  EditExpenseTransactionModalProps
> = ({ isVisible, expenseId, onClose, onDelete, onUpdate }) => {
  // API
  const expenseData = mockTransactions.find(
    (expense) => expense.id === expenseId
  );
  const fundsCollectionData = mockFundsCollection;

  const defaultValues = useMemo(
    () => ({
      date: new Date(expenseData?.date ?? ""),
      description: expenseData?.description ?? "",
      amount: expenseData?.amount ?? 0,
      fundCollectionId: expenseData?.fundCollectionId ?? "",
    }),
    [expenseData]
  );

  const {
    control,
    formState: { errors, isDirty },
    reset,
    handleSubmit,
  } = useForm<TUpdateExpenseTransactionSchema>({
    resolver: yupResolver(updateExpenseTransactionSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [expenseData, reset, defaultValues]);

  // Functions
  const handleFormSubmit = (data: TUpdateExpenseTransactionSchema) => {
    onUpdate(data);
    reset();
  };

  return (
    <ConfirmActionModal
      isVisible={isVisible}
      title="Update Expense"
      onClose={() => {
        reset();
        onClose();
      }}
      actions={
        <>
          <Button
            color="error"
            startIcon={<DeleteOutline sx={{ color: "inherit" }} />}
            disabled={isDirty}
            onClick={onDelete}
          >
            Delete
          </Button>
          <ContainedButton
            startIcon={<Save sx={{ color: colors.primary }} />}
            disabled={!isDirty}
            onClick={handleSubmit(handleFormSubmit)}
          >
            Update
          </ContainedButton>
        </>
      }
    >
      <Stack spacing={3}>
        <Controller
          name="date"
          control={control}
          render={() => (
            <DatePicker label="Date" defaultValue={dayjs(defaultValues.date)} />
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
