import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import Card from 'react-bootstrap/Card'

// Taking inspiration from:
//      https://react-bootstrap.github.io/components/cards/#kitchen-sink
const CardList = ({ cities }) => {
    const cardsArray = cities.map(city => (
        <Card style={{ width: '18rem' }}>
            <Card.Img varient="top" src={}/>
            <Card.Body>
                <Card.Title>{city.name}</Card.Title>
                <Card.Text></Card.Text>
            </Card.Body>
            <ListGroup className="weather-props">
                <ListGroupItem>Min: {}</ListGroupItem>
                <ListGroupItem>Max: {}</ListGroupItem>
                <ListGroupItem>Humidity: {}</ListGroupItem>
            </ListGroup>
        </Card>
    ));

    return(
        <div>
            {cardsArray}
        </div>
    );
}

export default CardList;