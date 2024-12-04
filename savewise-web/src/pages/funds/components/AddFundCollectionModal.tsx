import React from "react";
import { Button } from "@mui/material";
import { TextInput } from "../../../components/inputs/TextInput";
import { ConfirmActionModal } from "../../../components/modals/ConfirmActionModal";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { ContainedButton } from "../../../components/buttons/ContainedButton";
import {
  createCollectionSchema,
  TCreateCollectionSchema,
} from "../../../api/collection/schema";
import { CollectionType } from "../../../api/collection/type";
import { useCreateCollection } from "../../../api/collection/hooks";
import { useNavigate } from "react-router-dom";
import { showSuccessToast } from "../../../utils/toast";

const defaultValues = {
  name: "",
  collectionType: CollectionType.Fund,
};

interface AddFundCollectionModalProps {
  isVisible: boolean;
  onClose: () => void;
  onCancel: () => void;
}

export const AddFundCollectionModal: React.FC<AddFundCollectionModalProps> = ({
  isVisible,
  onClose,
  onCancel,
}) => {
  const navigate = useNavigate();

  const {
    control,
    formState: { errors, isValid },
    reset,
    handleSubmit,
  } = useForm<TCreateCollectionSchema>({
    resolver: yupResolver(createCollectionSchema),
    defaultValues: defaultValues,
    mode: "onChange",
  });

  // API
  const createFundCollection = useCreateCollection();

  // Functions
  const handleOnCloseModal = () => {
    reset();
    onClose();
  };

  const handleOnCancel = () => {
    reset();
    onCancel();
  };

  const handleAddFundCollection = async (formData: TCreateCollectionSchema) => {
    try {
      const result = await createFundCollection.mutateAsync({
        name: formData.name,
        collectionType: CollectionType.Fund,
      });

      showSuccessToast("Fund collection created.");
      navigate(`/fundsCollections/${result.id}`);
    } finally {
      reset();
      onClose();
    }
  };

  return (
    <>
      <ConfirmActionModal
        isVisible={isVisible}
        title="Add Fund Collection"
        onClose={handleOnCloseModal}
        actions={
          <>
            <Button onClick={handleOnCancel}>Cancel</Button>
            <ContainedButton
              disabled={!isValid || createFundCollection.isLoading}
              onClick={handleSubmit(handleAddFundCollection)}
              isLoading={createFundCollection.isLoading}
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
              placeholder="Income, Business, etc."
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
