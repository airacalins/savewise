import { VisibilityOff, Visibility } from "@mui/icons-material";
import { TextInput } from "../../components/inputs/TextInput";
import { Text } from "../../components/texts/Text";
import { Box, Button, InputAdornment, Link, Stack } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignUpPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  //   Functions
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box display="flex" flex={1} alignItems="center" justifyContent="center">
      <Stack spacing={5}>
        <Stack spacing={1} alignItems="center">
          <Text variant="h5" fontWeight={500}>
            Get Started Now
          </Text>
          <Text>Enter your personal data to create your account</Text>
        </Stack>
        <Stack spacing={2}>
          <TextInput label="Full Name" />
          <TextInput label="Email" />
          <TextInput
            label="Password"
            endAdornment={
              <InputAdornment position="end">
                {showPassword ? (
                  <VisibilityOff onClick={handleClickShowPassword} />
                ) : (
                  <Visibility onClick={handleClickShowPassword} />
                )}
              </InputAdornment>
            }
          />
        </Stack>
        <Button variant="contained" onClick={() => navigate("/")}>
          Create an Account
        </Button>
        <Stack direction="row" spacing={1} justifyContent="center">
          <Text variant="body1">Already have an account?</Text>
          <Link
            underline="none"
            sx={{
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
            onClick={() => navigate("/auth/login")}
          >
            <Text variant="body1" color="info">
              Log in
            </Text>
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
};
