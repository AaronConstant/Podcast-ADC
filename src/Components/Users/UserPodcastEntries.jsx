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

  console.log(user);
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
  }, [user.id]);

  // const deletePodcast = async () => {
  //   try {
  //     const response = await axios.delete(
  //       `${API}/users/${user_id}/podcastentries/${id}`,
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //   } catch (error) {
  //     console.log("Error Deleting: ", error);
  //   }
  // }

  if (!userPodcast) {
    return <p>Loading podcasts...</p>;
  }

  if (userPodcast.length === 0) {
    return <p>No Podcasts</p>;
  }
  return (
    <div>
      <StyledContainer>
        <h1>{user.firstName}</h1>
        {userPodcast.map((podcast) => (
          <div key={podcast.id}>{podcast.title}</div>
        ))}
      </StyledContainer>
    </div>
  );
}
