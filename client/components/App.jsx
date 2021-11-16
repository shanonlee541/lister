import React, { Component } from "react";
import { render } from "react-dom";
// Routes replaced Switch 
import { Switch, Route } from 'react-router-dom';
import Test from "./Test.jsx";

class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/login' component={Test} />
            </Switch>
            // <Test />
        )
    }
}


export default App;