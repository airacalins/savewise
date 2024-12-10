import React, { useEffect } from "react";
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
import {
  CreateFundTransactionRequest,
  TransactionType,
} from "../../../api/transactions/type";
import { newDateFormat } from "../../../utils/date";
import { Collection } from "../../../api/collection/type";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { useCreateTransaction } from "../../../api/transactions/hooks";

const defaultValues = {
  date: new Date(),
  description: "",
};

interface AddFundTransactionModalProps {
  fundCollection?: Collection;
  isVisible: boolean;
  onRefetch: () => void;
  onClose: () => void;
  onCancel: () => void;
}

export const AddFundTransactionModal: React.FC<
  AddFundTransactionModalProps
> = ({ fundCollection, isVisible, onRefetch, onClose, onCancel }) => {
  const {
    control,
    formState: { errors, isValid },
    reset,
    handleSubmit,
  } = useForm<TCreateFundTransactionSchema>({
    resolver: yupResolver(createFundTransactionSchema),
    defaultValues: defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    reset(defaultValues);
  }, [reset]);

  // API
  const createFundTransaction = useCreateTransaction();

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
        ...formValues,
        date: newDateFormat(formValues.date),
        fundCollectionId: fundCollection?.id ?? "",
        transactionType: TransactionType.Deposit,
      };

      await createFundTransaction.mutateAsync(input);
      showSuccessToast("Transaction created.");
      reset();
      onRefetch();
      onClose();
    } catch {
      showErrorToast("Failed to create transaction.");
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
              placeholder="100.00"
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
      </Stack>
    </ConfirmActionModal>
  );
};
