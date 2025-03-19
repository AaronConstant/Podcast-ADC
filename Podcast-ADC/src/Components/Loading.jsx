import React, { useEffect, useState } from 'react';
import { CircularProgress, Box } from '@mui/material';

const Loading = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        opacity: visible ? 1 : 0,
        transition: 'opacity 1s ease-in-out',
      }}
    >
      <h1>We are Loading in...🥹</h1>
      <CircularProgress />
    </Box>
  );
};

export default Loading;
