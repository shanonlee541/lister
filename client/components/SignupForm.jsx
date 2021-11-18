import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import userSignup from "../actionCreators/userSignup.js";
import ErrorToast from './ErrorToast.jsx';

// mapDispatch to dispatch thunk action creator ( signup new user )
const mapDispatchToProps = dispatch => ({
    userSignup: (name, username, password) => dispatch(userSignup(name, username, password))
})

// Grab user_id from redux store to check if user is logged in 
const mapStateToProps = state => ({
    user_id: state.user.user_id
})

class SignUpForm extends Component {
    constructor(props) {
        super(props);

        // Bind methods
        this.handleSignup = this.handleSignup.bind(this);
    }

    // Handle user login method
    handleSignup() {
        const inputUsername = document.getElementById('signup-username').value;
        const inputPassword = document.getElementById('signup-password').value;
        const inputName = document.getElementById('signup-name').value;

        // Trigger method to dispatch userSignup thunk action creator 
        this.props.userSignup(inputName, inputUsername, inputPassword);
    }

    render() {
        return (
            (this.props.user_id ? <Redirect to='/dashboard' /> : 
            <Form className='sm-container center block-margin-lg'>
                <h4>Sign Up </h4>

                <FormGroup>
                    <Label>First Name</Label>
                    <Input type='text' id='signup-name' placeholder='First Name'></Input>
                </FormGroup>

                <FormGroup>
                    {this.props.error && <ErrorToast errorMessage={this.props.error} />}
                    <Label>Username</Label>
                    <Input type='text' id='signup-username' placeholder='Username'></Input>
                </FormGroup>

                <FormGroup>
                    <Label>Password</Label>
                    <Input type='password' id='signup-password' placeholder='Password'></Input>
                </FormGroup>

                <Button color='primary' onClick={this.handleSignup}>Sign Up</Button>

                <Button color='secondary' className='inline-margin-sm'>
                    <Link to='/'>Log In</Link>
                </Button>

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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);