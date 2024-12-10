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
import { Close } from "@mui/icons-material";
import { Skeleton } from "../skeletons/Skeleton";

interface FormModalProps extends PropsWithChildren {
  isVisible: boolean;
  isLoading?: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  actions: React.ReactNode;
}

export const FormModal: React.FC<FormModalProps> = ({
  isVisible,
  isLoading = false,
  title,
  description,
  children,
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
            {!isLoading ? title : "..."}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Stack>
        <Typography id="modal-modal-title" variant="body1">
          {description}
        </Typography>
        <Box height="24px" />
        {!isLoading ? (
          <>
            {children}
            <Box height="32px" />
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              {actions}
            </Stack>
          </>
        ) : (
          <Skeleton />
        )}
      </Box>
    </MuiModal>
  );
};
