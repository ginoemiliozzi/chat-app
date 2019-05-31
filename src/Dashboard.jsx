import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { CTX } from "./Store";

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
        borderRight: '1px solid grey'
    },
    chatFragment: {
        width: '70%',
        height: '300px',
        padding: '20px'
    },
    chatBox: {
        width: '85%'
    },
    sendButton: {
        width: '15%'
    },
  }));

export const Dashboard = () => {

    const classes = useStyles();

    //Context store
    const {allChats, sendChatAction, user} = React.useContext(CTX);
    const topics = Object.keys(allChats);

    //Local state
    const [activeTopic, changeActiveTopic] = useState(topics[0]);
    const [textValue, changeTextValue] = useState('');

    return(
        <div>
            <Paper className={classes.root}>
                <Typography variant="h4" component="h4">
                    Chatapp
                </Typography>
                <Typography variant="h5" component="h5">
                    {activeTopic}
                </Typography>
            </Paper>
            <div className={classes.flex}>
                <div className={classes.topicsFragment}>
                <List component="nav">
                    {
                        topics.map(topic =>
                        <ListItem key={topic} button onClick={() => changeActiveTopic(topic)}>
                                <ListItemText primary={topic} />
                            </ListItem>
                        )
                    }
                </List>
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