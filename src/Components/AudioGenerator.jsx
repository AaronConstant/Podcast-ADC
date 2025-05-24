import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Typography,
  Container,
  Paper,
  Box,
} from "@mui/material";

const AudioConverter = ({ initialText, apiUrl, user_id }) => {
  const [text, setText] = useState(initialText || "");
  const [audioUrl, setAudioUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setText(initialText || "");
  }, [initialText]);

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      console.log("Sending request to:", `${apiUrl}/:${user_id}/podcastentries/audio`);
      console.log("Request body:", { googleCloudTTS: text });
      console.log('API Url:', apiUrl)

      const response = await fetch(`${apiUrl}/:user_id/podcastentries/audio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          googleCloudTTS: text,
        }),
      });
      console.log("Line: 45 - Text being sent back!:",text)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      if (response.ok) {
        const blob = await response.blob();
        const audioUrl = URL.createObjectURL(blob);

        setAudioUrl(audioUrl);
      }

      console.log("Audio URL: ", audioUrl);
    } catch (err) {
      console.error("Error converting text to audio:", err);
      setError("Failed to convert text to audio. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Text-to-Speech Converter
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            multiline
            rows={5}
            variant="outlined"
            placeholder="Enter text to convert to audio"
            value={text}
            onChange={handleInputChange}
            required
            sx={{ marginBottom: 3 }}
          />

          <Box display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={20} /> : null}
            >
              {isLoading ? "Converting..." : "Convert to Audio"}
            </Button>
          </Box>
        </form>

        {error && (
          <Typography color="error" align="center" sx={{ marginTop: 2 }}>
            {error}
          </Typography>
        )}

        {audioUrl && (
          <Box sx={{ marginTop: 4 }}>
            <Typography variant="h6" align="center" gutterBottom>
              Generated Audio
            </Typography>
            <audio controls style={{ width: "100%" }}>
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default AudioConverter;