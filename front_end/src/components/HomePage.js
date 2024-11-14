import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import { Stack, Button, Typography, Container } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { useParams } from "react-router-dom";

// Wrapper to pass URL parameters to Room component
function RoomWrapper() {
  const { roomcode } = useParams();
  return <Room roomCode={roomcode} />;
}

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: null,
    };
  }

  async componentDidMount() {
    // Fetch to check if user is already in a room
    try {
      const response = await fetch("/api/user-in-room");
      const data = await response.json();
      this.setState({ roomCode: data.code });
      console.log("Room code:", data.code); // For troubleshooting
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  }

  renderHomePage() {
    // Conditionally render redirect if roomCode is present
    if (this.state.roomCode) {
      return <Navigate to={`/room/${this.state.roomCode}`} replace />;
    }
    // Main home page layout with buttons
    return (
      <Container>
        <Stack
          spacing={4}
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "100vh" }}
        >
          <Typography variant="h3" component="h3">
            House Party
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/join"
            >
              Join a Room
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/create"
            >
              Create a Room
            </Button>
          </Stack>
        </Stack>
      </Container>
    );
  }

  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={this.renderHomePage()} />
          <Route path="/join" element={<RoomJoinPage />} />
          <Route path="/create" element={<CreateRoomPage />} />
          <Route path="/room/:roomcode" element={<RoomWrapper />} />
        </Routes>
      </Router>
    );
  }
}
