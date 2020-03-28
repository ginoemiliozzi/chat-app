import React, { useRef, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(theme => ({
  flex: {
    display: "flex",
    alignItems: "center",
  },
  scrolleable: {
    width: "100%",
    overflow: "auto",
    maxHeight: 290,
  },
  userLabel: {
    marginRight: 5,
  },
}));

const ChatMessages = ({ allChats, activeTopic }) => {
  const classes = useStyles();

  //Scroll to bottom when new message appears
  const scrollListRef = useRef();
  useEffect(() => {
    scrollListRef.current.scrollTop = scrollListRef.current.scrollHeight;
  }, [allChats]);

  return (
    <List ref={scrollListRef} component="nav" className={classes.scrolleable}>
      {allChats[activeTopic].map((chat, i) => (
        <React.Fragment key={i}>
          <ListItem className={classes.flex}>
            <Chip
              color="secondary"
              label={chat.from}
              className={classes.userLabel}
            />
            <Typography variant="body1">{chat.msg}</Typography>
          </ListItem>
          <Divider variant="middle" component="li" />
        </React.Fragment>
      ))}
    </List>
  );
};

export default ChatMessages;
