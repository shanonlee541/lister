import React, { Component } from "react";
import { render } from "react-dom";
import { Card, CardTitle, CardBody, CardSubtitle, CardText, Button, Row } from 'reactstrap';

class ItemCard extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        // Isolate properties from props objects
        const { name, price, description, url } = this.props;
        const fullUrl = `http://${url}`
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
                                <a href='/edit'>Edit Item</a>
                            </Button>

                            <Button color='danger' className='left-margin-sm'>
                                <a href=''>Delete Item</a>
                            </Button>
                        </div>

                    </CardBody>
                </Card>
            </div>

        )
    }
}

export default ItemCard;