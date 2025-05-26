import UserPodcastEntries from './UserPodcastEntries'
// import { useAuth } from '../../contexts/AuthContext'
import PodcastPlatform from '../PodcastPlatform'
import { theme,
         StyledBox,
         StyledButton,
         StyledTypography,
         StyledContainer,
         StyledPaper,
         StyledSubTypography
        } from '../../Styling/theme'

// have a state watching the log-out button (when created) to erase localstorage with token contain within it localStorage.clear() <-- :).
export default function UserDashboard() {
  // const {user} = useAuth()
  //   console.log(user.id);
  //   console.log("Token: ",localStorage.getItem('token'));
    
    
  return (
    <div className='dashboard_container'>UserDashboard
      <StyledContainer>
        <PodcastPlatform/>
      </StyledContainer>
        <div>{<UserPodcastEntries/>}</div>
    </div>
  )
}

