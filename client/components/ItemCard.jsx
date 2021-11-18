import React, { Component } from "react";
import { render } from "react-dom";
import { Card, CardTitle, CardBody, CardSubtitle, Button } from 'reactstrap';
import { Link } from "react-router-dom";

class ItemCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // Isolate properties from props objects
        const { item_id, name, price, description, url, deleteItem, user_id } = this.props;
        const fullUrl = `http://${url}`;

        return (
            <div className='block-margin-sm'>
                <Card>
                    <CardBody>
                        <CardTitle tag='h5'>{name}</CardTitle>
                        <CardTitle tag='h6'>${price}</CardTitle>
                        <CardSubtitle tag='p'>Description: {description}</CardSubtitle>

                        <div className='block-margin-sm'>
                            <Button color='primary'>
                                <a href={fullUrl} target='_blank'>Go to Item URL</a>
                            </Button>

                            <Button color='secondary' className='left-margin-sm'>
                                <Link to={`/edit?item_id=${item_id.toString()}`}>Edit Item</Link>
                            </Button>

                            <Button color='danger' className='left-margin-sm' id={item_id} onClick={deleteItem}>
                                Delete Item
                            </Button>
                        </div>

                    </CardBody>
                </Card>
            </div>

        )
    }
}

export default ItemCard;