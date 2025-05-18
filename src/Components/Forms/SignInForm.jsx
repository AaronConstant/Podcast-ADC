import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {
  StyledButton,
  StyledContainer,
  StyledTypography,
  StyledPaper,
  StyledBox,
  StyledSubTypography
} from "../../Styling/theme";
// import { useAuth } from '../../Context/AuthContext'
import '../../Styling/SignInStyling.scss'
import { TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useState,useEffect } from 'react';

export default function SignIn() { 
  const API = import.meta.env.VITE_BASE_URL
  const navigate = useNavigate()
  const { 
    register, 
    handleSubmit, 
    reset, formState: { errors } 
    } = useForm()

    const onSubmit = async (loginInfo) => {
      try {
        const response = await axios.post(`${API}/login`, loginInfo);
    
        const { token, user, message } = response.data;
    
        localStorage.setItem("token", token);
               
        console.log(token)
        console.log(message);
    
        navigate(`/users/${user.id}/dashboard`);
    
        reset();
    
      } catch (error) {
        console.error("Error signing in:", error);
      }
    };
    

  return (
    <StyledContainer className='signInContainer'> 
      <StyledBox>
        <StyledPaper>
          <StyledTypography>Welcome back!</StyledTypography>
          {/* <StyledTypography>Please sign in to your account.</StyledTypography> */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <StyledBox>
              <TextField 
                label='username'
                variant = 'outlined' 
                placeholder="Username" 
                {...register("username", { required: true })} 
                error ={!!errors.username}
              helperText={errors.username ? "Please enter username/email" : ""}
              />
            </StyledBox>
            <StyledBox>
              <TextField 
                label='password'
                type="password" 
                placeholder="Password" 
                {...register("password", { required: true })} 
                error ={!!errors.password}
                helperText={errors.password ? "Please enter your password" : ""}
                />
            </StyledBox>
            <StyledButton type="submit">Sign In</StyledButton>
          </form>
        </StyledPaper>
        <Typography variant='h6' fontSize={'1em'}>Don't have an account?</Typography>
        <StyledButton onClick={() => navigate('/signup')}>Sign Up</StyledButton>
      </StyledBox>
    </StyledContainer>
  )
}
