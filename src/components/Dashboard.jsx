import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CTX } from "../Store";
import Header from "./Header";
import TopicsList from './TopicsList';
import ChatMessages from './ChatMessages';
import ChatEntry from './ChatEntry';

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
        borderRight: '3px solid purple'
    },
    chatFragment: {
        width: '70%',
        height: '300px',
        padding: '20px'
    }
  }));

export const Dashboard = () => {

    //Styles
    const classes = useStyles();

    //Context store
    const {allChats, sendChatAction, addTopic, user, changeUserName} = React.useContext(CTX);
    const topics = Object.keys(allChats);

    //Local state
    const [activeTopic, changeActiveTopic] = useState(topics[0]);

    return(
        <div>
            <Header 
                activeTopic={activeTopic} 
                changeUserName={changeUserName}
            />
            <div className={classes.flex}>
                <div className={classes.topicsFragment}>
                    <TopicsList
                        topics={topics}
                        changeActiveTopic={changeActiveTopic}
                        addTopic={addTopic}
                        />
                </div>
                <div className={classes.chatFragment}>
                    <ChatMessages 
                        allChats={allChats}
                        activeTopic={activeTopic}
                    />
                </div>
            </div>
            <div className={classes.flex}>
                <ChatEntry 
                    sendChatAction={sendChatAction}
                    activeTopic={activeTopic}
                    user={user}
                />
            </div>
        </div>
    )
}
