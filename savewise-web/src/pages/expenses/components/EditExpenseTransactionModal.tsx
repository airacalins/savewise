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
import {
  TUpdateExpenseTransactionSchema,
  updateExpenseTransactionSchema,
} from "../../../api/transactions/schema";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ContainedButton } from "../../../components/buttons/ContainedButton";
import dayjs from "dayjs";
import { useGetFundsCollection } from "../../../api/collection/hooks";
import { useGetTransaction } from "../../../api/transactions/hooks";
import { FormModal } from "../../../components/modals/FormModal";

interface EditExpenseTransactionModalProps {
  isVisible: boolean;
  expenseTransactionId: string;
  onClose: () => void;
  onDelete: () => void;
  onUpdate: (data: TUpdateExpenseTransactionSchema) => void;
}

export const EditExpenseTransactionModal: React.FC<
  EditExpenseTransactionModalProps
> = ({ isVisible, expenseTransactionId, onClose, onDelete, onUpdate }) => {
  // API
  const { data: fundsCollectionData, isLoading: isLoadingFundsCollection } =
    useGetFundsCollection();
  const {
    data: expenseTransactionData,
    isLoading: isLoadingExpenseTransactions,
  } = useGetTransaction(expenseTransactionId);

  const defaultValues = useMemo(
    () => ({
      date: new Date(expenseTransactionData?.date ?? ""),
      description: expenseTransactionData?.description ?? "",
      amount: expenseTransactionData?.amount ?? 0,
      fundCollectionId: expenseTransactionData?.fundCollectionId ?? "",
      expenseCollectionId: expenseTransactionData?.expenseCollectionId ?? "",
    }),
    [expenseTransactionData]
  );

  const {
    control,
    formState: { errors, isDirty, isValid },
    reset,
    handleSubmit,
  } = useForm<TUpdateExpenseTransactionSchema>({
    resolver: yupResolver(updateExpenseTransactionSchema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    reset(defaultValues);
  }, [expenseTransactionData, reset, defaultValues]);

  // Functions
  const handleCloseModal = () => {
    onClose();
    reset();
  };

  const handleFormSubmit = (data: TUpdateExpenseTransactionSchema) => {
    onUpdate(data);
    reset();
  };

  return (
    <FormModal
      isVisible={isVisible}
      isLoading={isLoadingFundsCollection || isLoadingExpenseTransactions}
      title="Update Expense"
      onClose={handleCloseModal}
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
            disabled={!isDirty || !isValid}
            onClick={handleSubmit(handleFormSubmit)}
          >
            Save
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
              errorMessage={errors.description?.message}
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
              errorMessage={errors.amount?.message}
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
                {fundsCollectionData?.map((fund) => (
                  <MenuItem key={fund.id} value={fund.id}>
                    {fund.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
      </Stack>
    </FormModal>
  );
};
