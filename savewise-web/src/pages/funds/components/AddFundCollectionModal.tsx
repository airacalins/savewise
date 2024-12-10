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

const defaultValues = {
  name: "",
  collectionType: CollectionType.Fund,
};

interface AddFundCollectionModalProps {
  isVisible: boolean;
  isSubmitting: boolean;
  onCreateCollection: (formData: TCreateCollectionSchema) => void;
  onCloseModal: () => void;
  onCancelCreate: () => void;
}

export const AddFundCollectionModal: React.FC<AddFundCollectionModalProps> = ({
  isVisible,
  isSubmitting,
  onCreateCollection,
  onCloseModal,
  onCancelCreate,
}) => {
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

  // Functions
  const handleOnCloseModal = () => {
    onCloseModal();
    reset();
  };

  const handleOnCancel = () => {
    onCancelCreate();
    reset();
  };

  const handleCreateCollection = (formValues: TCreateCollectionSchema) => {
    onCreateCollection(formValues);
    reset();
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
              disabled={!isValid}
              isLoading={isSubmitting}
              onClick={handleSubmit(handleCreateCollection)}
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
