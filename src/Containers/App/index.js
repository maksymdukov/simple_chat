import React, {Component} from 'react';
import classes from './index.module.css';
import ModalUserName from '../../Components/ModalUserName';
import Chat from "../Chat";

const MyContext = React.createContext('');

class App extends Component {
    state = {
        userName: ""
    };

    setUserNameHandler = (event) => {
        event.preventDefault();
        let nick = event.target.elements.nickname.value;
        if (nick) {
            this.setState({userName: event.target.elements.nickname.value})}
    };

    render() {
        const {state: {userName}, setUserNameHandler} = this;
        let modal;
        let chat;
        if (!this.state.userName) {
            modal = <ModalUserName {...{userName, setUserNameHandler}}/>;
        } else {
            chat = <Chat {...{userName}}/>;
        }
        return (
            <MyContext.Provider value={this.state.userName}>
                <div className={classes.App}>
                    {modal}
                    {chat}
                </div>
            </MyContext.Provider>
        );
    }
}

export default App;
export {MyContext};
