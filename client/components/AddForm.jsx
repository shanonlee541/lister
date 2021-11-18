import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import ErrorToast from "./ErrorToast.jsx";
import { Link } from "react-router-dom";

class AddForm extends Component {
    // Local state to handle changing category buttons 
    constructor(props) {
        super(props);
        this.state = {
            category: null, 
            error: null
        }

        // Bind methods 
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeCategory = this.changeCategory.bind(this);
    }

    // Form Submit
    handleSubmit(e) {
        e.preventDefault();

        // Clear errors if there was one 
        this.setState({ error: null })
        
        const name = document.getElementById('item-name').value;
        const price = document.getElementById('item-price').value;
        const description = document.getElementById('item-description').value;
        const url = document.getElementById('item-url').value;
        const category = this.state.category;

        // Reset form 
        const form = document.getElementById('add-form');
        form.reset();

        // Submit POST request to /items?user=1
        const optionsObject = {
            method: 'POST', 
            mode: 'cors', 
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }, 
            body: JSON.stringify({ 
                name: name, 
                price: price, 
                description: description, 
                url: url, 
                category: category
            })
        }
        
        fetch('/items?user=1', optionsObject)
            .then(response => response.json())
            .then(addedItem => {
                console.log(`Command: ${addedItem.command} was successful`);
            })
            .catch(err => {
                console.log(`Request to /items?user=1 failed: ${err}`);
                this.setState({ error: `Failed to add item. Error: ${err}`});
            })
    }

    // Handle changing radio buttons and set in local state so we can submit form
    changeCategory(e) {
        this.setState({ category: e.target.value });
    }

    render() {
        return (
            <div className='sm-container center margin-top-20'>
                <h2>Add New Item</h2>
                { this.state.error && <ErrorToast errorMessage={this.state.error} /> }
                <Form id='add-form'>
                    <FormGroup>
                        <Label for='item-name'>Item Name</Label>
                        <Input type='text' id='item-name' placeholder='ex: Clear umbrella, Christmas sweater...' />
                    </FormGroup>
                    <FormGroup>
                        <Label for='item-price'>Item Price</Label>
                        <Input type='text' id='item-price' placeholder='ex: 15.99, 20.00, 1045.99...' />
                    </FormGroup>
                    <FormGroup>
                        <Label for='item-description'>Item Description</Label>
                        <Input type='text' id='item-description' placeholder='ex: Gift for dad...' />
                    </FormGroup>

                    <FormGroup>
                        <Label for='item-url'>Item URL</Label>
                        <Input type='text' id='item-url' placeholder='https://www.amazon.com/Gildan-Heavy-Blend-Crewneck-Sweatshirt' />
                    </FormGroup>

                    <Label>Category</Label>

                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="category" value='home' onChange={(e) => this.changeCategory(e)} />{' '}
                            Home
                        </Label>
                    </FormGroup>
                 
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="category" value='clothes'  onChange={(e) => this.changeCategory(e)} />{' '}
                            Clothes
                        </Label>
                    </FormGroup>

                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="category" value='hobby'  onChange={(e) => this.changeCategory(e)} />{' '}
                            Hobby
                        </Label>
                    </FormGroup>

                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="category" value='food'  onChange={(e) => this.changeCategory(e)}  />{' '}
                            Food
                        </Label>
                    </FormGroup>
                                   
                    <Button color='primary' onClick={this.handleSubmit}>Add Item</Button>
    
                    <Button color='secondary' className='left-margin-sm'>
                        {/* <a href='/dashboard'>Back to Dashboard</a> */}
                        <Link to='/dashboard'>Back to Dashboard</Link>
                    </Button>
                </Form>
            </div>
        )
    }
}

export default AddForm;