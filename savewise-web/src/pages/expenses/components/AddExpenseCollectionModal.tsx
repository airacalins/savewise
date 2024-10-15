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

interface AddExpenseCollectionModalProps {
  isVisible: boolean;
  onClose: () => void;
  onCancel: () => void;
  onSubmit: (data: TCreateExpenseCollectionSchema) => void;
}

const defaultValues = {
  name: "",
};

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
    defaultValues,
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
          <Button variant="contained" onClick={handleSubmit(handleFormSubmit)}>
            Submit
          </Button>
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
            defaultValue={defaultValues.name}
            helperText={errors.name?.message}
            {...field}
          />
        )}
      />
    </ConfirmActionModal>
  );
};
