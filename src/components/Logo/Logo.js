import React from 'react';
import classes from "./Logo.module.css";

const Logo = () => {
    return (
        <div className={classes.face}>
            <div className={classes.leftEye}>
                <div className={classes.pupil}/>
            </div>
            <div className={classes.rightEye}>
                <div className={classes.pupil}/>
            </div>
            <div className={classes.mouth}/>
        </div>
    )
}

export default Logo;