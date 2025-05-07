import { useEffect } from "react";
import { Text } from "../../components/texts/Text";
import { Box, Button, InputAdornment, Link, Stack } from "@mui/material";
import { TextInput } from "../../components/inputs/TextInput";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { ILoginUserSchema, loginUserSchema } from "../../api/auth/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useBoolean } from "../../hooks/useBoolean";
import { useLoginUser } from "../../api/auth/hooks";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import { LoginUserResponse } from "../../api/auth/type";

const DEFAULT_VALUES = {
  email: "",
  password: "",
};

export const LoginPage = () => {
  const navigate = useNavigate();
  const showPassword = useBoolean();

  // API
  const loginUser = useLoginUser();

  // Form
  const {
    control,
    formState: { errors, isValid },
    reset,
    handleSubmit,
  } = useForm<ILoginUserSchema>({
    resolver: yupResolver(loginUserSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onChange",
  });

  useEffect(() => {
    reset(DEFAULT_VALUES);
  }, [reset]);

  //   Functions
  const handleLoginUser = async (formValues: ILoginUserSchema) => {
    const { email, password } = formValues;

    try {
      const response: LoginUserResponse = await loginUser.mutateAsync({
        email,
        password,
      });

      const { tokenType, accessToken, refreshToken, expiresIn } = response;

      localStorage.setItem("token", `${tokenType} ${accessToken}`);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("expiresIn", expiresIn.toString());

      console.log(JSON.stringify(response, null, 2));

      showSuccessToast(`Welcome back!`);
      navigate("/");
    } catch {
      showErrorToast("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Box
        alignItems="center"
        display="flex"
        flex={1}
        justifyContent="center"
        height="100vh"
      >
        <Stack spacing={5}>
          <Stack spacing={1} alignItems="center">
            <Text variant="h5" fontWeight={500}>
              Welcome Back
            </Text>
            <Text>Enter your email and password to access your account</Text>
          </Stack>
          <Stack spacing={2}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextInput
                  label="Email"
                  placeholder="Enter your email"
                  error={!!errors.email}
                  errorMessage={errors.email?.message}
                  defaultValue={DEFAULT_VALUES.email}
                  {...field}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextInput
                  label="Password"
                  placeholder="Enter your password"
                  error={!!errors.password}
                  errorMessage={errors.password?.message}
                  defaultValue={DEFAULT_VALUES.password}
                  type={showPassword.value ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      {showPassword.value ? (
                        <VisibilityOff onClick={showPassword.toggle} />
                      ) : (
                        <Visibility onClick={showPassword.toggle} />
                      )}
                    </InputAdornment>
                  }
                  {...field}
                />
              )}
            />
          </Stack>
          <Button
            variant="contained"
            disabled={!isValid}
            onClick={handleSubmit(handleLoginUser)}
          >
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
