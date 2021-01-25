import React from 'react';
import classes from './Conditions.module.css';
import CardList from '../CardList/CardList';

debugger
const conditions = (props) => {
    // Here, the way props is used, is to short circuit so that if we error
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

            {props.responseObj.cod === 200 ?
                <div>
                    <CardList cities={props.cities} />
                    {/* <p><strong>{props.responseObj.name}</strong></p>
                    <p>It is currently {Math.round(props.responseObj.main.temp)} degrees out with {props.responseObj.weather[0].description}</p> */}
                </div>
                : null
            }
        </div>
    )
}

export default conditions;