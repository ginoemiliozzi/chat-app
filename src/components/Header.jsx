import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    root: {
      margin: '50px',
      padding: theme.spacing(3, 2),
    }
}));

const Header = (props) => {

    const classes = useStyles();

    const {activeTopic} = props;

    return(
        <Paper square={false} elevation={10} className={classes.root}>
            <Typography variant="h4" component="h4">
                Chatapp
            </Typography>
            <Typography variant="h5" component="h5">
                {activeTopic}
            </Typography>
        </Paper>
    )
}

export default Header;