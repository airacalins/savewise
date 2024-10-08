import React from "react";
import {
  Box,
  IconButton,
  Modal as MuiModal,
  Stack,
  Typography,
} from "@mui/material";
import { colors } from "../../theme/colors";
import { styles } from "../../theme/styles";
import { Close } from "@mui/icons-material";

interface ConfirmActionModalProps {
  isVisible: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  actions: React.ReactNode;
}

export const ConfirmActionModal: React.FC<ConfirmActionModalProps> = ({
  isVisible,
  title,
  description,
  onClose,
  actions,
}) => {
  return (
    <MuiModal
      open={isVisible}
      onClose={() => null}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50%",
          bgcolor: colors.primary,
          boxShadow: styles.boxInset,
          p: 4,
        }}
      >
        <Box></Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography id="modal-modal-title" variant="h6">
            {title}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Stack>
        <Typography id="modal-modal-title" variant="body1">
          {description}
        </Typography>
        <Box height="16px" />
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          {actions}
        </Stack>
      </Box>
    </MuiModal>
  );
};
