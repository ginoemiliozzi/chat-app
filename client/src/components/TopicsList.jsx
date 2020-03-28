import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import InputTextDialog from "./InputTextDialog";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    overflow: "auto",
    maxHeight: 280,
  },
}));

const TopicsList = props => {
  const { topics, addTopic, changeActiveTopic } = props;

  const classes = useStyles();

  return (
    <React.Fragment>
      <List component="nav" className={classes.root}>
        {topics.map(topic => (
          <ListItem key={topic} button onClick={() => changeActiveTopic(topic)}>
            <ListItemText primary={topic} />
          </ListItem>
        ))}
      </List>
      <InputTextDialog
        actionTitle="Add topic"
        dialogTitle="New topic"
        onInputSubmit={addTopic}
        preventDefault={value => [
          topics.includes(value),
          "That topic already exists!",
        ]}
      />
    </React.Fragment>
  );
};

export default TopicsList;
