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

const DEFAULT_VALUES = {
  date: new Date(),
  description: "",
};

interface AddFundTransactionModalProps {
  fundCollectionName: string;
  isVisible: boolean;
  onClose: () => void;
  onCancel: () => void;
  onSubmit: (data: TCreateFundTransactionSchema) => void;
}

export const AddFundTransactionModal: React.FC<
  AddFundTransactionModalProps
> = ({ fundCollectionName, isVisible, onClose, onCancel, onSubmit }) => {
  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<TCreateFundTransactionSchema>({
    resolver: yupResolver(createFundTransactionSchema),
    defaultValues: DEFAULT_VALUES,
  });

  // Functions
  const handleFormSubmit = (data: TCreateFundTransactionSchema) => {
    onSubmit(data);
    reset();
  };

  return (
    <ConfirmActionModal
      isVisible={isVisible}
      title={`Add ${fundCollectionName} Fund`}
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
          <ContainedButton onClick={handleSubmit(handleFormSubmit)}>
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
      </Stack>
    </ConfirmActionModal>
  );
};
