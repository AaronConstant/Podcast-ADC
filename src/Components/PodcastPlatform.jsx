import { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  CircularProgress,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  StyledBox,
  StyledButton,
  StyledTypography,
  StyledContainer,
  StyledPaper,
  StyledSubTypography,
} from "../Styling/theme";
import AudioConverter from "./AudioGenerator";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import "../Styling/PodcastPlatformStyling.scss";
function PodcastPlatform() {
  const API = import.meta.env.VITE_BASE_URL;
  const [prompt, setPrompt] = useState("");
  const [script, setScript] = useState(null);
  const [isScript, setIsScript] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAudioConverter, setShowAudioConverter] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API}/users/${user.id}/podcastentries/script`,
        { podcastentry: prompt },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.setItem("script", JSON.stringify(response.data));
      setScript(response.data);
      handleShowScript();
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowScript = () => {
    setIsScript(true);
  };

  const handleCloseScript = () => {
    setIsScript(false);
  };

  const handleConvertToAudio = () => {
    setShowAudioConverter(true);
  };

  const handleCloseAudioConverter = () => {
    setShowAudioConverter(false);
  };

  console.log("PPform Line 84 - Current script", script);

  return (
    <div className="generator_container" style={{ padding: "20px" }}>
      <StyledTypography>Your Personalized</StyledTypography>
      <Typography variant="h4">Chit Chat Podcasts</Typography>
      <Typography variant="h4">Generator</Typography>
      <TextField
        fullWidth
        label="Enter your prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ margin: "20px 0" }}
      />
      <StyledButton
        variant="contained"
        color="secondary"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        Create Prompt
      </StyledButton>

      {isLoading && (
        <div style={{ marginTop: "20px" }}>
          <CircularProgress />
        </div>
      )}
      {/* Display for script Information */}
      {script && !isLoading && (
        <Dialog
        className="dialog_container"
          style={{ marginTop: "20px" }}
          open={isScript}
          onClose={handleCloseAudioConverter}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle variant="h5">
            <StyledTypography>Script:</StyledTypography>
          </DialogTitle>
          <DialogContent elevation={10} sx={{ padding: 10, margin: 2 }}>
            {Object.entries(script).map(([key, value]) => (
              <Typography
                key={key}
                variant="body1"
                style={{ marginTop: "10px" }}
              >
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
                {value}
              </Typography>
            ))}
          </DialogContent>
          <DialogActions className="button_container">
            <StyledButton
              variant="contained"
              color="secondary"
              onClick={handleConvertToAudio}
            >
              Convert to Audio ?
            </StyledButton>
            <StyledButton onClick={handleCloseScript} color="warning">
              Try Again
            </StyledButton>
          </DialogActions>
        </Dialog>
      )}

      <Dialog
        open={showAudioConverter}
        onClose={handleCloseAudioConverter}
        className="dialog_container"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Convert script to Audio</DialogTitle>
        <DialogContent>
          <AudioConverter script={script} />
        </DialogContent>
        <DialogActions>
          <StyledButton onClick={handleCloseAudioConverter} color="primary">
            Try Again
          </StyledButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PodcastPlatform;
