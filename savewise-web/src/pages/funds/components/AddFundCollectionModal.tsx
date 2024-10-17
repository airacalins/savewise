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

const DEFAULT_VALUES = {
  name: "",
};

interface AddFundCollectionModalProps {
  isVisible: boolean;
  onClose: () => void;
  onCancel: () => void;
  onSubmit: (data: TCreateCollectionSchema) => void;
}

export const AddFundCollectionModal: React.FC<AddFundCollectionModalProps> = ({
  isVisible,
  onClose,
  onCancel,
  onSubmit,
}) => {
  const {
    control,
    formState: { errors, isValid },
    reset,
    handleSubmit,
  } = useForm<TCreateCollectionSchema>({
    resolver: yupResolver(createCollectionSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onChange",
  });

  // Functions
  const handleOnCloseModal = () => {
    reset();
    onClose();
  };

  const handleOnCancel = () => {
    reset();
    onCancel();
  };

  const handleFormSubmit = (data: TCreateCollectionSchema) => {
    onSubmit(data);
    reset();
  };

  return (
    <ConfirmActionModal
      isVisible={isVisible}
      title="Add Fund Collection"
      onClose={handleOnCloseModal}
      actions={
        <>
          <Button onClick={handleOnCancel}>Cancel</Button>
          <ContainedButton
            disabled={!isValid}
            onClick={handleSubmit(handleFormSubmit)}
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
            defaultValue={DEFAULT_VALUES.name}
            helperText={errors.name?.message}
            {...field}
          />
        )}
      />
    </ConfirmActionModal>
  );
};
