import UserPodcastEntries from './UserPodcastEntries'
// import { useAuth } from '../../contexts/AuthContext'
import PodcastPlatform from '../PodcastPlatform'
import '../../Styling/dashboardStyling.scss'
import { theme,
         StyledBox,
         StyledButton,
         StyledTypography,
         StyledContainer,
         StyledPaper,
         StyledSubTypography
        } from '../../Styling/theme'

export default function UserDashboard() {
  // const {user} = useAuth()
    
    
  return (
    <div className='dashboard_container'>
      <StyledContainer>
        <PodcastPlatform/>
      </StyledContainer>
        <div>{<UserPodcastEntries/>}</div>
    </div>
  )
}

