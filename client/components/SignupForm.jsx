import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import userLogin from "../actionCreators/userLogin";
import ErrorToast from './ErrorToast.jsx';


class SignUpForm extends Component {
    constructor(props) {
        super(props);

        // Bind methods
        this.handleLogin = this.handleLogin.bind(this);
    }

    // Handle user login method
    handleLogin() {
        const inputUsername = document.getElementById('username').value;
        const inputPassword = document.getElementById('password').value;
   
        // Trigger method to dispatch userLogin action creator -- works
        this.props.userLogin(inputUsername, inputPassword)

    }

    render() {
        return (
            (this.props.user_id ? <Redirect to='/dashboard' /> : 
            <Form className='sm-container center block-margin-lg'>
                <h4>Sign Up </h4>

                <FormGroup>
                    <Label for='name'>First Name</Label>
                    <Input type='text' id='name' placeholder='First Name'></Input>
                </FormGroup>

                <FormGroup>
                    {this.props.error && <ErrorToast errorMessage={this.props.error} />}
                    <Label for='username'>Username</Label>
                    <Input type='text' id='username' placeholder='Username'></Input>
                </FormGroup>

                <FormGroup>
                    <Label for='password'>Password</Label>
                    <Input type='password' id='password' placeholder='Password'></Input>
                </FormGroup>

                <Button color='primary' onClick={this.handleLogin}>Sign Up</Button>

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

export default connect(null, null)(SignUpForm);