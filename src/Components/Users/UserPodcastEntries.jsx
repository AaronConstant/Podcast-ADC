import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  StyledButton,
  StyledTypography,
  StyledContainer,
  StyledSubTypography,
} from "../../Styling/theme";
import {
  Paper,
  Container,
  Accordion,
  AccordionDetails,
  AccordionActions,
  AccordionSummary,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import { useAuth } from "../../contexts/AuthContext";
import "../../Styling/EntriesStyling.scss";
import PropTypes from 'prop-types';


export default function UserPodcastEntries({podcastEntries, setPodcastEntries}) {
  const { user } = useAuth();
  const API = import.meta.env.VITE_BASE_URL;
  const [error, setError] = useState(null);

  const deletePodcast = async (podcastId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `${API}/users/${user.id}/podcastentries/${podcastId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data.message);
      setPodcastEntries((prev) =>
        prev.filter((podcast) => podcast.id !== podcastId)
      );
    } catch (error) {
      console.log("Error Deleting: ", error);
      setError("Failed to delete podcast");
    }
  };

  if (!podcastEntries) {
    return <p>Loading podcasts...</p>;
  }

  if (podcastEntries.length === 0) {
    return (
      <StyledContainer className="entry_container">
        <h1>{user.firstName}'s Podcasts</h1>
        <p>No Podcasts yet. Create your first one!</p>
        {/* <StyledButton onClick={refreshPodcasts}>
          Refresh
        </StyledButton> */}
      </StyledContainer>
    );
  }
  UserPodcastEntries.propTypes = {
  user: PropTypes.object.isRequired,
  userPodcast: PropTypes.array,
  podcastEntries: PropTypes.array.isRequired,
};
  return (
    <div className="entry_container">
      <Container className="accordian_container">
         <div>
          <Typography className="accordian-title">Podcast Library</Typography>
      {podcastEntries.map((podcast, index) => (
        <Accordion className="accordian-item" key={index}>
          <AccordionSummary className="accordian-summary"
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-content-${index}`}
            id={`panel-header-${index}`}
          >
            <Typography>{podcast.title}</Typography>
          </AccordionSummary>
          <AccordionDetails className="accordian-details">
            <Typography>{podcast.description}</Typography>
            {podcast.audio_url && (
              <audio controls style={{ width: "100%", marginTop: "10px" }}>
                {console.log("Line 95 UPE Url: ", podcast.url)}
                <source src={podcast.audio_url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
            <div style={{ marginTop: "10px" }}>
              <StyledButton
                onClick={() => deletePodcast(podcast.id)}
                color="primary"
                size="small"
              >
                Delete
              </StyledButton>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
       
      </Container>
    </div>
  );
}
