import React, { Component } from "react";
import { render } from "react-dom";
import { Switch, Route } from 'react-router-dom';

import AddForm from "./AddForm.jsx";
import Dashboard from "./Dashboard.jsx";

class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/dashboard' component={Dashboard} />
                <Route exact path='/add' component={AddForm} />
            </Switch>
        )
    }
}


export default App;