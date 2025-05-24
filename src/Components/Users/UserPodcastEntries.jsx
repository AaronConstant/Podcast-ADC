import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { theme,
         StyledBox,
         StyledButton,
         StyledTypography,
         StyledContainer,
         StyledPaper,
         StyledSubTypography
        } from '../../Styling/theme'
import PodcastPlatform from "../PodcastPlatform";

export default function UserPodcastEntries() {
  const { id } = useParams();
  const API = import.meta.env.VITE_BASE_URL;
  const [userPodcast, setUserPodcastEntries] = useState([]);
  // const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  // This will be the design page for the Podcast Entries
  // Styling, positioning as a component, etc.

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
      }
    };
    const userInfo = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${API}/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserInfo(response.data);
      } catch (error) {
        console.log("Error retrieving: ", error);
      }
    };
    userInfo();
    fetchPodcasts();
  }, [id]);

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
  // };
  console.log(userPodcast);

  if (!userPodcast) {
    return <p>Loading podcasts...</p>;
  }

  if (userPodcast.length === 0) {
    return <p>No Podcasts</p>;
  }
  return (
    <div>
      <StyledContainer>
        <PodcastPlatform/>
      </StyledContainer>

    <StyledContainer>
      {userPodcast.map((podcast) => (
        <div key={podcast.id}>{podcast.title}</div>
      ))}

    </StyledContainer>
    </div>
  );
}
