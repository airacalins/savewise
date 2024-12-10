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
import { useGetCollectionById } from "../../../api/collection/hooks";

interface EditExpenseCollectionModalProps {
  isVisible: boolean;
  expenseCollectionId: string;
  onUpdateCollection: (data: TUpdateCollectionSchema) => void;
  onCloseModal: () => void;
  onDeleteCollection: () => void;
}

export const EditExpenseCollectionModal: React.FC<
  EditExpenseCollectionModalProps
> = ({
  isVisible,
  expenseCollectionId,
  onUpdateCollection,
  onCloseModal,
  onDeleteCollection,
}) => {
  const { data: expenseCollectionData } =
    useGetCollectionById(expenseCollectionId);

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
    onCloseModal();
    reset();
  };

  const handleUpdateExpenseCollection = (
    formValues: TUpdateCollectionSchema
  ) => {
    onUpdateCollection(formValues);
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
            onClick={onDeleteCollection}
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
            errorMessage={errors.name?.message}
            {...field}
          />
        )}
      />
    </ConfirmActionModal>
  );
};
