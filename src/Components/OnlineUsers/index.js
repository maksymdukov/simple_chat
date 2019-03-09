import React from 'react';
import User from "../User";

const OnlineUsers = ({users}) => {
    return (
        <ul>
            {users.map((user, ind) => <User key={ind} user={user} />)}
        </ul>
    );
};

export default OnlineUsers;