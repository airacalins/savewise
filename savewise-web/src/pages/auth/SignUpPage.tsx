import { VisibilityOff, Visibility } from "@mui/icons-material";
import { TextInput } from "../../components/inputs/TextInput";
import { Text } from "../../components/texts/Text";
import { Box, Button, InputAdornment, Link, Stack } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterUser } from "../../api/auth/hooks";
import { IRegisterUserSchema, registerUserSchema } from "../../api/auth/schema";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useBoolean } from "../../hooks/useBoolean";

const DEFAULT_VALUES = {
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignUpPage = () => {
  const navigate = useNavigate();
  const showPassword = useBoolean();
  const showConfirmPassword = useBoolean();

  // API
  const registerUser = useRegisterUser();

  // Form
  const {
    control,
    formState: { errors, isValid },
    reset,
    handleSubmit,
  } = useForm<IRegisterUserSchema>({
    resolver: yupResolver(registerUserSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onChange",
  });

  useEffect(() => {
    reset(DEFAULT_VALUES);
  }, [reset]);

  //   Functions
  const handleCreateAccount = async (formValues: IRegisterUserSchema) => {
    const { email, password } = formValues;

    try {
      await registerUser.mutateAsync({
        email,
        password,
      });

      showSuccessToast(`Account created.`);
      navigate("/auth/login");
    } catch {
      showErrorToast("Something went wrong. Please try again.");
    }
  };

  return (
    <Box
      alignItems="center"
      display="flex"
      flex={1}
      height="100vh"
      justifyContent="center"
    >
      <Stack spacing={5}>
        <Stack spacing={1} alignItems="center">
          <Text variant="h5" fontWeight={500}>
            Get Started Now
          </Text>
          <Text>Enter your personal data to create your account</Text>
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
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextInput
                label="Confirm Password"
                placeholder="Confirm your password"
                error={!!errors.confirmPassword}
                errorMessage={errors.confirmPassword?.message}
                defaultValue={DEFAULT_VALUES.confirmPassword}
                type={showConfirmPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    {showConfirmPassword.value ? (
                      <VisibilityOff onClick={showConfirmPassword.toggle} />
                    ) : (
                      <Visibility onClick={showConfirmPassword.toggle} />
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
          onClick={handleSubmit(handleCreateAccount)}
        >
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
