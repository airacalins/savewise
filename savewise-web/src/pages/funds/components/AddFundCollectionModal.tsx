import React from "react";
import { Button } from "@mui/material";
import { TextInput } from "../../../components/inputs/TextInput";
import { ConfirmActionModal } from "../../../components/modals/ConfirmActionModal";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  createFundCollectionSchema,
  TCreateFundCollectionSchema,
} from "../../../api/funds/schema";
import { Controller, useForm } from "react-hook-form";
import { ContainedButton } from "../../../components/buttons/ContainedButton";

const DEFAULT_VALUES = {
  name: "",
};

interface AddFundCollectionModalProps {
  isVisible: boolean;
  onClose: () => void;
  onCancel: () => void;
  onSubmit: (data: TCreateFundCollectionSchema) => void;
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
  } = useForm<TCreateFundCollectionSchema>({
    resolver: yupResolver(createFundCollectionSchema),
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

  const handleFormSubmit = (data: TCreateFundCollectionSchema) => {
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
            placeholder="Groceries, Electricity, etc."
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
