// entry point for the app.
import React, { Component } from "react";
import { createRoot } from "react-dom/client";
import HomePage from "./HomePage";

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <HomePage></HomePage>;
  }
}

// const appDiv = document.getElementById("app");
// render(<app />, appDiv);

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
