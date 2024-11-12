import React, { useState } from "react";
import { TextField, Button, Typography, Stack, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom"; // useNavigate instead of useHistory

export default function RoomJoinPage() {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // useNavigate hook for navigation

  // Handle text field change
  const handleTextFieldChange = (e) => {
    setRoomCode(e.target.value);
  };

  // Handle room button click
  const roomButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: roomCode,
      }),
    };
    fetch("/api/join-room", requestOptions)
      .then((response) => {
        if (response.ok) {
          navigate(`/room/${roomCode}`); // Navigate to the room page
        } else {
          setError("Room not found.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box
      sx={{
        display: "flex", // Enable Flexbox for alignment
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
        height: "100vh", // Full height of the viewport
        width: "100vw", // Full width of the viewport
        backgroundColor: "#f4f4f4", // Optional background color for contrast
        padding: 2, // Optional padding around the edges
        position: "absolute", // Make the container take full viewport size
        top: 0,
        left: 0,
      }}
    >
      <Box
        sx={{
          maxWidth: 400, // Max width for the content box
          width: "100%", // Ensure the content box fills the space
          padding: 3, // Padding inside the content box
          backgroundColor: "white", // Background color for the content box
          borderRadius: 2, // Optional rounded corners for the box
          boxShadow: 3, // Optional shadow for the card-like effect
        }}
      >
        <Stack spacing={2} alignItems="center">
          <Typography variant="h4" component="h4" gutterBottom>
            Join a Room
          </Typography>

          <TextField
            error={!!error}
            label="Code"
            placeholder="Enter a Room Code"
            value={roomCode}
            helperText={error}
            variant="outlined"
            onChange={handleTextFieldChange}
            fullWidth
          />

          <Button
            variant="contained"
            color="primary"
            onClick={roomButtonPressed}
            fullWidth
          >
            Enter Room
          </Button>

          <Button
            variant="contained"
            color="secondary"
            to="/"
            component={Link}
            fullWidth
          >
            Back
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
