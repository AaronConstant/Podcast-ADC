import UserPodcastEntries from "./UserPodcastEntries";
import PodcastPlatform from "../PodcastPlatform";
import "../../Styling/dashboardStyling.scss";
import { StyledBox, StyledContainer } from "../../Styling/theme";
import { useState, useEffect } from "react";
import Loading from "../Loading";

export default function UserDashboard() {
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
    <div className="dashboard_container">
      <StyledContainer className="genarator_and_pdocasts_container">
        <StyledBox>
          <PodcastPlatform />
        </StyledBox>
        {<UserPodcastEntries />}
      </StyledContainer>
    </div>
  );
}
