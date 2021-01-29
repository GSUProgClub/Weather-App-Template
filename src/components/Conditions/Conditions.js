import React from 'react';
import classes from './Conditions.module.css';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

const Conditions = (props) => {
    let visible = true;
    // Here, the way props is used, is to short circuit so that if we error
    function dismiss() {
        visible = false;
    }

    // OR if we're loading, it displays the appropriate responses
    return (
        <div className={classes.Wrapper}>
            {props.error && 
                <small className={classes.Small}>Please enter a valid city.</small>
            }
            
            {props.exists &&
                <small className={classes.Small}>The city already exists</small>
            } 

            {props.loading && 
                <div className={classes.Loader}/>
            }

            {props.responseObj.cod === 200 && visible ?
                <Card className={classes.root}>
                    <CardMedia className={classes.media} image={`https://openweathermap.org/img/wn/${props.responseObj.weather[0]["icon"]}@2x.png`}/>
                    <CardContent>
                        <Typography variant={"h5"} component={"h2"}>
                            {props.responseObj.name}
                        </Typography>
                        <Typography className={classes.pos} color={"textSecondary"}>
                            {props.responseObj.weather[0].description}
                        </Typography>
                        <Typography variant={"body2"} component={"p"}>
                            Feels Like: {Math.round(props.responseObj.main.feels_like)}
                        </Typography>
                        <Typography variant={"body2"} component={"p"}>
                            Minimum: {Math.round(props.responseObj.main.temp_min)}
                        </Typography>
                        <Typography variant={"body2"} component={"p"}>
                            Maximum: {Math.round(props.responseObj.main.temp_max)}
                        </Typography>
                        <Typography variant={"body2"} component={"p"}>
                            Humidity: {Math.round(props.responseObj.main.humidity)}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size={"small"} type={"reset"} onClick={dismiss}>Dismiss</Button>
                    </CardActions>
                </Card>
                : null
            }
        </div>
    )
}

export default Conditions;