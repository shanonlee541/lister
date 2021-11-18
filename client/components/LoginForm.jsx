import React, { Component } from "react";
import { render } from "react-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { testActionCreator } from "../actionCreators/userActionCreators";
import userLogin from "../actionCreators/userLogin";
import ErrorToast from './ErrorToast.jsx';

// Put userLogin function into props object using mapDispatchToProps
const mapDispatchToProps = dispatch => ({
    // This function doesn't work yet -- "dispatch is not a function"
    userLogin: (username, password) => dispatch(userLogin(username, password))
    // testFunc: () => dispatch(testActionCreator())
});

// Test to see if connect() works -- connect WORKS, mapStateToProps works
// Something wrong with syntax in mapDispatchToProps
const mapStateToProps = state => ({
    user_id: state.user.user_id, 
    error: state.user.error
})

class LoginForm extends Component {
    constructor(props) {
        super(props);

        // Bind methods
        this.handleLogin = this.handleLogin.bind(this);
    }

    // Handle user login method
    handleLogin() {
        const inputUsername = document.getElementById('username').value;
        const inputPassword = document.getElementById('password').value;
        // console.log(inputUsername, inputPassword, this.props.user_id);
        // console.log(this.props.userLogin);
        // this.props.userLogin(inputUsername, inputPassword);
        // Trigger method to dispatch userLogin action creator -- works
        this.props.userLogin(inputUsername, inputPassword)

        // Dispatch TEST action (expect: does NOT need to go through thunk)
        // This works and updates state as expected. 
        // this.props.testFunc();
    }

    render() {
        return (
            // (this.props.error && <ErrorToast errorMessage={this.props.error} />)
            (this.props.user_id ? <Redirect to='/dashboard' /> : 
            <Form className='sm-container center block-margin-lg'>
                <FormGroup>
                    {this.props.error && <ErrorToast errorMessage={this.props.error} />}
                    <Label for='username'>Username</Label>
                    <Input type='text' id='username' placeholder='Username'></Input>
                </FormGroup>

                <FormGroup>
                    <Label for='username'>Password</Label>
                    <Input type='password' id='password' placeholder='Password'></Input>
                </FormGroup>

                <Button color='primary' onClick={this.handleLogin}>Log In</Button>

                <div className='block-margin-lg'>
                    I am using ReactStrap for style here, but everything else is from scratch!
                    <br></br>
                    No create-react-app, I promise :)
                </div>

            </Form>
            )
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);