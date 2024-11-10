import React, { useEffect, useMemo } from "react";
import { Button } from "@mui/material";
import { ConfirmActionModal } from "../../../components/modals/ConfirmActionModal";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "../../../components/inputs/TextInput";
import { ContainedButton } from "../../../components/buttons/ContainedButton";
import { DeleteOutline, Save } from "@mui/icons-material";
import { colors } from "../../../theme/colors";
import {
  TUpdateCollectionSchema,
  updateCollectionSchema,
} from "../../../api/collection/schema";
import {
  useGetCollectionById,
  useUpdateCollectionById,
} from "../../../api/collection/hooks";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";

interface EditExpenseCollectionModalProps {
  isVisible: boolean;
  expenseCollectionId: string;
  onClose: () => void;
  onDelete: () => void;
}

export const EditExpenseCollectionModal: React.FC<
  EditExpenseCollectionModalProps
> = ({ isVisible, expenseCollectionId, onClose, onDelete }) => {
  const { data: expenseCollectionData } =
    useGetCollectionById(expenseCollectionId);
  const updateExpenseCollection = useUpdateCollectionById(
    expenseCollectionData?.id ?? ""
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

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  // Functions
  const handleCloseModal = () => {
    reset();
    onClose();
  };

  const handleUpdateExpenseCollection = async (
    formValues: TUpdateCollectionSchema
  ) => {
    try {
      await updateExpenseCollection.mutateAsync(formValues);

      showSuccessToast("Expense collection updated.");
    } catch {
      showErrorToast("Failed to update expense collection.");
    }
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
            onClick={handleSubmit(handleUpdateExpenseCollection)}
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
