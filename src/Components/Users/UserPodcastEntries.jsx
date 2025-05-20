import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function UserPodcastEntries() {
  const {id} = useParams()
  const API = import.meta.env.VITE_BASE_URL
  const [userPodcast, setUserPodcastEntries] = useState()
  const [error, setError] = useState(null)
  const [] = useState()
  // This will be the design page for the Podcast Entries
  // Styling, positioning as a component, etc. 


  useEffect(()=> {
    const fetchPodcasts = async () => {
      const token = localStorage.getItem('token')
      try {
        const response = await axios.get(`${API}/users/${id}/podcastentries`, {
          headers: { Authorization: `Bearer ${token}`}
        })
        console.log(response.data)
        
      } catch (error) {
        
      }

    }
    fetchPodcasts()
  },[])

  const deletePodcast = async () => {
    try {
      const response = await axios.delete(`${API}/users/${id}/podcastentries`,
        {headers: { Authorization: `Bearer ${token}`}})
    } catch (error) {
      
    }
  }

  return (
    <div>UserPodcastEntries</div>
  )
}
