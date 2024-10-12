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

interface ModalProps extends React.PropsWithChildren {
  isVisible: boolean;
  title: string;
  description?: string;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  isVisible,
  title,
  description,
  children,
  onClose,
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
        <Box height="16px" />
        <Typography id="modal-modal-title" variant="body1">
          {description}
        </Typography>
        <Box height="24px" />
        {children}
      </Box>
    </MuiModal>
  );
};
