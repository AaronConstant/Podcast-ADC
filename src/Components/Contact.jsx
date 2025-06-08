import { Card, CardContent, Box, Container, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Mail, Phone } from "lucide-react";
import "../Styling/Contact.scss";
import ContactPhoto from "../assets/ContactPhoto.jpeg";

const Contact = () => {
  return (
    <div className="contact-page">
      {/* Hero Section */}
      <div className="hero-section">
        <Container className="hero-title-section">
          <Typography className="hero-title">
            Get to know the Creator!
          </Typography>
          <div className="hero-divider"></div>
        </Container>

        {/* Main Content */}
        <div className="main-content">
          <div className="content-grid">
            {/* Creator Photo */}
            <Container className="creator-section">
              <div className="creator-photo-wrapper">
                <div className="photo-glow"></div>
                <Box className="photo-container">
                  <Box className="photo-placeholder">
                    <Box
                      component={"img"}
                      src={ContactPhoto}
                      alt="Creator"
                      className="creator-photo"
                    />
                  </Box>
                </Box>
              </div>
              <p className="creator-name">Aaron - The Creator</p>
            </Container>

            {/* Contact Information */}
            <div className="contact-info-section">
              <Card className="contact-card">
                <CardContent className="contact-card-content">
                  <h2 className="contact-title">Contact Me</h2>
                  <p className="contact-description">
                    If you have any questions, feedback, or just want to say
                    hello, feel free to reach out!
                  </p>

                  <div className="contact-methods">
                    <div className="contact-method email-method">
                      <div className="contact-icon email-icon">
                        <Mail className="icon" />
                      </div>
                      <div>
                        <p className="contact-method-label">Email</p>
                        <a
                          href="mailto:aarocons@gmail.com"
                          className="contact-method-value email-link"
                        >
                          Aarocons@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="contact-method phone-method">
                      <div className="contact-icon phone-icon">
                        <Phone className="icon" />
                      </div>
                      <div>
                        <p className="contact-method-label">Phone</p>
                        <p className="contact-method-value">
                          Available upon request
                        </p>
                      </div>
                    </div>
                  </div>

                  <Box className="contact-actions">
                    <Button
                      className="send-email-btn"
                      onClick={() =>
                        (window.location.href = "mailto:aarocons@gmail.com")
                      }
                    >
                      Send Email
                    </Button>
                    {/* Doesn't work. working on adding this button */}
                    {/* <a
                      href="https://drive.google.com/uc?export=download&id=1zs2An0qqG2m4n8oF2224l1VIMaAwuBEFyVhK8nzR_WE"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      <Button variant="outline" className="download-cv-btn">
                        Download CV
                      </Button>
                    </a> */}
                  </Box>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="additional-info">
          <Card className="info-card">
            <CardContent className="info-card-content">
              <h3 className="info-title">Let's Connect!</h3>
              <p className="info-description">
                I'm always excited to discuss new projects, creative ideas, or
                opportunities to be part of your visions. Whether you're looking
                for collaboration or just want to chat about technology and
                design, I'd love to hear from you over some coffee/tea.
              </p>
              <div className="info-dots">
                <div className="dot dot-1"></div>
                <div className="dot dot-2"></div>
                <div className="dot dot-3"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
