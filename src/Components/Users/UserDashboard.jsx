import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Badge,
  CircularProgress,
  Paper,
  FormHelperText,
} from "@mui/material";
import {
  Mic,
  MusicNote,
  Delete,
  Download,
  ExpandMore,
} from "@mui/icons-material";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
// import Loading from "../Loading";
import '../../Styling/UserDashboardStyling.scss'
const API = import.meta.env.VITE_BASE_URL;

const PodcastDashboard = () => {
  const [podcastEntries, setPodcastEntries] = useState([]);
  const [currentStep, setCurrentStep] = useState("form");
  const [isLoading, setIsLoading] = useState(false);
  const [currentScript, setCurrentScript] = useState(null);
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [text, setText] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      prompt: "",
      mood: "",
    },
  });

  const moodOptions = [
    "Conversational",
    "Professional",
    "Casual",
    "Enthusiastic",
    "Informative",
    "Humorous",
    "Serious",
    "Inspirational",
  ];

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API}/users/${user.id}/podcastentries/script`,
        { podcastentry: data.prompt, mood: data.mood },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCurrentScript(response.data);
      setCurrentStep("script");
      setIsLoading(false);
      localStorage.setItem("script", JSON.stringify(response.data));
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  const handleConvertToAudio = async () => {
    setCurrentStep("audio");
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
        
        // Create new podcast entry with mood from form data
        const newPodcast = {
          id: Date.now(), // temporary ID
          title: currentScript?.title || "Untitled Podcast",
          description: currentScript?.description || "No description",
          mood: watch("mood"), // Get mood from current form data
          createdAt: new Date().toLocaleDateString(),
          audio_url: audioUrl
        };
        
        setPodcastEntries((prev) => [newPodcast, ...prev]);
      }
    } catch (err) {
      console.error("Error converting text to audio:", err);
      setError("Failed to convert text to audio. Please try again.");
    } finally {
      setIsLoading(false);
      setCurrentStep("form");
      setCurrentScript(null);
      reset();
    }
  };

  const deletePodcast = (id) => {
    setPodcastEntries((prev) => prev.filter((p) => p.id !== id));
  };

  const resetToForm = () => {
    setCurrentStep("form");
    setCurrentScript(null);
    setIsLoading(false);
  };

  const formData = watch();

  // Parse script data and set text when currentScript changes
  useEffect(() => {
    if (currentScript) {
      const scriptString = `
        ${currentScript.title || ""}
        ${currentScript.description || ""}
        ${currentScript.introduction || ""}
        ${currentScript.mainContent || ""}
        ${currentScript.conclusion || ""}
      `.trim();
      setText(scriptString);
    }
  }, [currentScript]);

  // Fetch podcast entries on component mount
  useEffect(() => {
    const fetchPodcastEntries = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${API}/users/${user.id}/podcastentries`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPodcastEntries(response.data);
      } catch (error) {
        console.error("Error fetching podcast entries:", error);
      }
    };
    
    fetchPodcastEntries();

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, [user.id]);

  return (
    <Box className="podcast-dashboard">
      {/* Header */}
      <Box className="header">
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" className="header-title">
            Chit Chat Podcasts
          </Typography>
          <Typography variant="h5" className="header-subtitle">
            {user.firstName}'s Personalized Creator
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" className="main-content">
        <Box className="content-grid">
          <Card className="card">
            <CardHeader
              className="card-header"
              title={
                <Box className="card-header-content">
                  <Mic />
                  <Typography variant="h5">Create Your Podcast</Typography>
                </Box>
              }
            />
            <CardContent className="card-content">
              {currentStep === "form" && (
                <Box
                  component="form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="form-container"
                >
                  <Box className="form-field">
                    <Typography variant="subtitle1" className="field-label">
                      Podcast Topic
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      placeholder="What do you want to chat about today?"
                      {...register("prompt", {
                        required: "Podcast topic is required",
                        minLength: {
                          value: 10,
                          message:
                            "Topic must be at least 10 characters long",
                        },
                      })}
                      error={!!errors.prompt}
                      className="text-field"
                    />
                    {errors.prompt && (
                      <FormHelperText error>
                        {errors.prompt.message}
                      </FormHelperText>
                    )}
                  </Box>

                  <Box className="form-field">
                    <Typography variant="subtitle1" className="field-label">
                      Mood & Tone
                    </Typography>
                    <FormControl fullWidth error={!!errors.mood}>
                      <Select
                        {...register("mood", {
                          required: "Please select a mood",
                        })}
                        value={formData.mood || ""}
                        displayEmpty
                        className="select-field"
                      >
                        <MenuItem value="">
                          <em>Select the mood for your podcast</em>
                        </MenuItem>
                        {moodOptions.map((mood) => (
                          <MenuItem key={mood} value={mood}>
                            {mood}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.mood && (
                        <FormHelperText>{errors.mood.message}</FormHelperText>
                      )}
                    </FormControl>
                  </Box>

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={isLoading}
                    className="submit-button"
                    startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
                    >
                      {isLoading ? 'Creating Script...' : 'Generate Podcast Script'}
                  </Button>
                </Box>
              )}

              {currentStep === "script" && currentScript && (
                <Box className="script-container">
                  <Box className="script-header">
                    <Typography variant="h5" className="script-title">
                      Your Script is Ready!
                    </Typography>
                    <Badge className="mood-badge">
                      Mood: {formData.mood}
                    </Badge>
                  </Box>

                  <Paper className="script-content">
                    {Object.entries(currentScript).map(([key, value]) => (
                      <Box key={key} className="script-section">
                        <Typography variant="h6" className="section-title">
                          {key.charAt(0).toUpperCase() +
                            key.slice(1).replace(/([A-Z])/g, " $1")}
                          :
                        </Typography>
                        <Typography
                          variant="body1"
                          className="section-content"
                        >
                          {value}
                        </Typography>
                      </Box>
                    ))}
                  </Paper>

                  <Box className="script-actions">
                    <Button
                      variant="contained"
                      onClick={handleConvertToAudio}
                      startIcon={<MusicNote />}
                      className="convert-button"
                    >
                      Convert to Audio
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={resetToForm}
                      className="back-button"
                    >
                      Back to Form
                    </Button>
                  </Box>
                </Box>
              )}

              {currentStep === "audio" && (
                <Box className="audio-loading">
                  <CircularProgress size={60} sx={{ mb: 3 }} />
                  <Typography variant="h6" className="loading-title">
                    Converting to Audio...
                  </Typography>
                  <Typography variant="body1" className="loading-subtitle">
                    Please wait while we create your podcast audio
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Right Side - Podcast Library */}
          <Card className="card">
            <CardHeader
              className="card-header library-header"
              title={
                <Box className="card-header-content">
                  <MusicNote />
                  <Typography variant="h5">
                    Podcast Library ({podcastEntries.length})
                  </Typography>
                </Box>
              }
            />
            <CardContent className="library-content">
              {podcastEntries.length === 0 ? (
                <Box className="empty-library">
                  <MusicNote className="empty-icon" />
                  <Typography variant="h6" className="empty-title">
                    No podcasts yet
                  </Typography>
                  <Typography variant="body1">
                    Create your first podcast to get started!
                  </Typography>
                </Box>
              ) : (
                <Box className="library-list">
                  {podcastEntries.map((podcast) => (
                    <Accordion key={podcast.id} className="podcast-accordion">
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Box>
                          <Typography variant="h6" className="podcast-title">
                            {podcast.title}
                          </Typography>
                          <Box className="podcast-badges">
                            {podcast.mood && (
                              <Badge className="badge mood-badge">
                                {podcast.mood}
                              </Badge>
                            )}
                            <Badge className="badge date-badge">
                              {podcast.createdAt}
                            </Badge>
                          </Box>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography
                          variant="body1"
                          className="podcast-description"
                        >
                          {podcast.description}
                        </Typography>

                        {podcast.audio_url && (
                          <Paper className="audio-player">
                            <audio controls>
                              <source
                                src={podcast.audio_url}
                                type="audio/mpeg"
                              />
                              Your browser does not support the audio element.
                            </audio>
                          </Paper>
                        )}

                        <Box className="podcast-actions">
                          <Button
                            size="small"
                            variant="contained"
                            color="error"
                            onClick={() => deletePodcast(podcast.id)}
                            startIcon={<Delete />}
                          >
                            Delete
                          </Button>
                          {podcast.audio_url && (
                            <Button
                              size="small"
                              variant="outlined"
                              startIcon={<Download />}
                            >
                              Download
                            </Button>
                          )}
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default PodcastDashboard;