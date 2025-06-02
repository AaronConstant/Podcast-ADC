import UserPodcastEntries from "./UserPodcastEntries";
import PodcastPlatform from "../PodcastPlatform";
import "../../Styling/dashboardStyling.scss";
import { StyledBox, StyledContainer, StyledTypography } from "../../Styling/theme";
import { useState, useEffect } from "react";
import Loading from "../Loading";
import { Typography, Box, Container} from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";


export default function UserDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
  <div className="full-container">
       {/* Header Section */}
  <Box className='podcast_header' sx={{ textAlign: 'center', mb: 4 }}>
    <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
      Chit Chat Podcasts
    </Typography>
    <StyledTypography variant="h5" color="primary">
      Personalized Creator
    </StyledTypography>
  </Box>
    <div className="dashboard_container">
          <PodcastPlatform />
        {<UserPodcastEntries />}
    </div>
    
    
    
    
    </div>
    </>
  );
}
