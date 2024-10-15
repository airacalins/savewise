import React from "react";
import { Button, Stack } from "@mui/material";
import { ConfirmActionModal } from "../../../components/modals/ConfirmActionModal";
import { DeleteOutline } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { TextInput } from "../../../components/inputs/TextInput";

interface AddFundModalProps {
  fundCollectionName: string;
  isVisible: boolean;
  onClose: () => void;
  onCancel: () => void;
  onSubmit: () => void;
}

export const AddFundModal: React.FC<AddFundModalProps> = ({
  fundCollectionName,
  isVisible,
  onClose,
  onCancel,
  onSubmit,
}) => {
  return (
    <ConfirmActionModal
      isVisible={isVisible}
      title={`Add ${fundCollectionName} Fund`}
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
        <DatePicker label="Date" value={dayjs(new Date())} />
        <TextInput
          fullWidth
          label="Description"
          endAdornment={<DeleteOutline />}
          EndIconComponent={undefined}
        />
        <TextInput fullWidth label="Amount" type="number" />
      </Stack>
    </ConfirmActionModal>
  );
};
