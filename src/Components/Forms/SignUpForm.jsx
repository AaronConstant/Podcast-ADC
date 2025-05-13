import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  StyledButton,
  StyledContainer,
  StyledTypography,
  StyledPaper,
  StyledBox,
  StyledSubTypography
} from "../../Styling/theme";
import "../../Styling/SignUpStyling.scss";
import { InputAdornment, IconButton, MenuItem } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import axios from "axios";

const API = import.meta.env.VITE_BASE_URL;
export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
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

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  }

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formattedData = {
      first_name: data.first_name,
      last_name: data.last_name,
      username: data.username,
      password: data.password,
      email: data.email,
      phone_number: formatPhoneNumber(data.phone_number),
      sex_at_birth: data.sex_at_birth,
      gender_identity: data.gender_identity,
      date_of_birth: data.date_of_birth,
    };

    try {
      const response = await axios.post(`${API}/users`, formattedData);
      console.log("User created successfully:", response.data);

      setNewUser(formattedData);
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
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Error creating user. Please try again.");
    }
  };

  const formatPhoneNumber = (value) => {
    if (value.length === 10) {
      return value.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    }
  };

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
                label="First Name"
                {...register("first_name", { required: true })}
                error={!!errors.first_name}
                helperText={errors.first_name ? "This field is required" : ""}
              />
            </StyledBox>
            <StyledBox>
              <TextField
                fullWidth
                label="Last Name"
                {...register("last_name", { required: true })}
                error={!!errors.last_name}
                helperText={errors.last_name ? "This field is required" : ""}
              />
            </StyledBox>
            <StyledBox>
              <TextField
                fullWidth
                type="date"
                label="Date of Birth"
                InputLabelProps={{ shrink: true }}
                {...register("date_of_birth", { required: true })}
                error={!!errors.date_of_birth}
                helperText={
                  errors.date_of_birth ? "This field is required" : ""
                }
              />
            </StyledBox>
            <StyledBox>
              <TextField
                fullWidth
                type="email"
                label="Email"
                placeholder="Email"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email ? "This field is required" : ""}
              />
            </StyledBox>
            <StyledBox>
              <TextField
                fullWidth
                type="tel"
                label="Phone Number"
                {...register("phone_number", { required: true })}
                error={!!errors.phone_number}
                helperText={errors.phone_number ? "This field is required" : ""}
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
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ""}
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
            <StyledBox>
              <TextField
                fullWidth
                type={showConfirmPassword ? "text" : "password"}
                label="Confirm Password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                error={!!errors.confirmPassword}
                helperText={
                  errors.confirmPassword ? errors.confirmPassword.message : ""
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={toggleConfirmPasswordVisibility}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </StyledBox>
            <StyledSubTypography className="option_title">Optional Inputs</StyledSubTypography>
            <StyledBox>
              <TextField
                fullWidth
                select
                label="Assigned at Birth"
                defaultValue=""
                {...register("sex_at_birth")}
                error={!!errors.sex_at_birth}
                helperText={errors.sex_at_birth ? "Optional Input" : ""}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="intersex">Intersex</MenuItem>
                <MenuItem value="other">other</MenuItem>
                <MenuItem value="prefer_not_to_say">Prefer not to say</MenuItem>
              </TextField>
            </StyledBox>
            <StyledBox>
              <TextField
                fullWidth
                select
                label="Gender Identity"
                defaultValue=""
                {...register("gender_identity")}
                error={!!errors.gender_identity}
                helperText={
                  errors.gender_identity ? "This field is required" : ""
                }
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="non_binary">Non-binary</MenuItem>
                <MenuItem value="transgender">Transgender</MenuItem>
                <MenuItem value="genderqueer">Genderqueer</MenuItem>
                <MenuItem value="two_spirited">Two Spirited</MenuItem>
                <MenuItem value="prefer_not_to_say">Prefer not to say</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
            </StyledBox>
            <StyledButton type="submit" className="submitBtn">
              Submit
            </StyledButton>
          </form>
        </StyledPaper>
      </StyledContainer>
    </>
  );
}
