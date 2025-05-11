import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  StyledButton,
  StyledContainer,
  StyledTypography,
  StyledPaper,
  StyledBox,
} from "../../Styling/theme";
import "../../Styling/SignUpStyling.scss";
import { InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import TextField from "@mui/material/TextField";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(useForm());
  const onSubmit = (data) => {
    console.log(data);
    // Axios call to submit the form data
    // navigate("/home");
  };
  const formatPhoneNumber = (value) => {
    // Format the phone number as 123-456-7890
    
  }

  // Attempt using map to create form fields dynamically at a later stage
  return (
    <>
      <StyledContainer className="form_display_container">
        <StyledPaper>Picture</StyledPaper>
        <StyledPaper>
          <StyledTypography>Join the Chit Chat Community!</StyledTypography>
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <StyledBox>
              <TextField
                fullWidth
                type="first_name"
                label="First Name"
                {...register("firstName", { required: true })}
                error={!!errors.firstName}
                helperText={errors.firstName ? "This field is required" : ""}
              />
            </StyledBox>
            <StyledBox>
              <TextField
              fullWidth
                type="last_name"
                label="Last Name"
                {...register("lastName", { required: true })}
                error={!!errors.lastName}
                helperText={errors.lastName ? "This field is required" : ""}
              />
            </StyledBox>
            <StyledBox>
              <TextField
                fullWidth
                type="email"
                label="Email"
                placeholder="Email"
                {...register("email", { required: true,pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                  message: 'Invalid email address'
                 }})}
                error={!!errors.email}
                helperText={errors.email ? "This field is required" : errors.email.message}
              />
            </StyledBox>
            <StyledBox>
              <TextField
                fullWidth
                type="phone_number"
                label="Phone Number"
                {...register("phoneNumber", { required: true })}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber ? "This field is required" : ""}
              />
            </StyledBox>
            <StyledBox>
              <TextField
                fullWidth
                type="username"
                label="Username"
                {...register("username", { required: true })}
                error={!!errors.username}
                helperText={errors.username ? "This field is required" : ""}
              />
            </StyledBox>
            <StyledBox>
              <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                label="Password"
                {...register("password", { required: true })}
                error={!!errors.password}
                helperText={errors.password ? "This field is required" : ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </StyledBox>

            <StyledButton type="submit" className="submitBtn">Submit</StyledButton>
          </form>
        </StyledPaper>
      </StyledContainer>
    </>
  );
}
