import React, { Component } from "react";
import { render } from "react-dom";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";

class LoginForm extends Component {
    // Put userLogin function into props using this.props

    render() {
        return (
            <Form className='sm-container center block-margin-lg'>
                <FormGroup>
                    <Label for='username'>Username</Label>
                    <Input type='text' placeholder='Username'></Input>
                </FormGroup>

                <FormGroup>
                    <Label for='username'>Password</Label>
                    <Input type='password' placeholder='Password'></Input>
                </FormGroup>

                <Button color='primary'>Log In</Button>
            </Form>
        )
    }
}

export default LoginForm;