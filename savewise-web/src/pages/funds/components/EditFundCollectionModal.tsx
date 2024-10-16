import React, { useMemo } from "react";
import { Button } from "@mui/material";
import { TextInput } from "../../../components/inputs/TextInput";
import { ConfirmActionModal } from "../../../components/modals/ConfirmActionModal";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  TUpdateFundCollectionSchema,
  updateFundCollectionSchema,
} from "../../../api/funds/schema";
import { Controller, useForm } from "react-hook-form";
import { ContainedButton } from "../../../components/buttons/ContainedButton";
import { DeleteOutline, Save } from "@mui/icons-material";
import { mockFundsCollection } from "../../../api/funds/mockFundsCollection";
import { colors } from "../../../theme/colors";

interface EditFundCollectionModalProps {
  isVisible: boolean;
  fundCollectionId: string;
  onClose: () => void;
  onDelete: () => void;
  onUpdate: (data: TUpdateFundCollectionSchema) => void;
}

export const EditFundCollectionModal: React.FC<
  EditFundCollectionModalProps
> = ({ isVisible, fundCollectionId, onClose, onDelete, onUpdate }) => {
  const fundCollectionData = mockFundsCollection.find(
    (fundCollection) => fundCollection.id === fundCollectionId
  );

  const defaultValues = useMemo(
    () => ({
      name: fundCollectionData?.name ?? "",
    }),
    [fundCollectionData]
  );

  const {
    control,
    formState: { errors, isDirty, isValid },
    reset,
    handleSubmit,
  } = useForm<TUpdateFundCollectionSchema>({
    resolver: yupResolver(updateFundCollectionSchema),
    defaultValues,
    mode: "onChange",
  });

  // Functions
  const handleCloseModal = () => {
    reset();
    onClose();
  };

  const handleFormSubmit = (data: TUpdateFundCollectionSchema) => {
    onUpdate(data);
    reset();
  };

  return (
    <ConfirmActionModal
      isVisible={isVisible}
      title="Update Fund Collection"
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
