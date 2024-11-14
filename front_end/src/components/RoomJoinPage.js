import React, { useState } from "react";
import { TextField, Button, Typography, Stack, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function RoomJoinPage() {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleTextFieldChange = (e) => {
    setRoomCode(e.target.value);
  };

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
          navigate(`/room/${roomCode}`);
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        width: "100vw",
        backgroundColor: "#f4f4f4",
        padding: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          width: "90%",
          padding: 3,
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Stack spacing={3} alignItems="center">
          <Typography variant="h4" component="h4" gutterBottom>
            Join a Room
          </Typography>

          <TextField
            error={!!error}
            label="Room Code"
            placeholder="Enter Room Code"
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
            sx={{ paddingY: 1.5, fontSize: "1rem" }} // Slightly larger button
          >
            Enter Room
          </Button>

          <Button
            variant="contained" // Changed to "contained" for consistency
            color="secondary"
            to="/"
            component={Link}
            fullWidth
            sx={{ paddingY: 1.5, fontSize: "1rem" }} // Same styling as Enter Room
          >
            Back
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
