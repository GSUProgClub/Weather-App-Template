import Conditions from '../Conditions/Conditions';
import classes from './Forecast.module.css';

import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {FormControl, FormLabel, Radio, RadioGroup} from "@material-ui/core";

const Forecast = () => {
    let [inputValue, setInputValue] = useState('');
    let [unit, setUnit] = useState();
    let [responseObj, setResponse] = useState({});
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);
    let [cityName, setCityName] = useState();
    let [dataAvailable, setData] = useState(false);
    let weatherList = [];

    function getForecast(e) {
        // Stops default values of e going through
        e.preventDefault();

        // trying to get forecasts without naming the city
        if (inputValue.length === 0) {
            return setError(true);
        }

        // Clear state because we have a new city coming through
        setError(false);
        setResponse({});

        // go from a text entry to a real text component
        // strips spaces, and most illegal characters
        const uriEncodedCity = encodeURIComponent(inputValue);

        // To use the OneCall API from OpenWeather we need the lat, long and to properly get those,
        // we're going to make another api call to OpenDataSoft and their database us-zip-code-latitude-and-longitude
        const latLongAPI = `https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=${uriEncodedCity}`;

        fetch(latLongAPI)
            .then(openData => openData.json())
            .then(openData => {
                let lat = openData.records[0].fields.latitude;
                let long = openData.records[0].fields.longitude;
                setCityName(openData.records[0].fields.city);

                const openWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely,hourly,alerts&appid=${process.env.REACT_APP_API_KEY}`;
                return fetch(openWeather);
            })
            .then(openWeather => openWeather.json())
            .then(openWeather => {
                setResponse(openWeather);  // we set the response and trigger update
                weatherList.push(openWeather); // We then append the weather of the city to the list we pass to the card renderer
                setLoading(false);  // We set our loading message to false
                setData(true);
            })
            .catch(err => {
                // we found a legitimate error, logging
                //setSeen(false);
                setError(true);
                setLoading(false);
                console.log(err);
            });
    }

    return (
        // JSX code
        <Container component={"main"} maxWidth={"xs"}>
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component={"h1"} variant={"h5"}>
                    Find Current Weather Conditions
                </Typography>
                <form className={classes.form} noValidate onSubmit={getForecast}>
                    <TextField
                        variant={"outlined"}
                        margin={"normal"}
                        required
                        fullWidth
                        id={inputValue}
                        label={"City"}
                        name={"city"}
                        placeholder={"Enter City or Zip Code"}
                        autoFocus
                        onChange={(e) => setInputValue(e.target.value)}
                        />
                        <FormControl component={"fieldset"}>
                            <FormLabel/>
                            <RadioGroup name={"units"} value={unit} onChange={(e) => setUnit(e.target.value)}>
                                <FormControlLabel value={'metric'} control={<Radio value={'metric'}/>} label={"Celsius"}/>
                                <FormControlLabel value={'imperial'} control={<Radio value={'imperial'}/>} label={"Fahrenheit"}/>
                            </RadioGroup>
                        </FormControl>
                    <Button
                        type={"submit"}
                        fullWidth
                        variant={"contained"}
                        color={"primary"}
                        className={classes.submit}>
                        Get Weather
                    </Button>
                </form>
                <Conditions
                    responseObj={responseObj}
                    name = {cityName}
                    error={error}
                    loading={loading}
                    cities={weatherList}
                    available={dataAvailable}
                />
            </div>
        </Container>
    )
}

export default Forecast;