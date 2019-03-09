import React, {Component} from 'react';
import classes from './index.module.css';
import Messages from '../../Components/Messages';
import OnlineUsers from "../../Components/OnlineUsers";

class Chat extends Component {

    state = {
        messages: [],
        onlineUsers: []
    };
    ws = null;
    sid = null;

    componentDidMount() {
        this.ws = new WebSocket('ws://achex.ca:4010');
        let ws = this.ws;
        ws.onopen = (event) => {
            console.log(event);
        };

        ws.onclose = (event) => {
            if (event.wasClean) {
                console.log("Closed correctly");
            } else {
                console.log("Connection broke");
            }
            console.log(`Code: ${event.code}, reason: ${event.reason}`);
            ws.send(JSON.stringify({bc:'maxchat', offline: this.props.userName}));
            };

        ws.onerror = (event) => {
            console.log(event.message);
        };

        ws.onmessage = (event) => {
            console.log(event.data);
            let response = JSON.parse(event.data);
            if (response.SID) {
                this.SID = response.SID;
                let auth = {"setID":this.props.userName,"passwd":"12345678"};
                ws.send(JSON.stringify(auth));
            }
            if (response.auth) {
                console.log(response.auth);
                ws.send(JSON.stringify({cmd:'register_broadcast', bid:'maxchat'}));
                ws.send(JSON.stringify({bc:'maxchat', online: this.props.userName, req:'info'}))
            }

            if (response.msg) {
                let msg = {
                    from: response.FROM,
                    body: response.msg
                };
                this.setState({
                    messages: this.state.messages.concat(msg)
                });
            }

            if (response.online) {
                if ( !this.state.onlineUsers.includes(response.online) ) {
                    if (response.online !== this.props.userName) {
                        ws.send(JSON.stringify({bc:'maxchat', online: this.props.userName, req:'info'}));
                    }
                    this.setState({
                        onlineUsers: this.state.onlineUsers.concat(response.online)
                    });
                }
            }

            if (response.offline) {
                let onlineUsers = [...this.state.onlineUsers];
                let index = onlineUsers.indexOf(response.offline);
                onlineUsers.splice(index, 1);
                this.setState({
                    onlineUsers
                });
            }
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let msg = {
            bc: 'maxchat',
            msg: event.target.elements.msg.value,
        };
        event.target.elements.msg.value = "";
        this.ws.send(JSON.stringify(msg));
    };

    render() {
        return (
            <div className={classes.wrapper}>
                <div className={classes.Chat}>
                    <div className={classes.topSection}>
                        <div className={classes.Messages}>
                            <Messages messages={this.state.messages} />
                        </div>
                        <div className={classes.OnlineUsers}>
                            <div className={classes.usersTitle}>Online users:</div>
                            <OnlineUsers users={this.state.onlineUsers} />
                        </div>
                    </div>

                    <form className={classes.Form} onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="Message..." name="msg" />
                        <button type="submit">Send</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Chat;