import React, { Component } from "react";
import { Stack, Button, Typography, Container } from "@mui/material";
import { Navigate } from "react-router-dom";  // Import Navigate

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votesToSkip: 2,
      guestCanPause: false,
      isHost: false,
      redirectToHome: false,  // State to control the redirection
    };
    this.roomCode = this.props.roomCode;
    this.leaveRoom = this.leaveRoom.bind(this);
    this.getRoomDetails = this.getRoomDetails.bind(this);
  }

  componentDidMount() {
    this.getRoomDetails();
  }

  async getRoomDetails() {
    try {
      const response = await fetch(`/api/get-room?code=${this.roomCode}`);
      if (response.ok) {
        const data = await response.json();
        this.setState({
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        });
      } else {
        console.error("Room not found");
        this.setState({ redirectToHome: true });  // Set redirectToHome to true
      }
    } catch (error) {
      console.error("Error fetching room details:", error);
    }
  }

  async leaveRoom() {
    try {
      const response = await fetch("/api/leave-room", { method: "POST" });
      if (response.ok) {
        this.props.leaveRoomCallback(); // Notify the parent component to clear the room code
        this.setState({ redirectToHome: true });  // Set redirectToHome to true after leaving
      } else {
        console.error("Failed to leave the room");
      }
    } catch (error) {
      console.error("Error leaving the room:", error);
    }
  }

  render() {
    if (this.state.redirectToHome) {
      return <Navigate to="/" replace />;  // Perform the redirect to home page
    }

    return (
      <Container>
        <Stack
          spacing={4}
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "100vh" }}
        >
          <Typography variant="h4" component="h2">
            Room Code: {this.roomCode}
          </Typography>
          <Typography variant="h6" component="h3">
            Votes Required to Skip: {this.state.votesToSkip}
          </Typography>
          <Typography variant="h6" component="h3">
            Guest Can Pause: {this.state.guestCanPause ? "Yes" : "No"}
          </Typography>
          <Typography variant="h6" component="h3">
            Host: {this.state.isHost ? "Yes" : "No"}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={this.leaveRoom}
          >
            Leave Room
          </Button>
        </Stack>
      </Container>
    );
  }
}
