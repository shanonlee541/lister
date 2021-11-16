import React, { Component } from "react";
import { render } from "react-dom";
import { Switch, Route } from 'react-router-dom';
import AddForm from "./AddForm.jsx";

class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/dashboard' component={AddForm} />
                <Route exact path='/add' component={AddForm} />
            </Switch>
        )
    }
}


export default App;