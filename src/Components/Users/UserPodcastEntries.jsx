import { useState, useEffect } from "react";
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
import { useAuth } from "../../contexts/AuthContext";
import "../../Styling/userPodcastStyling.scss";
export default function UserPodcastEntries() {
  const { user } = useAuth();
  const API = import.meta.env.VITE_BASE_URL;
  const [userPodcast, setUserPodcastEntries] = useState([]);
    const [error, setError] = useState(null);


  useEffect(() => {
    const fetchPodcasts = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${API}/users/${user.id}/podcastentries`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserPodcastEntries(response.data);
      } catch (error) {
        console.log("Error retrieving podcasts: ", error);
      }
    };
    fetchPodcasts();

    //  const interval = setInterval(() => {
    //   if (user?.id) {
    //     fetchPodcasts();
    //   }
    // }, 15000); 

    // return () => clearInterval(interval);
    
  }, [user.id]);



  const deletePodcast = async (podcastId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `${API}/users/${user.id}/podcastentries/${podcastId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
        console.log(response.data.message)
      setUserPodcastEntries(prev => prev.filter(podcast => podcast.id !== podcastId));
    } catch (error) {
      console.log("Error Deleting: ", error);
      setError("Failed to delete podcast");
    }
  };

  if (!userPodcast) {
    return <p>Loading podcasts...</p>;
  }

  if (userPodcast.length === 0) {
    return (
      <StyledContainer>
        <h1>{user.firstName}'s Podcasts</h1>
        <p>No Podcasts yet. Create your first one!</p>
        {/* <StyledButton onClick={refreshPodcasts}>
          Refresh
        </StyledButton> */}
      </StyledContainer>
    );
  }
  return (
    <div>
      <StyledContainer>
        
        {userPodcast.map((podcast) => (
          <StyledPaper key={podcast.id} style={{ margin: '10px 0', padding: '15px' }}>
            <StyledTypography variant="h6">{podcast.title}</StyledTypography>
            {podcast.description && (
              <StyledSubTypography>{podcast.description}</StyledSubTypography>
            )}
            {podcast.audio_url && (
              <audio controls style={{ width: '100%', marginTop: '10px' }}>
                {console.log("Line 95 UPE Url: ",podcast.url)}
                <source src={podcast.audio_url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
            <div style={{ marginTop: '10px' }}>
              <StyledButton 
                onClick={() => deletePodcast(podcast.id)}
                color="error"
                size="small"
              >
                Delete
              </StyledButton>
            </div>
          </StyledPaper>
        ))}
      </StyledContainer>
    </div>
  );
}
