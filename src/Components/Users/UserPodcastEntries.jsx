import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  theme,
  StyledBox,
  StyledButton,
  StyledTypography,
  StyledContainer,
  StyledPaper,
  StyledSubTypography,
} from "../../Styling/theme";
import {
  Grid,
  IconButton,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  ExpandMore as ExpandMoreIcon,
  Edit as EditIcon,
} from "@mui/icons-material";

export default function UserPodcastEntries() {
  const { id } = useParams();
  const API = import.meta.env.VITE_BASE_URL;
  const [userPodcast, setUserPodcastEntries] = useState([]);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [playingPodcast, setPlayingPodcast] = useState(null);
  const [audioRef, setAudioRef] = useState(null);
  const [editDialog, setEditDialog] = useState({ open: false, podcast: null });
  const [editForm, setEditForm] = useState({ title: "", description: "" });
  const [expandedPodcast, setExpandedPodcast] = useState(null);

  useEffect(() => {
    const fetchPodcasts = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${API}/users/${id}/podcastentries`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserPodcastEntries(response.data);
      } catch (error) {
        console.log("Error retrieving podcasts: ", error);
        setError("Failed to load podcast entries");
      }
    };

    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${API}/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserInfo(response.data);
      } catch (error) {
        console.log("Error retrieving user info: ", error);
        setError("Failed to load user information");
      }
    };

    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchUserInfo(), fetchPodcasts()]);
      setLoading(false);
    };

    loadData();
  }, [id, API]);

  const deletePodcast = async (podcastId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${API}/users/${id}/podcastentries/${podcastId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUserPodcastEntries((prev) =>
        prev.filter((podcast) => podcast.id !== podcastId)
      );

      if (playingPodcast === podcastId) {
        if (audioRef) {
          audioRef.pause();
        }
        setPlayingPodcast(null);
        setAudioRef(null);
      }
    } catch (error) {
      console.log("Error Deleting: ", error);
      setError("Failed to delete podcast entry");
    }
  };

  const togglePlayPause = (podcastId, audioUrl) => {
    if (playingPodcast === podcastId) {
      if (audioRef) {
        audioRef.pause();
      }
      setPlayingPodcast(null);
      setAudioRef(null);
    } else {
      if (audioRef) {
        audioRef.pause();
      }

      const newAudio = new Audio(audioUrl);
      newAudio.play().catch((err) => {
        console.error("Error playing audio:", err);
        setError("Failed to play audio");
      });

      newAudio.onended = () => {
        setPlayingPodcast(null);
        setAudioRef(null);
      };

      setPlayingPodcast(podcastId);
      setAudioRef(newAudio);
    }
  };

  const openEditDialog = (podcast) => {
    setEditForm({ title: podcast.title, description: podcast.description });
    setEditDialog({ open: true, podcast });
  };

  const closeEditDialog = () => {
    setEditDialog({ open: false, podcast: null });
    setEditForm({ title: "", description: "" });
  };

  const handleEditSubmit = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `${API}/users/${id}/podcastentries/${editDialog.podcast.id}`,
        {
          title: editForm.title,
          description: editForm.description,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update the podcast in state
      setUserPodcastEntries((prev) =>
        prev.map((podcast) =>
          podcast.id === editDialog.podcast.id
            ? {
                ...podcast,
                title: editForm.title,
                description: editForm.description,
              }
            : podcast
        )
      );

      closeEditDialog();
    } catch (error) {
      console.log("Error updating podcast: ", error);
      setError("Failed to update podcast");
    }
  };

  if (loading) {
    return (
      <StyledContainer>
        <StyledBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="200px"
        >
          <CircularProgress color="primary" />
        </StyledBox>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer maxWidth="lg">
      <StyledBox>
        <StyledTypography variant="h4" component="h1" gutterBottom>
          {userInfo?.name
            ? `${userInfo.name}'s Podcast Entries`
            : "My Podcast Entries"}
        </StyledTypography>

        {error && (
          <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {userPodcast && userPodcast.length === 0 ? (
          <StyledPaper>
            <StyledSubTypography variant="h6" align="center">
              No podcast entries found. Start creating your first podcast!
            </StyledSubTypography>
          </StyledPaper>
        ) : (
          <StyledBox display="flex" flexDirection="column" gap={3}>
            {userPodcast &&
              userPodcast.map((podcast) => (
                <StyledPaper
                  key={podcast.id}
                  elevation={3}
                  sx={{ width: "100%" }}
                >
                  <StyledBox p={3}>
                    <StyledBox
                      display="flex"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      mb={2}
                    >
                      <StyledBox flex={1}>
                        <StyledSubTypography
                          variant="h5"
                          component="h2"
                          gutterBottom
                          sx={{ color: theme.palette.primary.main }}
                        >
                          {podcast.title}
                        </StyledSubTypography>
                        <StyledSubTypography
                          variant="body1"
                          color="text.secondary"
                          sx={{
                            lineHeight: 1.6,
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {podcast.description}
                        </StyledSubTypography>
                      </StyledBox>

                      <StyledButton
                        variant="outlined"
                        endIcon={<ExpandMoreIcon />}
                        onClick={() =>
                          setExpandedPodcast(
                            expandedPodcast === podcast.id ? null : podcast.id
                          )
                        }
                        sx={{ ml: 2, minWidth: 120 }}
                      >
                        {expandedPodcast === podcast.id ? "Collapse" : "Expand"}
                      </StyledButton>
                    </StyledBox>

                    {expandedPodcast === podcast.id && (
                      <StyledBox
                        sx={{
                          mt: 3,
                          pt: 3,
                          borderTop: `2px solid ${theme.palette.primary.light}`,
                          backgroundColor: "#f8f9fa",
                          borderRadius: 2,
                          p: 2,
                        }}
                      >
                        <StyledSubTypography
                          variant="h6"
                          gutterBottom
                          sx={{ color: theme.palette.secondary.main }}
                        >
                          Full Description:
                        </StyledSubTypography>
                        <StyledSubTypography
                          variant="body1"
                          color="text.primary"
                          sx={{
                            mb: 3,
                            lineHeight: 1.6,
                            whiteSpace: "pre-wrap",
                          }}
                        >
                          {podcast.description}
                        </StyledSubTypography>
                        <StyledBox
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          flexWrap="wrap"
                          gap={2}
                        >
                          <StyledBox display="flex" alignItems="center" gap={2}>
                            {podcast.audio_url && (
                              <StyledButton
                                variant="contained"
                                startIcon={
                                  playingPodcast === podcast.id ? (
                                    <PauseIcon />
                                  ) : (
                                    <PlayIcon />
                                  )
                                }
                                onClick={() =>
                                  togglePlayPause(podcast.id, podcast.audio_url)
                                }
                                sx={{
                                  backgroundColor: theme.palette.info.main,
                                  "&:hover": {
                                    backgroundColor: theme.palette.info.dark,
                                  },
                                }}
                              >
                                {playingPodcast === podcast.id
                                  ? "Pause"
                                  : "Play"}
                              </StyledButton>
                            )}

                            <StyledButton
                              variant="outlined"
                              startIcon={<EditIcon />}
                              onClick={() => openEditDialog(podcast)}
                              sx={{
                                borderColor: theme.palette.secondary.main,
                                color: theme.palette.secondary.main,
                                "&:hover": {
                                  backgroundColor:
                                    theme.palette.secondary.light,
                                  color: "white",
                                },
                              }}
                            >
                              Edit Podcast
                            </StyledButton>
                          </StyledBox>

                          <StyledButton
                            variant="contained"
                            startIcon={<DeleteIcon />}
                            onClick={() => deletePodcast(podcast.id)}
                            sx={{
                              backgroundColor: theme.palette.error.main,
                              "&:hover": {
                                backgroundColor: theme.palette.error.dark,
                              },
                            }}
                          >
                            Delete
                          </StyledButton>
                        </StyledBox>
                      </StyledBox>
                    )}
                  </StyledBox>
                </StyledPaper>
              ))}
          </StyledBox>
        )}

        <Dialog
          open={editDialog.open}
          onClose={closeEditDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            <StyledSubTypography variant="h6">
              Edit Podcast Entry
            </StyledSubTypography>
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Podcast Title"
              type="text"
              fullWidth
              variant="outlined"
              value={editForm.title}
              onChange={(e) =>
                setEditForm((prev) => ({ ...prev, title: e.target.value }))
              }
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={editForm.description}
              onChange={(e) =>
                setEditForm((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </DialogContent>
          <DialogActions>
            <StyledButton onClick={closeEditDialog}>Cancel</StyledButton>
            <StyledButton
              onClick={handleEditSubmit}
              variant="contained"
              disabled={!editForm.title.trim()}
            >
              Save Changes
            </StyledButton>
          </DialogActions>
        </Dialog>

        {userPodcast && userPodcast.length > 0 && (
          <StyledBox mt={3} textAlign="center">
            <StyledSubTypography variant="body2" color="text.secondary">
              Total Podcast Entries: {userPodcast.length}
            </StyledSubTypography>
          </StyledBox>
        )}
      </StyledBox>
    </StyledContainer>
  );
}
