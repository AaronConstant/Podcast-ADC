import UserPodcastEntries from "./UserPodcastEntries";
import PodcastPlatform from "../PodcastPlatform";
import "../../Styling/dashboardStyling.scss";
import {
  StyledBox,
  StyledContainer,
  StyledTypography,
} from "../../Styling/theme";
import { useState, useEffect } from "react";
import Loading from "../Loading";
import { Typography, Box, Container } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

export default function UserDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const API = import.meta.env.VITE_BASE_URL;
  const [podcastEntries, setPodcastEntries] = useState([]);

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
    }
    fetchPodcastEntries();

    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }
  console.log("Dashboard Line 52 - Podcast Entries: ", podcastEntries);
  
  return (
    <>
      <div className="full-container">
        {/* Header Section */}
        <Box className="podcast_header" sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{ fontWeight: "bold", mb: 1 }}
          >
            Chit Chat Podcasts
          </Typography>
          <StyledTypography variant="h5" color="primary">
            {`${user.firstName} Personalized Creator`}
          </StyledTypography>
        </Box>
        <Box className="grid-container"></Box>
        <div className="dashboard_container">
          <PodcastPlatform onNewPodcast = {newPodcast => setPodcastEntries(prev => [...prev, newPodcast])} />
          {<UserPodcastEntries podcastEntries={podcastEntries} setPodcastEntries={setPodcastEntries} />}
        </div>
      </div>
    </>
  );
}
