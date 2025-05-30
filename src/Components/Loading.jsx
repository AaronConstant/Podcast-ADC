import { useEffect, useState } from "react";
import { CircularProgress, Box } from "@mui/material";
import "../Styling/Loading.scss";
const Loading = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box className={`loading_box ${visible ? "visible" : ""}`}>
      <CircularProgress />
    </Box>
  );
};

export default Loading;
