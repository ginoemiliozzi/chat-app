import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    root: {
      margin: '50px',
      padding: theme.spacing(3, 2),
    }
}));

function FormDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [newUserName, setNewUserName] = React.useState('');
  
    function handleClickOpen() {
      setOpen(true);
    }
  
    function handleClose() {
      setOpen(false);
    }

    function handleNameChange() {
      setOpen(false);
      setNewUserName('');
      
 /*     if(props.names.indexOf(newUserName) > -1) {
        alert('That user name already exists!');
        return;
      }*/
      props.changeUserName(newUserName);
    }
  
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Change username
        </Button>
        <Dialog open={open} onClose={handleClose} >
          <DialogTitle id="form-dialog-title">Enter the new username</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => handleNameChange()} color="primary">
              Accept
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

const Header = (props) => {

    const classes = useStyles();

    const { activeTopic, changeUserName } = props;

    return (
        <Paper square={false} elevation={10} className={classes.root}>
            <Typography variant="h4" component="h4" color='primary'>
                ChatApp
            </Typography>
            <Typography variant="h5" component="h5">
                {activeTopic}
            </Typography>
            <FormDialog changeUserName={changeUserName} />
        </Paper>
    )
}

export default Header;