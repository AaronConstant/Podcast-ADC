import React from "react";
import { Typography, Box } from "@mui/material";
import landingPageVid from "../assets/LandingPage.mp4";
import {
  StyledBox,
  theme,
  StyledButton,
  StyledTypography,
  StyledContainer,
  StyledPaper,
  StyledSubTypography,
} from "../Styling/theme";
import "../Styling/LandingPage.scss";
export default function LandingPage() {
  return (
    <Box className="landing-page-container">
      <Box
        className="box_background"
        component="img"
        src="src/assets/ChitChatLogo.jpg"
        alt="Hero"
      />

      
        <Typography className="intro">
          Ready to bring your voice—and your ideas—to life? Whether you're a
          seasoned podcaster or just curious about creating your first show,
          you've come to the right place. Our AI-powered platform lets you
          instantly generate podcasts based on any prompt you can imagine. Want
          to dive into true crime, explore tech trends, tell sci-fi stories, or
          host mock interviews with historical figures? Just type your idea, and
          let the AI take it from there. No limits. No pressure. Just endless
          creativity at your fingertips. 🎧 Try it out, explore different
          styles, or share your favorite creations with friends. If you're just
          here to see how it works, you're welcome too—because inspiration
          starts with curiosity. Let’s get podcasting!
        </Typography>
     

      <StyledContainer className="grid-layout-marketing">
        <Box className="grid_item">Think</Box>
        <Box className="grid_item">Rinse</Box>
        <Box className="grid_item">Dry</Box>
        <Box className="grid_item">Repeat</Box>
      </StyledContainer>

      <StyledContainer className="gradient_container">
        <StyledBox className="gradient_container_one">Hello</StyledBox>
        <StyledBox className="gradient_container_two">Things</StyledBox>
      </StyledContainer>
    </Box>
  );
}
