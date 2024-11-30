import React from "react";
import { Button, Stack } from "@mui/material";
import { ConfirmActionModal } from "../../../components/modals/ConfirmActionModal";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { TextInput } from "../../../components/inputs/TextInput";
import { Controller, useForm } from "react-hook-form";
import {
  createFundTransactionSchema,
  TCreateFundTransactionSchema,
} from "../../../api/transactions/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { ContainedButton } from "../../../components/buttons/ContainedButton";
import { useCreateFundTransaction } from "../../../api/transactions/hooks";
import { CreateFundTransactionRequest } from "../../../api/transactions/type";
import { newDateFormat } from "../../../utils/date";
import { Collection } from "../../../api/collection/type";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";

const DEFAULT_VALUES = {
  date: new Date(),
  description: "",
};

interface AddFundTransactionModalProps {
  fundCollection?: Collection;
  isVisible: boolean;
  onClose: () => void;
  onCancel: () => void;
}

export const AddFundTransactionModal: React.FC<
  AddFundTransactionModalProps
> = ({ fundCollection, isVisible, onClose, onCancel }) => {
  const {
    control,
    formState: { errors, isValid },
    reset,
    handleSubmit,
  } = useForm<TCreateFundTransactionSchema>({
    resolver: yupResolver(createFundTransactionSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onChange",
  });

  // API
  const createFundTransaction = useCreateFundTransaction();

  // Functions
  const handleCloseModal = () => {
    reset();
    onClose();
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  const handleCreateFundTransaction = async (
    formValues: TCreateFundTransactionSchema
  ) => {
    try {
      const input: CreateFundTransactionRequest = {
        fundCollectionId: fundCollection?.id ?? "",
        ...formValues,
        date: newDateFormat(formValues.date),
      };

      const result = await createFundTransaction.mutateAsync(input);

      showSuccessToast(`${result.description} transaction created.`);
    } catch {
      showErrorToast("Failed to create transaction.");
    } finally {
      onClose();
      reset();
    }
  };

  return (
    <ConfirmActionModal
      isVisible={isVisible}
      title={`Add ${fundCollection?.name} Fund`}
      onClose={handleCloseModal}
      actions={
        <>
          <Button onClick={handleCancel}>Cancel</Button>
          <ContainedButton
            disabled={!isValid}
            onClick={handleSubmit(handleCreateFundTransaction)}
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
              placeholder="100.00"
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
      </Stack>
    </ConfirmActionModal>
  );
};
