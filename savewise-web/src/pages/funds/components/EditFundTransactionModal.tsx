import React, { useEffect, useMemo } from "react";
import {
  TUpdateExpenseTransactionSchema,
  updateExpenseTransactionSchema,
} from "../../../api/transactions/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { DeleteOutline, Save } from "@mui/icons-material";
import { ContainedButton } from "../../../components/buttons/ContainedButton";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { TextInput } from "../../../components/inputs/TextInput";
import { colors } from "../../../theme/colors";
import { useGetFundsCollection } from "../../../api/collection/hooks";
import {
  useGetTransaction,
  useUpdateTransaction,
} from "../../../api/transactions/hooks";
import { FormModal } from "../../../components/modals/FormModal";
import { UpdateFundTransactionRequest } from "../../../api/transactions/type";
import { newDateFormat } from "../../../utils/date";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";

interface EditFundTransactionModalProps {
  isVisible: boolean;
  fundTransactionId: string;
  onRefetch: () => void;
  onClose: () => void;
  onDelete: () => void;
}

export const EditFundTransactionModal: React.FC<
  EditFundTransactionModalProps
> = ({ isVisible, fundTransactionId, onRefetch, onClose, onDelete }) => {
  // API
  const { data: fundsCollectionData, isLoading: isLoadingFundsCollectionData } =
    useGetFundsCollection();
  const { data: fundTransactionData, isLoading: isLoadingFundTransactionData } =
    useGetTransaction(fundTransactionId);
  const updateFundTransaction = useUpdateTransaction(fundTransactionId);

  const defaultValues = useMemo(() => {
    return {
      date: new Date(fundTransactionData?.date ?? ""),
      description: fundTransactionData?.description ?? "",
      amount: fundTransactionData?.amount ?? 0,
      fundCollectionId: fundTransactionData?.fundCollectionId ?? "",
    };
  }, [fundTransactionData]);

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
  }, [fundTransactionData, reset, defaultValues]);

  // Functions
  const handleCloseModal = () => {
    reset();
    onClose();
  };

  const handleFormSubmit = async (
    formValues: TUpdateExpenseTransactionSchema
  ) => {
    try {
      const input: UpdateFundTransactionRequest = {
        ...formValues,
        date: newDateFormat(formValues.date),
      };

      await updateFundTransaction.mutateAsync(input);
      showSuccessToast("Transaction updated.");
      onRefetch();
    } catch {
      showErrorToast("Failed to update transaction.");
    }
  };

  return (
    <FormModal
      isVisible={isVisible}
      isLoading={isLoadingFundTransactionData || isLoadingFundsCollectionData}
      title="Update Fund"
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
              <InputLabel id="source-select-label">Move to</InputLabel>
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
