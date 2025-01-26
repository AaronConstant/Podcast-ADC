import { useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import { Typography, TextField, Button } from '@mui/material';


const API = import.meta.env.VITE_BASE_URL;

console.log(API)

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async () => {
    try {
      const res = await axios.get(`${API}`, { geminiprompt: prompt });
      console.log(res.data)
      setResponse(res.data);
    } catch (error) {
      console.error('An Error occurred:', error);
    }
  };

  useEffect(() => {
    if (response) {
      console.log('Response received:', response);
        }
  }, [response]);

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4">Gemini AI Prompt</Typography>
      <TextField
        fullWidth
        label="Enter your prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ margin: '20px 0' }}
      />
      <Button variant="contained" color="secondary" onClick={handleSubmit}>
        Generate
      </Button>
      {response && (
        <div style={{ marginTop: '20px' }}>
          <Typography variant="h5">Response:</Typography>
          <Typography>{response}</Typography>
        </div>
      )}
    </div>
  );
}

export default App;