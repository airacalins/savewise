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
import { toast } from "react-toastify";

const defaultValues = {
  name: "",
  collectionType: CollectionType.Expense,
};

interface AddExpenseCollectionModalProps {
  isVisible: boolean;
  onClose: () => void;
  onCancel: () => void;
}

export const AddExpenseCollectionModal: React.FC<
  AddExpenseCollectionModalProps
> = ({ isVisible, onClose, onCancel }) => {
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

  // Functions
  const handleAddExpenseCollection = async (
    formData: TCreateCollectionSchema
  ) => {
    console.log(JSON.stringify(formData, null, 2));

    try {
      await createExpenseCollection.mutateAsync({
        name: formData.name,
        collectionType: CollectionType.Expense,
      });

      toast.success("Expense collection created successfully");
    } catch {
      toast.error("Failed to create expense collection");
    } finally {
      reset();
      onClose();
      // TODO: Navigate to the created collection
    }
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
            onClick={handleSubmit(handleAddExpenseCollection)}
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
            helperText={errors.name?.message}
            {...field}
          />
        )}
      />
    </ConfirmActionModal>
  );
};
