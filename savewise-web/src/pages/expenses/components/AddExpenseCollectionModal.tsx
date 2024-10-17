import React from "react";
import { Button } from "@mui/material";
import { ConfirmActionModal } from "../../../components/modals/ConfirmActionModal";

import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "../../../components/inputs/TextInput";
import { ContainedButton } from "../../../components/buttons/ContainedButton";
import {
  createCollectionSchema,
  TCreateCollectionSchema,
} from "../../../api/collection/schema";

const DEFAULT_VALUES = {
  name: "",
};
interface AddExpenseCollectionModalProps {
  isVisible: boolean;
  onClose: () => void;
  onCancel: () => void;
  onSubmit: (data: TCreateCollectionSchema) => void;
}

export const AddExpenseCollectionModal: React.FC<
  AddExpenseCollectionModalProps
> = ({ isVisible, onClose, onCancel, onSubmit }) => {
  const {
    control,
    formState: { errors, isValid },
    reset,
    handleSubmit,
  } = useForm<TCreateCollectionSchema>({
    resolver: yupResolver(createCollectionSchema),
    defaultValues: DEFAULT_VALUES,
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

  const handleFormSubmit = (data: TCreateCollectionSchema) => {
    onSubmit(data);
    reset();
  };

  return (
    <ConfirmActionModal
      isVisible={isVisible}
      title="Create expense collection"
      onClose={handleCloseModal}
      actions={
        <>
          <Button onClick={handleCancel}>Cancel</Button>
          <ContainedButton
            disabled={!isValid}
            onClick={handleSubmit(handleFormSubmit)}
          >
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
