import React, { PropsWithChildren } from "react";
import {
  Box,
  IconButton,
  Modal as MuiModal,
  Stack,
  Typography,
} from "@mui/material";
import { colors } from "../../theme/colors";
import { styles } from "../../theme/styles";
import { Close, DeleteOutline } from "@mui/icons-material";
import { ContainedButton } from "../buttons/ContainedButton";
import { OutlinedButton } from "../buttons/OutlinedButton";

interface DeleteWarningActionModalProps extends PropsWithChildren {
  isVisible: boolean;
  isDeleting: boolean;
  itemName?: string;
  onClose: () => void;
  onCancel: () => void;
  onConfirm: () => void;
}

export const DeleteWarningActionModal: React.FC<
  DeleteWarningActionModalProps
> = ({
  isVisible,
  isDeleting,
  itemName,
  children,
  onClose,
  onConfirm,
  onCancel,
}) => {
  return (
    <MuiModal
      open={isVisible}
      onClose={() => null}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        bgcolor={colors.primary}
        boxShadow={styles.boxInset}
        left="50%"
        p={4}
        position="absolute"
        top="50%"
        width="50%"
        sx={{
          transform: "translate(-50%, -50%)",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography id="modal-modal-title" variant="h6">
            Are you sure you want to delete?
          </Typography>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Stack>
        <Typography id="modal-modal-title" variant="body1">
          {!itemName ? (
            "This action is irreversible. Are you sure you want to delete this item?"
          ) : (
            <Stack direction="row">
              <Typography>
                This action is irreversible. Are you sure you want to delete
              </Typography>
              <Box width="4px" />
              <Typography fontWeight="bold">{itemName}</Typography>
              <Typography>?</Typography>
            </Stack>
          )}
        </Typography>
        <Box height="24px" />
        {children}
        <Box height="32px" />
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <OutlinedButton
            color="error"
            disabled={isDeleting}
            isLoading={isDeleting}
            startIcon={<DeleteOutline sx={{ color: "inherit" }} />}
            onClick={onConfirm}
          >
            Yes, I am sure
          </OutlinedButton>
          <ContainedButton variant="contained" onClick={onCancel}>
            Do not delete
          </ContainedButton>
        </Stack>
      </Box>
    </MuiModal>
  );
};
