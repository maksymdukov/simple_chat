import React, {useContext} from 'react';
import classes from './index.module.css';
import {MyContext} from "../../Containers/App";

const SingleMessage = ({msg}) => {
    let fromBlock;
    let liClass;
    const nick = useContext(MyContext);

    if (nick !== msg.from) {
        fromBlock = (
            <div className={classes.from}>
            {msg.from}
            </div>
        );
        liClass = classes.SingleMessage;
    } else {
        liClass = `${classes.SingleMessage} ${classes.blue}`;
    }
    return (
        <li className={liClass}>
            {fromBlock}
            <div className={classes.body}>
                {msg.body}
            </div>
        </li>
    );
};

export default SingleMessage;