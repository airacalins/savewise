import React, { useEffect, useMemo } from "react";
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
import {
  useGetCollectionById,
  useUpdateCollectionById,
} from "../../../api/collection/hooks";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";

interface EditFundCollectionModalProps {
  isVisible: boolean;
  fundCollectionId: string;
  onClose: () => void;
  onDelete: () => void;
}

export const EditFundCollectionModal: React.FC<
  EditFundCollectionModalProps
> = ({ isVisible, fundCollectionId, onClose, onDelete }) => {
  // API
  const { data: fundCollectionData } = useGetCollectionById(fundCollectionId);
  const updateFundCollection = useUpdateCollectionById(
    fundCollectionData?.id ?? ""
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

  const handleUpdateFundCollection = async (
    formValues: TUpdateCollectionSchema
  ) => {
    try {
      await updateFundCollection.mutateAsync(formValues);

      showSuccessToast("Fund collection updated.");
    } catch {
      showErrorToast("Failed to update fund collection.");
    }
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
            onClick={handleSubmit(handleUpdateFundCollection)}
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
