import Conditions from '../Conditions/Conditions';
import classes from './Forecast.module.css';
import React, { useState } from 'react';

let cities = [];

const Forecast = () => {
    let [city, setCity] = useState('');
    let [unit, setUnit] = useState('imperial');
    let [responseObj, setResponse] = useState({});
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);
    let [seen, setSeen] = useState(false);
    let weatherList = [];

    function getForecast(e) {
        // Stops default values of e going through
        e.preventDefault();

        // trying to get forecasts without naming the city
        if (city.length === 0) {
            return setError(true);
        }

        // Clear state because we have a new city coming through
        setError(false);
        setResponse({});

        // go from a text entry to a real text component
        // strips spaces, and most illegal characters
        const uriEncodedCity = encodeURIComponent(city);
        
        if (cities.length > 1 && cities.includes(uriEncodedCity)) {
            setSeen(true);
            return;
        } else {
            setSeen(false);
            cities.push(uriEncodedCity);
        }

        const api_call = `https://api.openweathermap.org/data/2.5/weather?q=${uriEncodedCity}&appid=${process.env.REACT_APP_API_KEY}`;
        fetch(api_call)
            .then(response => response.json())  // specify that the response is json
            .then(response => {  // The promised response has been fulfilled and we can execute
                if (response.cod !== 200) {
                    throw new Error();
                    // unexpected response
                }
                
                setResponse(response);  // we set the response and trigger update
                weatherList.push(response); // We then append the weather of the city to the list we pass to the card renderer
                setLoading(false);  // We set our loading message to false
            })
            .catch(err => {
                // we found a legitimate error, logging
                setSeen(false);
                setError(true);
                setLoading(false);
                console.log(err.message);
            })
    }

    return (
        // JSX code
        <div>
            <h2>Find Current Weather Conditions</h2>
            <form onSubmit={getForecast}>
                <input
                    type="text"
                    placeholder="Enter City"
                    maxLength="50"
                    className={classes.textInput}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    />
                <label className={classes.Radio}>
                    <input
                        type="radio"
                        name="units"
                        checked={unit === "imperial"}
                        value="imperial"
                        onChange={(e) => setUnit(e.target.value)}
                        />
                    Fahrenheit
                </label>
                <label className={classes.Radio}>
                    <input
                        type="radio"
                        name="units"
                        checked={unit === "metric"}
                        value="metric"
                        onChange={(e) => setUnit(e.target.value)}
                        />
                    Celcius
                </label>

                <button className={classes.Button} type="submit">Get Weather and Forecast</button>
            </form>
            <Conditions
               responseObj={responseObj}
               error={error}
               loading={loading}
               exists={seen}
               cities={weatherList}
               />
        </div>
    )
}

export default Forecast;