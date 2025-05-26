import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  CircularProgress,
  Typography,
  Container,
  Paper,
  Box,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

const AudioConverter = ({ script }) => {
  const API = import.meta.env.VITE_BASE_URL;
  const { user } = useAuth();
  const [text, setText] = useState(script || "");
  const [audioUrl, setAudioUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [closeDialog, setCloseDialog] = useState(true)
  console.log("script in AG: ", script)

  const scriptStorage = JSON.parse(localStorage.getItem("script"));
useEffect(() => {
    // if (script) {
    //   setText(script);
    //   return;
    // }

    try {
      if (scriptStorage) {
        const scriptString = `
          ${scriptStorage.title || ''}
          ${scriptStorage.description || ''}
          ${scriptStorage.introduction || ''}
          ${scriptStorage.mainContent || ''}
          ${scriptStorage.conclusion || ''}
        `;
        setText(scriptString.trim());
      }
    } catch (error) {
      console.error("Error parsing script from localStorage:", error);
    }
  }, [script]); 

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

      console.log("Converted script string: ", text);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      console.log("AG 40 - Request body:", { googleCloudTTS: text });
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API}/users/${user.id}/podcastentries/audio`,
        {
          googleCloudTTS: text,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );
      console.log(response);
      console.log("Line: 45 - Text being sent back!:", text);

      if (response.status === 200) {
        const audioUrl = URL.createObjectURL(response.data);
        setAudioUrl(audioUrl);
        setCloseDialog(true)
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("Audio URL: ", audioUrl);
    } catch (err) {
      console.error("Error converting text to audio:", err);
      setError("Failed to convert text to audio. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePodcast = async () => {
    if (!audioUrl) {
      setError("Please generate audio first before saving.");
      return;
    }

    setIsSaving(true);
    setError("");
    setSaveSuccess(false);

    try {
      const scriptStorage = JSON.parse(localStorage.getItem("script"));
      const token = localStorage.getItem("token");
      console.log("AG Line 109: ",audioUrl)
      const podcastData = {
        title: scriptStorage?.title || "Untitled Podcast",
        description: scriptStorage?.description || "No description available",
        audio_url: audioUrl,
      };

      console.log("Saving podcast data:", podcastData);

      const response = await axios.post(
        `${API}/users/${user.id}/podcastentries`,
        podcastData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setSaveSuccess(true);
        console.log("Podcast saved successfully:", response.data);
      }
      setTimeout(() => {
        setCloseDialog(false)
      }, 5000);
    } catch (err) {
      console.error("Error saving podcast:", err);
      setError("Failed to save podcast. Please try again.");
    } finally {
      setIsSaving(false);
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

        {audioUrl && closeDialog && (
          <Box sx={{ marginTop: 4 }}>
            <Typography variant="h6" align="center" gutterBottom>
              Generated Audio
            </Typography>
            <audio controls style={{ width: "100%" }}>
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            
            <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
              <Button
                variant="contained"
                color="success"
                onClick={handleSavePodcast}
                disabled={isSaving}
                startIcon={isSaving ? <CircularProgress size={20} /> : null}
              >
                {isSaving ? "Saving..." : "Save Podcast"}
              </Button>
            </Box>
          </Box>
        )}

        {saveSuccess && closeDialog && (
          <Typography color="success.main" align="center" sx={{ marginTop: 2 }}>
            Podcast saved successfully!
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default AudioConverter;
