import { Typography, Box, Paper } from "@mui/material";
import {
  StyledBox,
  StyledButton,
  StyledTypography,
  StyledContainer,
  StyledPaper,
  StyledSubTypography,
} from "../Styling/theme";
import "../Styling/LandingPage.scss";
import { Link } from "react-router-dom";
import CCPImagine from '../assets/CCPIconThink.png'
import CCPWrite from '../assets/CCPIconWrite.png';
import CCPListen from '../assets/CCPIconListen.png';
import CCPRepeat from '../assets/CCPIconRepeat.png';
import CPRLogo from '../assets/CPR.png';
import { useAuth } from "../contexts/AuthContext";

export default function LandingPage() {
  const {user, isAuthenticated } = useAuth()
  return (
    <Box className="landing-page-container">
      {/* Hero Section */}
      <Box className="hero-section">
        <Box
          className="hero-logo"
          component="img"
          src={CPRLogo}
          alt="ChitChat Logo - AI-powered podcast creation platform"
          loading="eager"
        />

        <StyledBox className="intro-container" elevation={3}>
          <StyledTypography component="h1" className="intro-heading">
            AI Podcast Studio – Your Personalized Podcast Creator
          </StyledTypography>
          <Typography className="intro-text">
            🎙️ Ready to Hear What You Love? Whether you want to unwind with a
            podcast tailored just for you or you are dreaming up a series of your
            own, you’re in the perfect place. Our AI-powered podcast generator
            creates unique, fully-voiced episodes on any topic you choose—just
            for your enjoyment. Want a relaxing story? A deep dive into a
            niche interest? A custom series with your own voice and vision? Just
            prompt, press play, and enjoy. No studio. No script. No limits. Just
            AI-crafted audio that sounds like it was made with you in mind. 🎧
            Explore. Create. Listen. Because your next favorite podcast might be
            one you’ve imagined yourself.
          </Typography>
          <Typography className="intro-text">
            Dive into <strong>true crime</strong>, explore tech trends, tell
            <strong> sci-fi stories</strong>, or host mock interviews with
            <strong> historical figures</strong>! Just type your idea, and let
            the AI take it from there.
          </Typography>
          <Box className="intro-cta">
            <StyledButton
              size="large"
              className="cta-button"
              LinkComponent={Link}
              to={isAuthenticated ? `/users/${user.id}/dashboard`: '/signup'}
            >
              Start Creating Now 🎧
            </StyledButton>
          </Box>
        </StyledBox>
      </Box>

      <hr className="section-divider" />

      {/*Order of Operation Section */}
      <Box className="how-it-works-section">
        <StyledTypography component="h2" className="section-title">
          Broaden Your Horizon
        </StyledTypography>

        <Paper className="grid-layout-marketing" elevation={10}>
          <Box className="grid-item" tabIndex="0" role="button">
            <Box
              component="img"
              className="process-icon"
              src={CCPImagine}
              alt="Think - Brainstorm your podcast idea"
              loading="lazy"
            />
            <Typography variant="h3" className="step-title">
              Imagine
            </Typography>
            <StyledPaper className="step-description" elevation={1}>
              <StyledSubTypography>
                Brainstorm your podcast concept. Any topic, any style, any
                format.
              </StyledSubTypography>
            </StyledPaper>
          </Box>

          <Box className="grid-item" tabIndex="0" role="button">
            <Box
              component="img"
              className="process-icon"
            src={CCPWrite}
              alt="Create - AI generates your podcast content"
              loading="lazy"
            />
            <Typography variant="h3" className="step-title">
              Generate
            </Typography>
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
              src={CCPListen}
              alt="Listen - Enjoy your generated podcast"
              loading="lazy"
            />
            <Typography variant="h3" className="step-title">
              Listen
            </Typography>
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
              src={CCPRepeat}
              alt="Repeat - Create unlimited podcasts"
              loading="lazy"
            />
            <Typography variant="h3" className="step-title">
              Explore
            </Typography>
            <StyledPaper className="step-description" elevation={2}>
              <StyledSubTypography>
                Keep creating! No limits on your imagination.
              </StyledSubTypography>
            </StyledPaper>
          </Box>
        </Paper>
      </Box>

      {/* CTA Section */}
      <StyledContainer className="cta-section">
        <StyledBox className="cta-content">
          <StyledTypography component="h2">
            Ready to Get Started?
          </StyledTypography>
          <Typography variant="body1" className="cta-text">
            Join the Chit Chat Community and Bring your ideas to life! ❤️
          </Typography>
          <StyledButton
            size="large"
            className="primary-cta"
            LinkComponent={Link}
            to="/signup"
          >
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
