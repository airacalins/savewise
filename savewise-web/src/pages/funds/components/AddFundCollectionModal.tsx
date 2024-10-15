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

const defaultValues = {
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
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<TCreateFundCollectionSchema>({
    resolver: yupResolver(createFundCollectionSchema),
    defaultValues,
  });

  const handleFormSubmit = (data: TCreateFundCollectionSchema) => {
    onSubmit(data);
    reset();
  };

  return (
    <ConfirmActionModal
      isVisible={isVisible}
      title="Add Fund Collection"
      onClose={onClose}
      actions={
        <>
          <Button onClick={onCancel}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit(handleFormSubmit)}>
            Submit
          </Button>
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
            defaultValue={defaultValues.name}
            helperText={errors.name?.message}
            {...field}
          />
        )}
      />
    </ConfirmActionModal>
  );
};
