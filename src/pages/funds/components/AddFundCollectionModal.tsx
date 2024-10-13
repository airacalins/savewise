import React from "react";
import { Button, Stack } from "@mui/material";
import { TextInput } from "../../../components/inputs/TextInput";
import { ConfirmActionModal } from "../../../components/modals/ConfirmActionModal";

interface AddFundCollectionModalProps {
  isVisible: boolean;
  onClose: () => void;
  onCancel: () => void;
  onSubmit: () => void;
}

export const AddFundCollectionModal: React.FC<AddFundCollectionModalProps> = ({
  isVisible,
  onClose,
  onCancel,
  onSubmit,
}) => {
  return (
    <ConfirmActionModal
      isVisible={isVisible}
      title="Add Fund Collection"
      onClose={onClose}
      actions={
        <>
          <Button variant="contained" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onSubmit}>Submit</Button>
        </>
      }
    >
      <Stack spacing={3}>
        <TextInput fullWidth label="Account Name" />
        <TextInput fullWidth label="Initial Balance" />
      </Stack>
    </ConfirmActionModal>
  );
};
