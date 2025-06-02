import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Typography,
  TextField,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Menu,
  MenuItem
} from "@mui/material";
import {
  StyledButton,
  StyledTypography,
  StyledContainer,
  StyledPaper,
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
  const moodOptions = [
    "Happy",
    "Serious",
    "Casual",
    "Professional",
    "Humorous",
  ];
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    setValue,
  } = useForm();
  const moodValue = watch("mood") || "";

  const onSubmit = async () => {
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
      reset()
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
  return (

<div className="generator_container">

  {/* Form Container */}
  <StyledContainer maxWidth="md">
    <StyledPaper 
      elevation={3} 
      sx={{ 
        p: 4, 
        borderRadius: 3,
        background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)'
      }}
    >
      <Typography 
        variant="h5" 
        component="h2" 
        sx={{ mb: 3, textAlign: 'center', fontWeight: 'medium' }}
      >
        Create Your Podcast Script
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        {/* Prompt Input Section */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
            Podcast Topic
          </Typography>
          <TextField
            {...register("prompt", { required: "Prompt is required" })}
            fullWidth
            multiline
            rows={3}
            placeholder="Describe what you'd like your podcast to be about..."
            variant="outlined"
            error={!!errors.prompt}
            helperText={errors.prompt?.message}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
          />
        </Box>

        {/* Mood Selection */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
            Mood & Tone
          </Typography>
          <TextField
            halfWidth
            placeholder="Select mood"
            value={moodValue}
            onClick={handleClick}
            readOnly
            variant="outlined"
            InputProps={{
              endAdornment: (
                <Box sx={{ ml: 1, color: 'text.secondary' }}>
                  ▼
                </Box>
              )
            }}
            sx={{
              cursor: 'pointer',
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
          />
          <Menu 
            anchorEl={anchorEl} 
            open={open} 
            onClose={handleClose}
            PaperProps={{
              elevation: 8,
              sx: {
                borderRadius: 2,
                mt: 1
              }
            }}
          >
            {moodOptions.map((mood) => (
              <MenuItem
                key={mood}
                onClick={() => {
                  setValue("mood", mood);
                  handleClose();
                }}
                sx={{ 
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: 'primary.light',
                    color: 'primary.contrastText'
                  }
                }}
              >
                {mood}
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/* Submit Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <StyledButton
            variant="contained"
            color="primary"
            type="submit"
            disabled={isLoading}
            size="large"
            sx={{
              minWidth: 200,
              py: 1.5,
              borderRadius: 3,
              textTransform: 'none',
              fontSize: '1.1rem',
              fontWeight: 'medium'
            }}
            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {isLoading ? 'Creating...' : 'Create Podcast Script'}
          </StyledButton>
        </Box>
      </form>
    </StyledPaper>
  </StyledContainer>

  {/* Loading State */}
  {isLoading && (
    <Box className="loading-container">
      <CircularProgress size={40} />
      <Typography className="loading-text">
        Creating your podcast script...
      </Typography>
    </Box>
  )}

  {/* Script Dialog */}
  {script && !isLoading && (
    <Dialog
      className="dialog_container"
      open={isScript}
      onClose={handleCloseScript}
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
          Back
        </StyledButton>
      </DialogActions>
    </Dialog>
  )}

  {/* Audio Converter Dialog */}
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
        Back
      </StyledButton>
    </DialogActions>
  </Dialog>
</div>
  );
}

export default PodcastPlatform;
