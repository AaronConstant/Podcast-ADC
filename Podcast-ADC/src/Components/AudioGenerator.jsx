// import React, { useState, useEffect } from "react";
// import {
//   TextField,
//   Button,
//   CircularProgress,
//   Typography,
//   Container,
//   Paper,
//   Box,
// } from "@mui/material";

// const AudioConverter = ({ initialText, apiUrl }) => {
//   const [text, setText] = useState(initialText || "");
//   const [audioUrl, setAudioUrl] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     setText(initialText || "");
//   }, [initialText]);

//   const handleInputChange = (e) => {
//     setText(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");

//     try {
//       console.log("Sending request to:", `${apiUrl}/geminiprompt/audio`);
//       console.log("Request body:", { elevenprompt: text });

//       const response = await fetch(`${apiUrl}/geminiprompt/audio`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           elevenprompt: text,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();
//       setAudioUrl(data.audio_url);
//     } catch (err) {
//       console.error("Error converting text to audio:", err);
//       setError("Failed to convert text to audio. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   console.log("Sending request to:", `${apiUrl}/geminiprompt/audio`);
//   console.log("Request body:", { elevenprompt: text });
//   return (
//     <Container maxWidth="md">
//       <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
//         <Typography variant="h4" align="center" gutterBottom>
//           Text-to-Speech Converter
//         </Typography>

//         <form onSubmit={handleSubmit}>
//           <TextField
//             fullWidth
//             multiline
//             rows={5}
//             variant="outlined"
//             placeholder="Enter text to convert to audio"
//             value={text}
//             onChange={handleInputChange}
//             required
//             sx={{ marginBottom: 3 }}
//           />

//           <Box display="flex" justifyContent="center">
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               disabled={isLoading}
//               startIcon={isLoading ? <CircularProgress size={20} /> : null}
//             >
//               {isLoading ? "Converting..." : "Convert to Audio"}
//             </Button>
//           </Box>
//         </form>

//         {error && (
//           <Typography color="error" align="center" sx={{ marginTop: 2 }}>
//             {error}
//           </Typography>
//         )}

//         {audioUrl && (
//           <Box sx={{ marginTop: 4 }}>
//             <Typography variant="h6" align="center" gutterBottom>
//               Generated Audio
//             </Typography>
//             <audio controls style={{ width: "100%" }}>
//               <source src={audioUrl} type="audio/mpeg" />
//               Your browser does not support the audio element.
//             </audio>
//           </Box>
//         )}
//       </Paper>
//     </Container>
//   );
// };

// export default AudioConverter;

import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Typography,
  Container,
  Paper,
  Box,
} from "@mui/material";

const AudioConverter = ({ initialText, apiUrl }) => {
  const [text, setText] = useState(initialText || "");
  const [audioUrl, setAudioUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setText(initialText || "");
  }, [initialText]);

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      console.log("Sending request to:", `${apiUrl}/geminiprompt/audio`);
      console.log("Request body:", { elevenprompt: text });

      const response = await fetch(`${apiUrl}/geminiprompt/audio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          elevenprompt: text,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Get the audio data as a Blob
      const blob = await response.blob();

      // Create a URL for the Blob
      const audioUrl = URL.createObjectURL(blob);
      setAudioUrl(audioUrl);

      // Log the audio URL for debugging
      console.log("Audio URL:", audioUrl);
    } catch (err) {
      console.error("Error converting text to audio:", err);
      setError("Failed to convert text to audio. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Text-to-Speech Converter
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            multiline
            rows={5}
            variant="outlined"
            placeholder="Enter text to convert to audio"
            value={text}
            onChange={handleInputChange}
            required
            sx={{ marginBottom: 3 }}
          />

          <Box display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={20} /> : null}
            >
              {isLoading ? "Converting..." : "Convert to Audio"}
            </Button>
          </Box>
        </form>

        {error && (
          <Typography color="error" align="center" sx={{ marginTop: 2 }}>
            {error}
          </Typography>
        )}

        {audioUrl && (
          <Box sx={{ marginTop: 4 }}>
            <Typography variant="h6" align="center" gutterBottom>
              Generated Audio
            </Typography>
            <audio controls style={{ width: "100%" }}>
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default AudioConverter;