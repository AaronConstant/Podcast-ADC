import { Typography, Box, Paper, Button, TextField, Container } from "@mui/material";
import {
  StyledBox,
  StyledButton,
  StyledTypography,
  StyledContainer,
  StyledSubTypography,
  StyledPaper,
} from "../Styling/theme";
import "../Styling/LandingPage.scss";
import ctavideo from "../assets/ctavideo.mp4";
import { Link } from "react-router-dom";
import CCPImagine from "../assets/CCPIconThink.png";
import CCPWrite from "../assets/CCPIconWrite.png";
import CCPListen from "../assets/CCPIconListen.png";
import CCPRepeat from "../assets/CCPIconRepeat.png";
import CPRLogo from "../assets/CPR.png";
import CCPFooterLogo from "../assets/CCPFooterPhoto.png";

import { useAuth } from "../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


export default function LandingPage() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);

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
      const result = await login(loginInfo);
      if (result.success) {
        navigate(`/users/${result.user.id}/dashboard`);
      } else {
        setError(result.error || "Failed to Sign in. Try Again Please :(");
      }
      reset();
    } catch (error) {
      console.error("Error signing in: ", error);
      setError(
        error.response?.data?.message || "Failed to sign in. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 6900);

    return () => clearTimeout(timer);
  }, []);
  return (
    <Box className="landing-page-container">
      <Box className="CTA_container">
        <Box className="CTA_video_and_button">
          <Box>
            <video
              src={ctavideo}
              type="video/mp4"
              className="cta_video"
              autoPlay
              muted
              playsInline
            >
              Your browser does not support the video tag.
            </video>
          </Box>
          {showButton && (
            <StyledButton
              className={`hero_cta_button ${showButton ? "fade-in" : ""}`}
              LinkComponent={Link}
              to="/signup"
            >
              Start Your Journey!
            </StyledButton>
          )}
        </Box>
        <Box className="cta_login_container">
          <Paper className="cta_login">
            <form onSubmit={handleSubmit(onSubmit)} className="signin-form">
              <div className="form-field cta_login_input">
             <Box
                      className="logo_pic"
                      component="img"
                      src={CCPFooterLogo}
                      alt="Chit Chat Logo"
                      loading="eager"
                    />
                <TextField
                  label="Username or Email"
                  variant="outlined"
                  fullWidth
                  className="signin-input"
                  {...register("username", {
                    required: "Username or email is required",
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters",
                    },
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
                  className="signin-input cta_login_input"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
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
          </Paper>
        </Box>
      </Box>
      <hr className="section-divider-two" />

      {/* Hero Section */}
      <Box className="hero-section">
        {/* Readjust the hero logo and intro-container as flex and change background to match navbar with a gradient descending */}
        <Box className="cta-box"></Box>
        <Box
          className="hero-logo"
          component="img"
          src={CPRLogo}
          alt="ChitChat Logo - AI-powered podcast creation platform"
          loading="eager"
        />

        <Container className="intro-container" elevation={3}>
          <StyledTypography component="h1" className="intro-heading">
            AI Podcast Studio – Your Personalized Podcast Creator
          </StyledTypography>
          <Typography className="intro-text">
            🎙️ Ready to Hear What You Love? Whether you want to unwind with a
            podcast tailored just for you or you are dreaming up a series of
            your own, you’re in the perfect place. Our AI-powered podcast
            generator creates unique, fully-voiced episodes on any topic you
            choose—just for your enjoyment. Want a relaxing story? A deep dive
            into a niche interest? A custom series with your own voice and
            vision? Just prompt, press play, and enjoy. No studio. No script. No
            limits. Just AI-crafted audio that sounds like it was made with you
            in mind. 🎧 Explore. Create. Listen. Because your next favorite
            podcast might be one you’ve imagined yourself.
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
              to={isAuthenticated ? `/users/${user.id}/dashboard` : "/signup"}
            >
              Start Creating Now 🎧
            </StyledButton>
          </Box>
        </Container>
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
            <Paper className="step-description" elevation={1}>
              <StyledSubTypography>
                Brainstorm your podcast concept. Any topic, any style, any
                format.
              </StyledSubTypography>
            </Paper>
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
            <Paper className="step-description" elevation={1}>
              <StyledSubTypography>
                Our AI crafts engaging content tailored to your vision.
              </StyledSubTypography>
            </Paper>
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
            <Paper className="step-description" elevation={1}>
              <StyledSubTypography>
                Experience your podcast brought to life with realistic voices.
              </StyledSubTypography>
            </Paper>
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
            <Paper className="step-description" elevation={2}>
              <StyledSubTypography>
                Keep creating! No limits on your imagination.
              </StyledSubTypography>
            </Paper>
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
        <Paper></Paper>
        <StyledBox className="cta-secondary">
          <Typography variant="body2" className="secondary-text">
            No experience needed • Unlimited creativity • Share with friends
          </Typography>
        </StyledBox>
      </StyledContainer>
    </Box>
  );
}
