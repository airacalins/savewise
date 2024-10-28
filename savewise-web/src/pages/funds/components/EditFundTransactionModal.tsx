import React, { useEffect, useMemo } from "react";
import {
  TUpdateExpenseTransactionSchema,
  TUpdateFundTransactionSchema,
  updateExpenseTransactionSchema,
} from "../../../api/transactions/schema";
import { mockTransactions } from "../../../api/transactions/mockTransactions";
// import { mockFundsCollection } from "../../../api/collection/mockFundsCollection";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { ConfirmActionModal } from "../../../components/modals/ConfirmActionModal";
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

interface EditFundTransactionModalProps {
  isVisible: boolean;
  fundTransactionId: string;
  onClose: () => void;
  onDelete: () => void;
  onUpdate: (data: TUpdateFundTransactionSchema) => void;
}

export const EditFundTransactionModal: React.FC<
  EditFundTransactionModalProps
> = ({ isVisible, fundTransactionId, onClose, onDelete, onUpdate }) => {
  // API
  const fundTransactionData = mockTransactions.find(
    (fundTransaction) => fundTransaction.id === fundTransactionId
  );
  const { data: fundsCollectionData } = useGetFundsCollection();

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

  const handleFormSubmit = (data: TUpdateExpenseTransactionSchema) => {
    onUpdate(data);
    reset();
  };

  return (
    <ConfirmActionModal
      isVisible={isVisible}
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
    </ConfirmActionModal>
  );
};
