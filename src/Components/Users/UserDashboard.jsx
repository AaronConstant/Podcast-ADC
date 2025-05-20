import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import UserPodcastEntries from './UserPodcastEntries'

// have a state watching the log-out button (when created) to erase localstorage with token contain within it localStorage.clear() <-- :).
export default function UserDashboard() {
    const {id, user_id} = useParams()
    
  return (
    <div>UserDashboard
        <p>User ID: {id}</p>
        <div>{<UserPodcastEntries user_id ={user_id}/>}</div>
    </div>
  )
}
