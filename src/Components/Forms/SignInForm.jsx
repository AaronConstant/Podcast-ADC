import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  StyledButton,
  StyledContainer,
  StyledTypography,
  StyledPaper,
} from "../../Styling/theme";
import "../../Styling/SignInStyling.scss";
import { TextField, Typography, Alert } from "@mui/material";
import { useState } from "react";
import welcomeVideo from '../../assets/WelcomeBackVid.mp4'
import { useAuth } from "../../contexts/AuthContext";

export default function SignIn() {
  const navigate = useNavigate();
  const {login} = useAuth()
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (loginInfo) => {
    setIsLoading(true);
    setError("");
    
    try {
      const result = await login(loginInfo)
      if(result.success) {
        navigate(`/users/${result.user.id}/mockdashboard`);
      } else {
        setError(result.error || "Failed to Sign in. Try Again Please :(")
      }
      reset();
    } catch (error) {
      console.error("Error signing in: ", error);
      setError(error.response?.data?.message || "Failed to sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signin-page">
      <StyledContainer className="signin-container">
        {/* Video Section */}
        <div className="video-section">
          <video 
            className="welcome-video" 
            autoPlay 
            muted 
            playsInline
          >
            <source src={welcomeVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Form Section */}
        <div className="form-section">
          <StyledPaper className="signin-paper">
            <div className="form-header">
              <StyledTypography className="signin-title">
                Jump Back in!
              </StyledTypography>
              <Typography className="signin-subtitle">
                Please sign in to your account
              </Typography>
            </div>

            {error && (
              <Alert severity="error" className="error-alert">
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="signin-form">
              <div className="form-field">
                <TextField
                  label="Username or Email"
                  variant="outlined"
                  fullWidth
                  className="signin-input"
                  {...register("username", { 
                    required: "Username or email is required",
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters"
                    }
                  })}
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
              </div>

              <div className="form-field">
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  className="signin-input"
                  {...register("password", { 
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </div>

              <StyledButton 
                type="submit" 
                className="signin-button"
                disabled={isLoading}
                fullWidth
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </StyledButton>
            </form>

            <div className="signup-prompt">
              <Typography className="signup-text">
                Do not have an account?
              </Typography>
              <StyledButton 
                onClick={() => navigate("/signup")}
                variant="outlined"
                className="signup-button"
              >
                Sign Up
              </StyledButton>
            </div>
          </StyledPaper>
        </div>
      </StyledContainer>
    </div>
  );
}