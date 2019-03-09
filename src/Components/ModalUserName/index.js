import React from 'react';
import classes from './index.module.css'

const ModalUserName = (props) => {
    const {setUserNameHandler} = props;
    return (
        <div className={classes.wrapper}>
            <form onSubmit={setUserNameHandler}>
                <input type="text" placeholder="Your nickname" name="nickname" />
                <button type="submit">Ok</button>
            </form>
        </div>
    );
};

export default ModalUserName;