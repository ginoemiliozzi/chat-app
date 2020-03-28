import React, { useContext } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import InputTextDialog from "./InputTextDialog";
import { CTX } from "../Store";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "50px",
    padding: theme.spacing(3, 2),
  },
  title: {
    fontFamily: "'Sigmar One', cursive",
  },
}));

const Header = ({ activeTopic }) => {
  const classes = useStyles();
  const { user, changeUserName } = useContext(CTX);

  console.log(activeTopic);
  return (
    <Paper square={false} elevation={10} className={classes.root}>
      <Typography
        className={classes.title}
        variant="h4"
        component="h4"
        color="primary"
      >
        ChatApp
      </Typography>
      <Typography variant="h5" component="h5">
        {activeTopic}
      </Typography>
      <InputTextDialog
        actionTitle="Change username"
        dialogTitle="Enter the new nickname"
        onInputSubmit={changeUserName}
      />
    </Paper>
  );
};

export default Header;
