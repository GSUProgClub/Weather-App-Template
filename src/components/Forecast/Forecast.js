import Conditions from '../Conditions/Conditions';
import classes from './Forecast.module.css';

import React, { useState } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {FormControl, FormLabel, Radio, RadioGroup} from "@material-ui/core";

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

        // uncomment this code for the demo
        // if (cities.length > 1 && cities.includes(uriEncodedCity)) {
        //     setSeen(true);
        //     return;
        // } else {
        //     setSeen(false);
        //     cities.push(uriEncodedCity);
        // }

        const api_call = `https://api.openweathermap.org/data/2.5/weather?q=${uriEncodedCity}&units=${unit}&appid=${process.env.REACT_APP_API_KEY}`;
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
                //setSeen(false);
                setError(true);
                setLoading(false);
                console.log(err.message);
            })
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
                        id={city}
                        label={"City"}
                        name={"city"}
                        placeholder={"Enter City"}
                        autoFocus
                        onChange={(e) => setCity(e.target.value)}
                        />
                        <FormControl component={"fieldset"}>
                            <FormLabel component={"units"}/>
                            <RadioGroup aria-label={"units"} name={"units"} value={unit} onChange={setUnit}>
                                <FormControlLabel value={"metric"} control={<Radio/>} label={"Celsius"}/>
                                <FormControlLabel value={"imperial"} control={<Radio/>} label={"Fahrenheit"}/>
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
                    error={error}
                    loading={loading}
                    exists={seen}
                    cities={weatherList}
                />
            </div>
        </Container>
    )
}

export default Forecast;