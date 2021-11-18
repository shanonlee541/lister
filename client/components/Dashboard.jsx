import React, { Component } from "react";
import { ButtonGroup, Button } from "reactstrap";
import ItemCard from "./ItemCard.jsx";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { userLogoutActionCreator } from "../actionCreators/userActionCreators.js";
import { Redirect } from "react-router";

// Grab user ID from props object (state)
const mapStateToProps = state => ({
    user_id: state.user.user_id
})

// ****** TO DO ****** Dispatch logout action
const mapDispatchToProps = dispatch => ({
    logoutHandler: () => dispatch(userLogoutActionCreator())
})

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { items: [] };

        // Bind methods
        this.handleClick = this.handleClick.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    // Add methods to fetch appropriate data 
    handleClick(e) {
        // GET request to /items?user=1&category=X on backend
        fetch(`/items?user=1&category=${e.target.value}`)
            .then(data => data.json())
            .then(itemsJSON => {
                // itemsJSON has format: { items: [...] }
                // Set items in state
                this.setState({ items: itemsJSON.items });
            })
            .catch(err => console.log('frontend GET home fail: ' + err));
    }

    // Method to delete item based on item id 
    deleteItem(e) {
        const deleteId = e.target.id;

        const optionsObject = {
            method: 'DELETE'
        }

        // DELETE request to /items?item_id=5
        fetch(`/items?item_id=${deleteId}`, optionsObject)
            .then(res => {console.log('Delete request successful')})
            .then(response => {
                // After delete, make a fetch request to get items and update state.
                fetch('/items?user=1&category=home')
                .then(response => response.json())
                .then(jsonData => {
                    this.setState({ items: jsonData.items });
                    console.log(this.state)
                })
                .catch(err => {
                    console.log('Inner fetch errror: ' + err);
                })
            })
            .catch(err => console.log(`Err: ${err}`))
    }

    render() {
        const items = [];
        // Loop through this.state.items to generate card items for each item from db 
        for (let i = 0; i < this.state.items.length; i++) {
            items.push(
                <ItemCard 
                    item_id={this.state.items[i].item_id}
                    name={this.state.items[i].name} 
                    price={this.state.items[i].price}
                    description={this.state.items[i].description}
                    url={this.state.items[i].url}
                    key={`${this.state.items[i].url}${this.state.items[i].item_id}`}
                    deleteItem = {this.deleteItem} 
                />)
        }

        return ( 
            // When component updates, check if user is logged in. If not, redirect to home. 
            (!this.props.user_id ? <Redirect to='/' /> : 
            <div className='center margin-top-20'>
                <div className='flex-row'>
                    <h5 className='right-margin-sm'>Category</h5>
                    <ButtonGroup>
                        <Button value='home' onClick={this.handleClick}>Home</Button>
                        <Button value='clothes' onClick={this.handleClick}>Clothes</Button>
                        <Button value='hobby' onClick={this.handleClick}>Hobby</Button>
                        <Button value='food' onClick={this.handleClick}>Food</Button>
                    </ButtonGroup>
                    <Button color='primary' className='inline-margin-sm'>
                        <Link to='/add'>Add Item</Link>
                    </Button>

                    <Button color='secondary' onClick={this.props.logoutHandler}>
                        Log Out
                    </Button>
                </div>

                {items}
            </div>
            )
        )
    }
}

// export default Dashboard;
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);