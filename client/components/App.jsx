import React, { Component } from "react";
import { render } from "react-dom";
import { Switch, Route } from 'react-router-dom';

import AddForm from "./AddForm.jsx";
import EditForm from './EditForm.jsx';
import Dashboard from "./Dashboard.jsx";

class App extends Component {
    // Need to use match
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Switch>
                <Route exact path='/add' component={AddForm} />
                <Route path='/edit' component={EditForm} />
                <Route exact path='/' component={Dashboard} />
            </Switch>
        )
    }
}


export default App;
