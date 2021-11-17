import React, { Component } from "react";
import { render } from "react-dom";
import { Switch, Route } from 'react-router-dom';

import AddForm from "./AddForm.jsx";
import EditForm from './EditForm.jsx';
import Dashboard from "./Dashboard.jsx";
import LoginForm from './LoginForm.jsx';

class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Switch>
                <Route exact path='/add' component={AddForm} />
                <Route path='/edit' component={EditForm} />
                <Route exact path='/dashboard' component={Dashboard} />
                <Route exact path='/' component={LoginForm} />
            </Switch>
        )
    }
}


export default App;
