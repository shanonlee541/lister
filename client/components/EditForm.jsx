import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import ErrorToast from "./ErrorToast.jsx";

class EditForm extends Component {
    // Local state to handle changing category buttons 
    constructor(props) {
        super(props);
        this.state = {
            loading: true, 
            currentItemDetails: {}
        }

        // Bind methods 
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeCategory = this.changeCategory.bind(this);
        this.populateFormData = this.populateFormData.bind(this);
    }

    // On mount, load all current details into the form 
    componentDidMount() {
        const item_id = (this.props.location.search).substring(1).split('=')[1];
        console.log(item_id)
        // Search database for this data and populate form
        // GET /items?user=1&item_id=X
        fetch(`/items?user=1&item_id=${item_id}`)
            .then(data => data.json())
            .then(response => {
                this.setState({ currentItemDetails: response.items });
                this.populateFormData();
                
            })
            .catch(err => console.log(err))
    }

    // Handle changing radio buttons and set in local state so we can submit form
    changeCategory(e) {
        this.setState({ category: e.target.value });
    }

    // Edit Form Submit
    handleSubmit(e) {
        e.preventDefault();
        const name = document.getElementById('item-name').value;
        const price = document.getElementById('item-price').value;
        const description = document.getElementById('item-description').value;
        const url = document.getElementById('item-url').value;
        const category = this.state.category;
    }

    // Populate current form data based on current state pulled from db 
    populateFormData() {
        console.log(this.state)
        const { name, price, description, url, category } = this.state.currentItemDetails;
        document.getElementById('item-name').value = name;
        document.getElementById('item-price').value = price;
        document.getElementById('item-description').value = description;
        document.getElementById('item-url').value = url;
        document.getElementById(`${category}Radio`).checked = true;
        this.setState({ loading: false });
    }

    render() {
        return (
            <div className='sm-container center margin-top-20'>
            {this.state.loading && <h2>Loading...</h2>}
            <Form id='edit-form' 
            style= {{ visibility: this.state.loading ? 'hidden' : 'visible' }}>
                <h2>Edit Item </h2>
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
                        <Input type="radio" name="category" value='home' id='homeRadio' onChange={(e) => this.changeCategory(e)} />{' '}
                        Home
                    </Label>
                </FormGroup>
            
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="category" value='clothes' id='clothesRadio' onChange={(e) => this.changeCategory(e)} />{' '}
                        Clothes
                    </Label>
                </FormGroup>

                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="category" value='hobby' id='hobbyRadio' onChange={(e) => this.changeCategory(e)} />{' '}
                        Hobby
                    </Label>
                </FormGroup>

                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="category" value='food' id='foodRadio' onChange={(e) => this.changeCategory(e)}  />{' '}
                        Food
                    </Label>
                </FormGroup>
                            
                <Button color='primary' onClick={this.handleSubmit}>Submit Edits</Button>

                <Button color='secondary' className='left-margin-sm'>
                    <a href='/'>Back to Dashboard</a>
                </Button>
            </Form>

            </div>
        )
    }
}

export default EditForm;

// <div className='sm-container center margin-top-20'>
// {this.state.loading ? <h2>Loading...</h2> : (
//     <Form id='edit-form'>
//         <h2>Edit Item </h2>
//         <FormGroup>
//             <Label for='item-name'>Item Name</Label>
//             <Input type='text' id='item-name' placeholder='ex: Clear umbrella, Christmas sweater...' />
//         </FormGroup>
//         <FormGroup>
//             <Label for='item-price'>Item Price</Label>
//             <Input type='text' id='item-price' placeholder='ex: 15.99, 20.00, 1045.99...' />
//         </FormGroup>
//         <FormGroup>
//             <Label for='item-description'>Item Description</Label>
//             <Input type='text' id='item-description' placeholder='ex: Gift for dad...' />
//         </FormGroup>

//         <FormGroup>
//             <Label for='item-url'>Item URL</Label>
//             <Input type='text' id='item-url' placeholder='https://www.amazon.com/Gildan-Heavy-Blend-Crewneck-Sweatshirt' />
//         </FormGroup>

//         <Label>Category</Label>

//         <FormGroup check>
//             <Label check>
//                 <Input type="radio" name="category" value='home' onChange={(e) => this.changeCategory(e)} />{' '}
//                 Home
//             </Label>
//         </FormGroup>
    
//         <FormGroup check>
//             <Label check>
//                 <Input type="radio" name="category" value='clothes'  onChange={(e) => this.changeCategory(e)} />{' '}
//                 Clothes
//             </Label>
//         </FormGroup>

//         <FormGroup check>
//             <Label check>
//                 <Input type="radio" name="category" value='hobby'  onChange={(e) => this.changeCategory(e)} />{' '}
//                 Hobby
//             </Label>
//         </FormGroup>

//         <FormGroup check>
//             <Label check>
//                 <Input type="radio" name="category" value='food' onChange={(e) => this.changeCategory(e)}  />{' '}
//                 Food
//             </Label>
//         </FormGroup>
                    
//         <Button color='primary' onClick={this.handleSubmit}>Submit Edits</Button>

//         <Button color='secondary' className='left-margin-sm'>
//             <a href='/dashboard'>Back to Dashboard</a>
//         </Button>
//     </Form>
// )}

// </div>