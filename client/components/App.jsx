import React, { Component } from "react";
import { render } from "react-dom";
import { Switch, Route } from 'react-router-dom';

import AddForm from "./AddForm.jsx";
import EditForm from './EditForm.jsx';
import Dashboard from "./Dashboard.jsx";
import LoginForm from './LoginForm.jsx';
import LoginComponent from "./LoginComponent.jsx";
import DashboardContainer from "./DashboardContainer.jsx";
import AddFormContainer from "./AddFormContainer.jsx";
import SignupForm from "./SignupForm.jsx";

class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Switch>
                <Route exact path='/add' component={AddFormContainer} />
                {/* <Route path='/edit' component={EditForm} /> */}
                <Route path='/edit' render={(routeProps) => <EditForm {...routeProps} /> } />
                <Route exact path='/dashboard' component={DashboardContainer} />
                <Route path='/signup' render={() => <SignupForm />} />
                <Route exact path='/' component={LoginComponent} />
            </Switch>
        )
    }
}


export default App;
