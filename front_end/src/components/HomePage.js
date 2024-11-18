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

// Wrapper to pass URL parameters to Room component
import { useParams } from "react-router-dom";
function RoomWrapper({ leaveRoomCallback }) {
  const { roomCode } = useParams();
  return <Room roomCode={roomCode} leaveRoomCallback={leaveRoomCallback} />;
}

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: null,
    };
    this.clearRoomCode = this.clearRoomCode.bind(this);
  }

  async componentDidMount() {
    try {
      const response = await fetch("/api/user-in-room");
      if (response.ok) {
        const data = await response.json();
        this.setState({ roomCode: data.code });
      }
    } catch (error) {
      console.error("Error checking user room:", error);
    }
  }

  clearRoomCode() {
    this.setState({ roomCode: null });
  }

  renderHomePage() {
    return (
      <Container>
        <Stack
          spacing={4}
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "100vh" }}
        >
          <Typography variant="h3" component="h1">
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
          <Route
            path="/"
            element={
              this.state.roomCode ? (
                <Navigate to={`/room/${this.state.roomCode}`} replace />
              ) : (
                this.renderHomePage()
              )
            }
          />
          <Route path="/join" element={<RoomJoinPage />} />
          <Route path="/create" element={<CreateRoomPage />} />
          <Route
            path="/room/:roomCode"
            element={<RoomWrapper leaveRoomCallback={this.clearRoomCode} />}
          />
        </Routes>
      </Router>
    );
  }
}
