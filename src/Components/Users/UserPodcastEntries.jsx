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


export default function UserPodcastEntries() {
  const { id } = useParams();
  const API = import.meta.env.VITE_BASE_URL;
  const [userPodcast, setUserPodcastEntries] = useState();
  const [error, setError] = useState(null);
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
        console.log('Error retrieving podcasts: ', error)
      }
    };
    const userInfo = async ()=> {
      const token = localStorage.getItem('token')
      try {
        const response = await axios.get(`${API}/users/${id}`,{
          headers: {Authorization: `Bearer ${token}`}
          })
          setUserInfo(response.data)
        
      } catch (error) {
        console.log('Error retrieving: ', error)
      }
    }
    userInfo()
    fetchPodcasts()
  }, []);

  const deletePodcast = async () => {
    try {
      const response = await axios.delete(`${API}/users/${id}/podcastentries`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {}
  };

  return <div>UserPodcastEntries</div>;
}
