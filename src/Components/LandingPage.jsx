import React from "react";
import { Typography, Box, Paper } from "@mui/material";
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
import { Link } from "react-router-dom";


export default function LandingPage() {
  return (
    <Box className="landing-page-container">
      {/* Hero Section */}
      <Box className="hero-section">
        <Box
          className="hero-logo"
          component="img"
          src="src/assets/ChitChatLogo.jpg" 
          alt="ChitChat Logo - AI-powered podcast creation platform"
          loading="eager"
        />
        
        <StyledPaper className="intro-container" elevation={3}>
          <StyledTypography component="h1" className="intro-heading">
            Turn Your Ideas Into Podcasts
          </StyledTypography>
          <Typography className="intro-text">
          Ready to bring your voice—and your ideas—to life? Whether you're a
          seasoned podcaster or just curious about creating your first show,
          you've come to the right place. Our AI-powered platform lets you
         instantly generate content creation for podcasts based on any prompt you can imagine.  No limits. No pressure. Just endless
          creativity at your fingertips. 🎧 Try it out, explore different
           styles, or share your favorite creations with friends. If you're just
          here to see how it works, you're welcome too—because inspiration
          starts with curiosity. Let’s get podcasting!
          </Typography>
          <Typography className="intro-text">
            Dive into <strong>true crime</strong>, explore tech trends, tell <strong>sci-fi stories</strong>, or
            host mock interviews with <strong>historical figures</strong>! Just type your idea, and
            let the AI take it from there.
          </Typography>
          <Box className="intro-cta">
            <StyledButton size="large" className="cta-button" >
              Start Creating Now 🎧
            </StyledButton>
          </Box>
        </StyledPaper>
      </Box>

      <hr className="section-divider" />

      {/*Order of Operation Section */}
      <Box className="how-it-works-section">
        <StyledTypography component="h2" className="section-title">
          How It Works
        </StyledTypography>
        
        <StyledPaper className="grid-layout-marketing" elevation={2}>
          <Box className="grid-item" tabIndex="0" role="button">
            <Box
              component="img"
              className="process-icon"
              src="src/assets/CCPIconThink.png"
              alt="Think - Brainstorm your podcast idea"
              loading="lazy"
            />
            <Typography variant="h3" className="step-title">Think</Typography>
            <StyledPaper className="step-description" elevation={1}>
              <StyledSubTypography>
                Brainstorm your podcast concept. Any topic, any style, any format.
              </StyledSubTypography>
            </StyledPaper>
          </Box>

          <Box className="grid-item" tabIndex="0" role="button">
            <Box
              component="img"
              className="process-icon"
              src="src/assets/CCPIconWrite.png"
              alt="Create - AI generates your podcast content"
              loading="lazy"
            />
            <Typography variant="h3" className="step-title">Create</Typography>
            <StyledPaper className="step-description" elevation={1}>
              <StyledSubTypography>
                Our AI crafts engaging content tailored to your vision.
              </StyledSubTypography>
            </StyledPaper>
          </Box>

          <Box className="grid-item" tabIndex="0" role="button">
            <Box
              component="img"
              className="process-icon"
              src="src/assets/CCPIconListen.png"
              alt="Listen - Enjoy your generated podcast"
              loading="lazy"
            />
            <Typography variant="h3" className="step-title">Listen</Typography>
            <StyledPaper className="step-description" elevation={1}>
              <StyledSubTypography>
                Experience your podcast brought to life with realistic voices.
              </StyledSubTypography>
            </StyledPaper>
          </Box>

          <Box className="grid-item" tabIndex="0" role="button">
            <Box
              component="img"
              className="process-icon"
              src="src/assets/CCPIconRepeat.png"
              alt="Repeat - Create unlimited podcasts"
              loading="lazy"
            />
            <Typography variant="h3" className="step-title">Repeat</Typography>
            <StyledPaper className="step-description" elevation={2}>
              <StyledSubTypography>
                Keep creating! No limits on your imagination.
              </StyledSubTypography>
            </StyledPaper>
          </Box>
        </StyledPaper>
      </Box>

      {/* CTA Section */}
      <StyledContainer className="cta-section">
        <StyledBox className="cta-content">
          <StyledTypography component="h2">
            Ready to Get Started?
          </StyledTypography>
          <Typography variant="body1" className="cta-text">
            Join thousands of creators bringing their ideas to life
          </Typography>
          <StyledButton size="large" className="primary-cta" component={Link} to='/login'>
            Create Your First Podcast
          </StyledButton>
        </StyledBox>
        
        <StyledBox className="cta-secondary">
          <Typography variant="body2" className="secondary-text">
            No experience needed • Unlimited creativity • Share with friends
          </Typography>
        </StyledBox>
      </StyledContainer>
    </Box>
  );
}