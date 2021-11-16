import React, { Component } from "react";

class App extends Component {
    render() {
        return (
            <div>
                <h1>
                    Does hot reload work?
                </h1>
                <h2>test with h2</h2>
                <h3>hot reload</h3>
                <h4>Does this work?</h4>
                <h1> Additional h1, should not load! </h1>
            </div>
        )
    }
}

export default App;