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
import { CollectionType } from "../../../api/collection/type";
import { useCreateCollection } from "../../../api/collection/hooks";

const defaultValues = {
  name: "",
  collectionType: CollectionType.Expense,
};

interface AddExpenseCollectionModalProps {
  isVisible: boolean;
  onCreateCollection: (formData: TCreateCollectionSchema) => void;
  onCloseModal: () => void;
  onCancelCreate: () => void;
}

export const AddExpenseCollectionModal: React.FC<
  AddExpenseCollectionModalProps
> = ({
  isVisible,
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

  // API
  const createExpenseCollection = useCreateCollection();

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
    <>
      <ConfirmActionModal
        isVisible={isVisible}
        title="Create expense collection"
        onClose={handleCloseModal}
        actions={
          <>
            <Button onClick={handleCancel}>Cancel</Button>
            <ContainedButton
              disabled={!isValid}
              onClick={handleSubmit(handleCreateCollection)}
              isLoading={createExpenseCollection.isLoading}
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
      </ConfirmActionModal>
    </>
  );
};
