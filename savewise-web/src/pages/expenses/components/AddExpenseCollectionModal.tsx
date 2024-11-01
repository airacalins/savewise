import React from "react";
import { Button, Snackbar } from "@mui/material";
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
import { useVisibilityState } from "../../../hooks/useVisibilityState";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const successSnackbar = useVisibilityState();

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
      const result = await createExpenseCollection.mutateAsync({
        name: formData.name,
        collectionType: CollectionType.Expense,
      });

      successSnackbar.show();
      setTimeout(() => {
        navigate(`/expensesCollection/${result.id}`);
      }, 2000);
    } catch {
      toast.error("Failed to create expense collection");
    } finally {
      reset();
      onClose();
    }
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
      <Snackbar
        open={successSnackbar.isVisible}
        message="Expense collection added successfully."
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      />
    </>
  );
};
