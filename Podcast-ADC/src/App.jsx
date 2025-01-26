import { useState, useEffect } from 'react';
import './App.css';
import { Typography, TextField, Button } from '@mui/material';


function App() {
  const API = import.meta.env.VITE_BASE_URL || 'http://localhost:4000';
  console.log(API);
  
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async () => {
    try {
      console.log("Prompt:",prompt)
      const res = await fetch(`${API}/geminiprompt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ geminiprompt: prompt }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log(data);
      setResponse(data);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  useEffect(() => {
    if (response) {
      console.log('We Got Something:', response);
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
      <Button variant="contained" color="secondary" onClick={handleSubmit}>
        Create Prompt
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
