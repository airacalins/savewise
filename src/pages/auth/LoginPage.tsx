import { useState } from "react";
import { Text } from "../../components/texts/Text";
import { Box, Button, InputAdornment, Link, Stack } from "@mui/material";
import { TextInput } from "../../components/inputs/TextInput";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  //   Functions
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <Box display="flex" flex={1} alignItems="center" justifyContent="center">
        <Stack spacing={5}>
          <Stack spacing={1} alignItems="center">
            <Text variant="h5" fontWeight={500}>
              Welcome Back
            </Text>
            <Text>Enter your email and password to access your account</Text>
          </Stack>
          <Stack spacing={2}>
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
            Login
          </Button>
          <Stack direction="row" spacing={1} justifyContent="center">
            <Text variant="body1">Don't have an account?</Text>
            <Link
              underline="none"
              sx={{
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
              onClick={() => navigate("/auth/signup")}
            >
              <Text variant="body1" color="info">
                Sign Up
              </Text>
            </Link>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};
