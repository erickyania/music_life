import React, { Component } from "react"
import { render } from "react-dom/client"

export default class App extends Component{
    constructor(props) {
        super(props)
    }
    render() {
        return <h1>Hello</h1>
    }
}

const appDiv = document.getElementById("app");
render(<app />, appDiv);