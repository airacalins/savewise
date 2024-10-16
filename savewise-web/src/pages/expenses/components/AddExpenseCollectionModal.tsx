import React from "react";
import { Button } from "@mui/material";
import { ConfirmActionModal } from "../../../components/modals/ConfirmActionModal";
import {
  createExpenseCollectionSchema,
  TCreateExpenseCollectionSchema,
} from "../../../api/expenses/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "../../../components/inputs/TextInput";
import { ContainedButton } from "../../../components/buttons/ContainedButton";

const DEFAULT_VALUES = {
  name: "",
};
interface AddExpenseCollectionModalProps {
  isVisible: boolean;
  onClose: () => void;
  onCancel: () => void;
  onSubmit: (data: TCreateExpenseCollectionSchema) => void;
}

export const AddExpenseCollectionModal: React.FC<
  AddExpenseCollectionModalProps
> = ({ isVisible, onClose, onCancel, onSubmit }) => {
  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<TCreateExpenseCollectionSchema>({
    resolver: yupResolver(createExpenseCollectionSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onChange",
  });

  const handleFormSubmit = (data: TCreateExpenseCollectionSchema) => {
    onSubmit(data);
    reset();
  };

  return (
    <ConfirmActionModal
      isVisible={isVisible}
      title="Create expense collection"
      onClose={onClose}
      actions={
        <>
          <Button onClick={onCancel}>Cancel</Button>
          <ContainedButton onClick={handleSubmit(handleFormSubmit)}>
            Submit
          </ContainedButton>
        </>
      }
    >
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Name"
            placeholder="Groceries, Electricity, etc."
            error={!!errors.name}
            defaultValue={DEFAULT_VALUES.name}
            helperText={errors.name?.message}
            {...field}
          />
        )}
      />
    </ConfirmActionModal>
  );
};
