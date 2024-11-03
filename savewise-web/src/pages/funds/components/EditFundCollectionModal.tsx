import React, { useMemo } from "react";
import { Button } from "@mui/material";
import { TextInput } from "../../../components/inputs/TextInput";
import { ConfirmActionModal } from "../../../components/modals/ConfirmActionModal";
import { yupResolver } from "@hookform/resolvers/yup";

import { Controller, useForm } from "react-hook-form";
import { ContainedButton } from "../../../components/buttons/ContainedButton";
import { DeleteOutline, Save } from "@mui/icons-material";
import { colors } from "../../../theme/colors";
import {
  TUpdateCollectionSchema,
  updateCollectionSchema,
} from "../../../api/collection/schema";
import { useGetCollectionById } from "../../../api/collection/hooks";

interface EditFundCollectionModalProps {
  isVisible: boolean;
  fundCollectionId: string;
  onClose: () => void;
  onDelete: () => void;
  onUpdate: (data: TUpdateCollectionSchema) => void;
}

export const EditFundCollectionModal: React.FC<
  EditFundCollectionModalProps
> = ({ isVisible, fundCollectionId, onClose, onDelete, onUpdate }) => {
  // API
  const { data: fundCollectionData } = useGetCollectionById(fundCollectionId);

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
  } = useForm<TUpdateCollectionSchema>({
    resolver: yupResolver(updateCollectionSchema),
    defaultValues,
    mode: "onChange",
  });

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
            placeholder="Income, Business, etc."
            error={!!errors.name}
            helperText={errors.name?.message}
            {...field}
          />
        )}
      />
    </ConfirmActionModal>
  );
};
