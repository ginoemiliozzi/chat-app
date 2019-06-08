import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflow: 'auto',
    maxHeight: 280,
  }
}));

function FormDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [topicToAdd, setTopicToAdd] = React.useState('');
  
    function handleClickOpen() {
      setOpen(true);
    }
  
    function handleClose() {
      setOpen(false);
    }

    function handleAddition() {
      setOpen(false);
      setTopicToAdd('');
      
      if(props.topics.indexOf(topicToAdd) > -1) {
        alert('That topic name already exists!');
        return;
      }
      props.addTopic(topicToAdd);
    }
  
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Add topic
        </Button>
        <Dialog open={open} onClose={handleClose} >
          <DialogTitle id="form-dialog-title">Add a new topic</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              value={topicToAdd}
              onChange={(e) => setTopicToAdd(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => handleAddition()} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

const TopicsList = (props) => {

    const {topics, addTopic, changeActiveTopic} = props;

    const classes = useStyles();

    return (
      <React.Fragment>
        <List component="nav" className={classes.root}>
          {
            topics.map(topic =>
              <ListItem key={topic} button onClick={() => changeActiveTopic(topic)}>
                  <ListItemText primary={topic} />
              </ListItem>
            )
          }
        </List>
        <FormDialog addTopic={addTopic} topics={topics}/>
      </React.Fragment>
    );
}

export default TopicsList;