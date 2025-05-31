import { Box, Container, Typography } from "@mui/material";
import { GitHub, LinkedIn, Person } from "@mui/icons-material";
import { StyledContainer } from "../Styling/theme";
import { useForm } from "react-hook-form";
import CCPFooterLogo from "../assets/CCPFooterPhoto.png";
import "../Styling/FooterStyling.scss";

export default function Footer() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    reset();
  };
  return (
    <Container className="footer" maxWidth={false}>
      <Box className="footer_top">
        <Box
          className="footer_pic"
          component="img"
          src={CCPFooterLogo}
          alt="Chit Chat Logo"
          loading="eager"
        />
        <Box className="footer_container">
          <Typography className="footer_name">
            Aaron Constant, Software Engineer
          </Typography>
          <Typography className="footer_tagline">
            Ambition for Continuous Growth
          </Typography>
          <Box className="footer_social">
            <a
              href="https://github.com/aaronconstant"
              className="social_link github"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHub className="social_icon" />
            </a>
            <a
              href="https://linkedin.com/in/aaronconstant"
              className="social_link linkedin"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedIn className="social_icon" />
            </a>
            <a
              href="https://yourportfolio.com"
              className="social_link portfolio"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Person className="social_icon" />
            </a>
          </Box>
        </Box>
        <Box className="footer_contact">
          <Typography className="contact_title">Get In Touch</Typography>
          <form className="contact_form" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Your Name"
              className="contact_input"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
            />
            {errors.name && (
              <span className="error_message">{errors.name.message}</span>
            )}

            <input
              type="email"
              placeholder="Your Email"
              className="contact_input"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <span className="error_message">{errors.email.message}</span>
            )}

            <textarea
              placeholder="Your Message"
              className="contact_input contact_textarea"
              {...register("message", {
                required: "Message is required",
                minLength: {
                  value: 10,
                  message: "Message must be at least 10 characters",
                },
              })}
            />
            {errors.message && (
              <span className="error_message">{errors.message.message}</span>
            )}

            <button type="submit" className="contact_button">
              Send Message
            </button>
          </form>
        </Box>
      </Box>
      <Box className="footer_bottom">
        <Typography className="footer_copyright">
          © 2025 Aaron Constant. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
}
