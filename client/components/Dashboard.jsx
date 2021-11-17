import React, { Component } from "react";
import { render } from 'react-dom';
import { ButtonGroup, Button } from "reactstrap";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { items: null };

        // Bind methods
        this.homeClick = this.homeClick.bind(this);
        this.clothesClick = this.clothesClick.bind(this);
        this.hobbyClick = this.hobbyClick.bind(this);
        this.foodClick = this.foodClick.bind(this);
    }


    // Add methods to fetch appropriate data 
    homeClick(e) {
        // GET request to /items?user=1&category=home on backend
        fetch(`/items?user=1&category=${e.target.value}`)
            .then(data => data.json())
            .then(itemsJSON => {
                // itemsJSON has format: { items: [...] }
                // Set items in state
                this.setState({ items: itemsJSON.items });
            })
            .catch(err => console.log('frontend GET home fail'));
    }

    clothesClick(e) {
        console.log(e.target.value);
    }

    hobbyClick(e) {
        console.log(e.target.value);
    }

    foodClick(e) {
        console.log(e.target.value);
    }

    render() {
        return ( 
            <div className='lg-container-padded'>
                <h5>Category</h5>
                <ButtonGroup>
                    <Button value='home' onClick={this.homeClick}>Home</Button>
                    <Button value='clothes' onClick={this.clothesClick}>Clothes</Button>
                    <Button value='hobby' onClick={this.hobbyClick}>Hobby</Button>
                    <Button value='food' onClick={this.foodClick}>Food</Button>
                </ButtonGroup>

                <div>// Where cards will go</div>
            </div>
        )
    }
}

export default Dashboard;