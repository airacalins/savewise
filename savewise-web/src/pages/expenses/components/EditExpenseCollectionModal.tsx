import React, { useMemo } from "react";
import { Button } from "@mui/material";
import { ConfirmActionModal } from "../../../components/modals/ConfirmActionModal";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "../../../components/inputs/TextInput";
import { ContainedButton } from "../../../components/buttons/ContainedButton";
import { mockExpensesCollectionData } from "../../../api/collection/mockExpensesCollection";
import { DeleteOutline, Save } from "@mui/icons-material";
import { colors } from "../../../theme/colors";
import {
  TUpdateCollectionSchema,
  updateCollectionSchema,
} from "../../../api/collection/schema";

interface EditExpenseCollectionModalProps {
  isVisible: boolean;
  expenseCollectionId: string;
  onClose: () => void;
  onDelete: () => void;
  onUpdate: (data: TUpdateCollectionSchema) => void;
}

export const EditExpenseCollectionModal: React.FC<
  EditExpenseCollectionModalProps
> = ({ isVisible, expenseCollectionId, onClose, onDelete, onUpdate }) => {
  const expenseCollectionData = mockExpensesCollectionData.find(
    (expenseCollection) => expenseCollection.id === expenseCollectionId
  );

  const defaultValues = useMemo(
    () => ({
      name: expenseCollectionData?.name ?? "",
    }),
    [expenseCollectionData]
  );

  const {
    control,
    formState: { errors, isDirty, isValid },
    reset,
    handleSubmit,
  } = useForm<TUpdateCollectionSchema>({
    resolver: yupResolver(updateCollectionSchema),
    defaultValues,
    mode: "onChange",
  });

  // Functions
  const handleCloseModal = () => {
    reset();
    onClose();
  };

  const handleFormSubmit = (data: TUpdateCollectionSchema) => {
    onUpdate(data);
    reset();
  };

  return (
    <ConfirmActionModal
      isVisible={isVisible}
      title="Update Expense Collection"
      onClose={handleCloseModal}
      actions={
        <>
          <Button
            color="error"
            startIcon={<DeleteOutline sx={{ color: "inherit" }} />}
            disabled={isDirty}
            onClick={onDelete}
          >
            Delete
          </Button>
          <ContainedButton
            startIcon={<Save sx={{ color: colors.primary }} />}
            disabled={!isDirty || !isValid}
            onClick={handleSubmit(handleFormSubmit)}
          >
            Update
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
            helperText={errors.name?.message}
            {...field}
          />
        )}
      />
    </ConfirmActionModal>
  );
};
