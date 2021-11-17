import React, { Component } from "react";
import { render } from 'react-dom';
import { ButtonGroup, Button, Col, Row } from "reactstrap";
import ItemCard from "./ItemCard.jsx";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { items: [] };

        // Bind methods
        this.handleClick = this.handleClick.bind(this);
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
                    key={`${this.state.items[i].url}`} 
                />)
        }

        return ( 
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
                        <a href='/add'>Add Item</a>
                    </Button>
                </div>

                {items}
            </div>
        )
    }
}

export default Dashboard;