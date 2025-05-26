import { useState, useEffect } from 'react';
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
import { useAuth } from '../contexts/AuthContext';
function PodcastPlatform() {
  const API = import.meta.env.VITE_BASE_URL;
  const [prompt, setPrompt] = useState('');
  const [script, setScript] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAudioConverter, setShowAudioConverter] = useState(false);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const {user} = useAuth()

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
      `${API}/users/${user.id}/podcastentries/script`,
      { podcastentry: prompt },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
      }
    );
    
    setScript(response.data);
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    setIsLoading(false);
  }
};

  const handleConvertToAudio = () => {
    if (script) {
      const scriptString = `
        ${script.title}
        ${script.description}
        ${script.introduction}
         ${script.mainContent}
         ${script.conclusion}
      `;

      console.log("Converted script string: ", scriptString);

      setShowAudioConverter(true);

      setText(scriptString);
    }
  };

  const handleCloseAudioConverter = () => {
    setShowAudioConverter(false);
  };

  console.log("PPform Line 84 - Current script",script);
  

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

      {script && !isLoading && (
        <div style={{ marginTop: '20px' }}>
          <Typography variant="h5">script:</Typography>
          <Paper elevation={10} sx={{ padding: 10, margin: 2 }}>
            {Object.entries(script).map(([key, value]) => (
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
        <DialogTitle>Convert script to Audio</DialogTitle>
        <DialogContent>
          <AudioConverter initialText={text} userId={user.id} />
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