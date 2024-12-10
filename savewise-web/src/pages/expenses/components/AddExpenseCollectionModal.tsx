import React from "react";
import { Button } from "@mui/material";

import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "../../../components/inputs/TextInput";
import { ContainedButton } from "../../../components/buttons/ContainedButton";
import {
  createCollectionSchema,
  TCreateCollectionSchema,
} from "../../../api/collection/schema";
import { CollectionType } from "../../../api/collection/type";
import { FormModal } from "../../../components/modals/FormModal";

const defaultValues = {
  name: "",
  collectionType: CollectionType.Expense,
};

interface AddExpenseCollectionModalProps {
  isVisible: boolean;
  isSubmitting: boolean;
  onCreateCollection: (formData: TCreateCollectionSchema) => void;
  onCloseModal: () => void;
  onCancelCreate: () => void;
}

export const AddExpenseCollectionModal: React.FC<
  AddExpenseCollectionModalProps
> = ({
  isVisible,
  isSubmitting,
  onCreateCollection,
  onCloseModal: onClose,
  onCancelCreate: onCancel,
}) => {
  const {
    control,
    formState: { errors, isValid },
    reset,
    handleSubmit,
  } = useForm<TCreateCollectionSchema>({
    resolver: yupResolver(createCollectionSchema),
    defaultValues,
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

  const handleCreateCollection = (formValues: TCreateCollectionSchema) => {
    onCreateCollection(formValues);
    reset();
  };

  return (
    <FormModal
      isVisible={isVisible}
      title="Create expense collection"
      onClose={handleCloseModal}
      actions={
        <>
          <Button onClick={handleCancel}>Cancel</Button>
          <ContainedButton
            disabled={!isValid}
            onClick={handleSubmit(handleCreateCollection)}
            isLoading={isSubmitting}
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
            defaultValue={defaultValues.name}
            errorMessage={errors.name?.message}
            {...field}
          />
        )}
      />
    </FormModal>
  );
};
