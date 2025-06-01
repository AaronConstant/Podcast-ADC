import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { StyledButton, StyledTypography, StyledBox } from "../../Styling/theme";
import "../../Styling/SignUpStyling.scss";
import { InputAdornment, IconButton, Alert, Paper } from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

const API = import.meta.env.VITE_BASE_URL;

export default function SignUp() {
  const { setUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError("");

    const formattedData = {
      first_name: data.first_name,
      last_name: data.last_name,
      username: data.username,
      password: data.password,
      email: data.email,
      phone_number: "",
      sex_at_birth: "",
      gender_identity: "",
      date_of_birth: "",
    };

    try {
      const response = await axios.post(`${API}/users`, formattedData);
      console.log("User created successfully: ", response.data);

      reset({
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        email: "",
        phone_number: "",
        sex_at_birth: "",
        gender_identity: "",
        date_of_birth: "",
      });

      const { token, user, message } = response.data;
      localStorage.setItem("token", token);
      console.log("Message Received Sign Up: ", message);
      
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);

      setTimeout(() => {
        navigate(`/users/${user.id}/dashboard`);
      }, [3000]);
    } catch (error) {
      console.error("Error creating user:", error);
      setError(
        error.response?.data?.message ||
          "Error creating user. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // const formatPhoneNumber = (value) => {
  //   if (value.length === 10) {
  //     return value.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  //   }
  // };


  return (
    <div className="signup-page">
      <Paper className="paper-container">
        <div className="form-header">
          <StyledTypography className="form-title">Join the Chit-Chat Community</StyledTypography>
          <div className="signup-subtitle">
            Fill in your details to get started
          </div>
        </div>

        {error && (
          <Alert
            severity="error"
            className="error-alert"
            sx={{ mb: 3, borderRadius: "12px" }}
          >
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <StyledBox>
            <TextField
              fullWidth
              label="First Name"
              className="signup-input"
              {...register("first_name", {
                required: "First name is required",
                minLength: {
                  value: 2,
                  message: "First name must be at least 2 characters",
                },
              })}
              error={!!errors.first_name}
              helperText={errors.first_name?.message || ""}
            />
          </StyledBox>

          <StyledBox>
            <TextField
              fullWidth
              label="Last Name"
              className="signup-input"
              {...register("last_name", {
                required: "Last name is required",
                minLength: {
                  value: 2,
                  message: "Last name must be at least 2 characters",
                },
              })}
              error={!!errors.last_name}
              helperText={errors.last_name?.message || ""}
            />
          </StyledBox>

          <StyledBox>
            <TextField
              fullWidth
              type="email"
              label="Email Address"
              className="signup-input"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                  message: "Please enter a valid email address",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message || ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: "#6c757d" }} />
                  </InputAdornment>
                ),
              }}
            />
          </StyledBox>

          <StyledBox>
            <TextField
              fullWidth
              label="Username"
              className="signup-input"
              placeholder="Choose a username"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                  message:
                    "Username can only contain letters, numbers, and underscores",
                },
              })}
              error={!!errors.username}
              helperText={errors.username?.message || ""}
            />
          </StyledBox>

          <StyledBox>
            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              label="Password"
              className="signup-input"
              placeholder="Create a strong password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                  message:
                    "Password must contain at least one uppercase letter, one lowercase letter, and one number",
                },
              })}
              error={!!errors.password}
              helperText={
                errors.password?.message || "Strong password recommended"
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: "#6c757d" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={togglePasswordVisibility}
                      edge="end"
                      tabIndex={-1}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </StyledBox>

          <StyledBox>
            <TextField
              fullWidth
              type={showConfirmPassword ? "text" : "password"}
              label="Confirm Password"
              className="signup-input"
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message || ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: "#6c757d" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={toggleConfirmPasswordVisibility}
                      edge="end"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </StyledBox>

          <StyledButton
            type="submit"
            className="submitBtn"
            disabled={isLoading}
            fullWidth={false}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </StyledButton>
        </form>

        <div className="signup-prompt">
          <div className="signin-text">Already have an account?</div>
          <StyledButton
            variant="outlined"
            className="signin-button"
            onClick={() => navigate("/login")}
            sx={{ width: "30%" }}
          >
            Sign In
          </StyledButton>
        </div>
      </Paper>
    </div>
  );
}
