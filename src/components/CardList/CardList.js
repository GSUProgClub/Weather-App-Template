import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import Card from 'react-bootstrap/Card'

// Taking inspiration from:
//      https://react-bootstrap.github.io/components/cards/#kitchen-sink
const CardList = ({ cities }) => {
    const cardsArray = cities.map(city => generateCards(city));

    function generateCards(city) {
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Img varient="top" src={`https://openweathermap.org/img/wn/${city.weather[0]["icon"]}@2x.png`}/>
                <Card.Body>
                    <Card.Title>{city.name}</Card.Title>
                    <Card.Text></Card.Text>
                </Card.Body>
                <ListGroup className="weather-props">
                    <ListGroupItem>Feels Like: {city.main.feels_like}</ListGroupItem>
                    <ListGroupItem>Min: {city.main.temp_min}</ListGroupItem>
                    <ListGroupItem>Max: {city.main.temp_max}</ListGroupItem>
                    <ListGroupItem>Humidity: {city.main.humidity}</ListGroupItem>
                </ListGroup>
            </Card>
        );
    }

    return(
        <div>
            {cardsArray}
        </div>
    );
}

export default CardList;