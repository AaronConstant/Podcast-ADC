import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { StyledButton,StyledContainer,StyledTypography,StyledPaper } from '../../Styling/theme'

export default function SignIn() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()
  return (
    <StyledContainer>
      SignIn
    </StyledContainer>
  )
}
