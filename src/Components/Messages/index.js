import React, {useEffect, useRef} from 'react';
import SingleMessage from "../SingleMessage";
import classes from './index.module.css';

const Messages = (props) => {
    const ul = useRef(null);
    useEffect( ()=>{
        ul.current.scrollTop = ul.current.scrollHeight;
    }, [props.messages] );
    return (
        <ul ref={ul} className={classes.Messages}>
            {props.messages.map( (msg,ind) => <SingleMessage key={ind} msg={msg}/> )}
        </ul>
    );
};

export default Messages;