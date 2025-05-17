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
export default function SignIn() { 
  const navigate = useNavigate()
  const { 
    register, 
    handleSubmit, 
    reset, formState: { errors } 
    } = useForm()

    const onSubmit = async (data) => {
      try {
        const response = await axios.post(`${API}/login`,data)
        const {token, user} = response.data;

        localStorage.setItem("token", token);

        navigate(`/users/:${user.id}/dashboard`)

        reset()

        localStorage.clear()

      }catch (error) {
        console.error("Error signing in:", error)
      }
     
    }

  return (
    <StyledContainer className='signInContainer'> 
      <StyledBox>
        <StyledPaper>
          <StyledTypography>Welcome back!</StyledTypography>
          <StyledTypography>Please sign in to your account.</StyledTypography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <StyledBox>
              <input 
                type="text" 
                placeholder="Username" 
                {...register("username", { required: true })} 
              />
              {errors.username && <span>Username is required</span>}
            </StyledBox>
            <StyledBox>
              <input 
                type="password" 
                placeholder="Password" 
                {...register("password", { required: true })} 
              />
              {errors.password && <span>Password is required</span>}
            </StyledBox>
            <StyledButton type="submit">Sign In</StyledButton>
          </form>
        </StyledPaper>
        <StyledSubTypography variant='h6'>Don't have an account?</StyledSubTypography>
        <StyledButton onClick={() => navigate('/signup')}>Sign Up</StyledButton>
      </StyledBox>
    </StyledContainer>
  )
}
