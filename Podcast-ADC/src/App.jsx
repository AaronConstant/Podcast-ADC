import { useState, useEffect } from 'react';
import './App.css';
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
import AudioConverter from './Components/AudioGenerator';

function App() {
  const API = import.meta.env.VITE_BASE_URL || 'http://localhost:4000';
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAudioConverter, setShowAudioConverter] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      console.log('Prompt:', prompt);
      const res = await fetch(`${API}/geminiprompt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ geminiprompt: prompt }),
      });
      console.log("Response status from Gemini:", res.status);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Gemini response:", data);
      setResponse(data); 
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConvertToAudio = () => {
    setShowAudioConverter(true); 
  };

  const handleCloseAudioConverter = () => {
    setShowAudioConverter(false); 
  };

  useEffect(() => {
    if (response) {
      console.log('We Got Something!!');
    }
  }, [response]);

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4">Gemini AI Prompt</Typography>
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
          <Paper elevation={10} sx={{ padding: 10 }}>
            {response}
          </Paper>

          <Button
            variant="contained"
            color="primary"
            onClick={handleConvertToAudio}
            style={{ marginTop: '20px' }}
          >
            Convert to Audio?
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
          <AudioConverter initialText={response} apiUrl={API} />
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

export default App;