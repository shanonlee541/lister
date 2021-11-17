
import React, { Component } from "react";
import { render } from "react-dom";
import { Alert } from "reactstrap";

class ErrorToast extends Component {

    render() {
        return (
            <div>
                <Alert color='danger'>
                    {this.props.errorMessage}
                </Alert>
            </div>
        )
    }
}


export default ErrorToast;