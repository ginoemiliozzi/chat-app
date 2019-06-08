import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { CTX } from "../Store";
import Header from "./Header";
import TopicsList from './TopicsList';

const useStyles = makeStyles(theme => ({
    root: {
      margin: '50px',
      padding: theme.spacing(3, 2),
    },
    flex: {
        display: 'flex',
        alignItems: 'center'
    },
    topicsFragment: {
        width: '30%',
        height: '300px',
        borderRight: '3px solid lightblue'
    },
    chatFragment: {
        width: '70%',
        height: '300px',
        padding: '20px'
    },
    chatBox: {
        width: '85%',
        margin: '25px'
    },
    sendButton: {
        width: '15%'
    },
  }));

export const Dashboard = () => {

    //Styles
    const classes = useStyles();

    //Context store
    const {allChats, sendChatAction, addTopic, user} = React.useContext(CTX);
    const topics = Object.keys(allChats);

    //Local state
    const [activeTopic, changeActiveTopic] = useState(topics[0]);
    const [textValue, changeTextValue] = useState('');

    //Aux functions
    const sendMessageIfEnterKey = (e) => {
        if (e.key === 'Enter') {
            sendChatAction({from: user, msg: textValue, topic: activeTopic});
            changeTextValue('');
          }
    }
    

    return(
        <div>
            <Header activeTopic={activeTopic} />

            <div className={classes.flex}>
                <div className={classes.topicsFragment}>
                    <TopicsList
                        topics={topics}
                        changeActiveTopic={changeActiveTopic}
                        addTopic={addTopic}
                        />
                </div>
                <div className={classes.chatFragment}>
                        {
                            allChats[activeTopic].map((chat, i) =>
                                <div className={classes.flex} key={i}>
                                    <Chip label={chat.from} />
                                    <Typography variant='body1'>{chat.msg}</Typography>
                                </div>
                            )
                        }
                </div>
            </div>
            <div className={classes.flex}>
                <TextField
                    id="standard-name"
                    label="Send a message"
                    className={classes.chatBox}
                    value={textValue}
                    onChange={(e) => changeTextValue(e.target.value)}
                    onKeyDown={(e) => sendMessageIfEnterKey(e)}
                    />
                <Button 
                variant="contained" 
                color="primary"
                onClick={() => {
                    sendChatAction({from: user, msg: textValue, topic: activeTopic});
                    changeTextValue('');
                }}>
                    Send
                </Button>
            </div>
        </div>
    )
}
