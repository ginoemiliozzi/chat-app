import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    chatBox: {
        width: '85%',
        margin: '25px'
    },
    sendButton: {
        width: '15%'
    },
  }));


const ChatEntry = (props) => {

    const classes = useStyles();

    const [textValue, setTextValue] = useState('');    

    const {sendChatAction, activeTopic, user} = props;

    //Aux functions
    const sendMessageIfEnterKey = (e) => {
        if (e.key === 'Enter') {
            sendChatAction({from: user, msg: textValue, topic: activeTopic});
            setTextValue('');
            }
    }

    return (
        <React.Fragment>
            <TextField
            id="standard-name"
            label="Send a message"
            className={classes.chatBox}
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            onKeyDown={(e) => sendMessageIfEnterKey(e)}
            />
            <Button 
            variant="contained" 
            color="primary"
            onClick={() => {
                sendChatAction({from: user, msg: textValue, topic: activeTopic});
                setTextValue('');
            }}>
                Send
            </Button>
        </React.Fragment>
    );
}

export default ChatEntry;