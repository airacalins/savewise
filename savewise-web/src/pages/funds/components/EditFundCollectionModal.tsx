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
import { useGetCollectionById } from "../../../api/collection/hooks";

interface EditFundCollectionModalProps {
  isVisible: boolean;
  fundCollectionId: string;
  onUpdateCollection: (data: TUpdateCollectionSchema) => void;
  onCloseModal: () => void;
  onDeleteCollection: () => void;
}

export const EditFundCollectionModal: React.FC<
  EditFundCollectionModalProps
> = ({
  isVisible,
  fundCollectionId,
  onUpdateCollection,
  onCloseModal,
  onDeleteCollection,
}) => {
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

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  // Functions
  const handleCloseModal = () => {
    onCloseModal();
    reset();
  };

  // Functions
  const handleUpdateFundCollection = async (
    formValues: TUpdateCollectionSchema
  ) => {
    onUpdateCollection(formValues);
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
            onClick={onDeleteCollection}
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
            errorMessage={errors.name?.message}
            {...field}
          />
        )}
      />
    </ConfirmActionModal>
  );
};
