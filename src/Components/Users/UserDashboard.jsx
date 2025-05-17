import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
// import UserPodcastEntries from './UserPodcastEntries'

export default function UserDashboard() {
    const {id, user_id} = useParams()
  return (
    <div>UserDashboard
        <p>User ID: {id}</p>
    </div>
  )
}
