import React, { Component } from "react"
export default class Room extends Component{
    constructor(props) {
        super(props);
        this.state = {
            votesToSkip: 2,
            guestCanPause: false,
            isHost: false,
        };
    }
    render() {
        return <div>
            <p>Votes:{this.state.votes_to_skip}</p>
            <p>Guest can pause:{this.state.guestCsnPause}</p>
            <p>Host:{this.state.isHost</p>
        </div>
    }
}