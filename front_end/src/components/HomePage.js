import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  redirect,
} from "react-router-dom";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Routes>
          <Route path="/">This is the homepage</Route>
          <Route path="/join" Component={RoomJoinPage}></Route>
          <Route path="/create" Component={CreateRoomPage}></Route>
        </Routes>
      </Router>
    );
  }
}
