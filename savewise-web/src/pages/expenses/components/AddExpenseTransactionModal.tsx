import React, { useMemo } from "react";
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
import {
  createExpenseTransactionSchema,
  TCreateExpenseTransactionSchema,
} from "../../../api/transactions/schema";
import { ContainedButton } from "../../../components/buttons/ContainedButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useGetFundsCollection } from "../../../api/collection/hooks";
import { Collection } from "../../../api/collection/type";
import { newDateFormat } from "../../../utils/date";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import {
  CreateExpenseTransactionRequest,
  TransactionType,
} from "../../../api/transactions/type";
import { useCreateTransaction } from "../../../api/transactions/hooks";

interface AddExpenseTransactionModalProps {
  expenseCollection?: Collection;
  isVisible: boolean;
  onRefetch: () => void;
  onClose: () => void;
  onCancel: () => void;
}

export const AddExpenseTransactionModal: React.FC<
  AddExpenseTransactionModalProps
> = ({ expenseCollection, isVisible, onRefetch, onClose, onCancel }) => {
  // API
  const { data: fundsCollectionData } = useGetFundsCollection();
  const createExpenseTransaction = useCreateTransaction();

  const defaultValues = useMemo(() => {
    return {
      date: new Date(),
      description: "",
      amount: 0,
      fundCollectionId: "",
      expenseCollectionId: expenseCollection?.id ?? "",
    };
  }, [expenseCollection]);

  const {
    control,
    formState: { errors, isValid },
    reset,
    handleSubmit,
  } = useForm<TCreateExpenseTransactionSchema>({
    resolver: yupResolver(createExpenseTransactionSchema),
    defaultValues: defaultValues,
    mode: "onChange",
  });

  // Functions
  const handleCloseModal = () => {
    reset();
    onClose();
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  const handleCreateExpenseTransaction = async (
    formValues: TCreateExpenseTransactionSchema
  ) => {
    try {
      const input: CreateExpenseTransactionRequest = {
        ...formValues,
        date: newDateFormat(formValues.date),
        expenseCollectionId: expenseCollection?.id ?? "",
        transactionType: TransactionType.Withdrawal,
      };

      await createExpenseTransaction.mutateAsync(input);
      showSuccessToast("Transaction created.");
      reset();
      onRefetch();
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        showErrorToast(error.message);
      }
    }

    reset();
  };

  return (
    <ConfirmActionModal
      isVisible={isVisible}
      title={`Add ${expenseCollection?.name} Expense`}
      onClose={handleCloseModal}
      actions={
        <>
          <Button onClick={handleCancel}>Cancel</Button>
          <ContainedButton
            disabled={!isValid}
            onClick={handleSubmit(handleCreateExpenseTransaction)}
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
              defaultValue={defaultValues.description}
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
              placeholder="1000.00"
              type="number"
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
                defaultValue={defaultValues.fundCollectionId}
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
    </ConfirmActionModal>
  );
};
