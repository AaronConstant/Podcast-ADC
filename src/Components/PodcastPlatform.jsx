import { useState, useEffect } from 'react';
// import './App.css';
import {
  Typography,
  TextField,
  Button,
  CircularProgress,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import AudioConverter from './AudioGenerator';
import Loading from './Loading';
import axios from 'axios';
import { useParams} from 'react-router-dom';

function PodcastPlatform() {
  const API = import.meta.env.VITE_BASE_URL;
  const {user_id} = useParams()
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAudioConverter, setShowAudioConverter] = useState(false);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token')
    const response = await axios.post(
      `${API}/users/${user_id}/podcastentries/script`,
      { podcastentry: prompt },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
      }
    );
    const data = response.data;
    setResponse(data);
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    setIsLoading(false);
  }
};

  const handleConvertToAudio = () => {
    if (response) {
      const responseString = `
        ${response.title}
        ${response.introduction}
         ${response.mainContent}
         ${response.conclusion}
      `;

      console.log("Converted response string: ", responseString);

      setShowAudioConverter(true);

      setText(responseString);
    }
  };

  const handleCloseAudioConverter = () => {
    setShowAudioConverter(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant='h1'>Your Personalized</Typography>
      <Typography variant="h4">Chit Chat Podcasts</Typography>
      <Typography variant="h4">Generator</Typography>
      <TextField
        fullWidth
        label="Enter your prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ margin: '20px 0' }}
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        Create Prompt
      </Button>

      {isLoading && (
        <div style={{ marginTop: '20px' }}>
          <CircularProgress />
        </div>
      )}

      {response && !isLoading && (
        <div style={{ marginTop: '20px' }}>
          <Typography variant="h5">Response:</Typography>
          <Paper elevation={10} sx={{ padding: 10, margin: 2 }}>
            {Object.entries(response).map(([key, value]) => (
              <Typography key={key} variant="body1" style={{ marginTop: '10px' }}>
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
              </Typography>
            ))}
          </Paper>

          <Button
            variant="contained"
            color="primary"
            onClick={handleConvertToAudio}
            style={{ marginTop: '20px' }}
          >
            Convert to Audio ?
          </Button>
        </div>
      )}

      <Dialog
        open={showAudioConverter}
        onClose={handleCloseAudioConverter}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Convert Response to Audio</DialogTitle>
        <DialogContent>
          <AudioConverter initialText={text} apiUrl={API} user_id={user_id} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAudioConverter} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PodcastPlatform;