import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@material-ui/core";

const InputTextDialog = ({
  dialogTitle,
  actionTitle,
  onInputSubmit,
  preventDefault = _ => [false, ""],
  keepValue,
}) => {
  const [open, setOpen] = React.useState(false);
  const [textValue, setTextValue] = React.useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (!keepValue) setTextValue("");

    setOpen(false);
  };

  const handleSubmitClick = () => {
    const [shouldPrevent, errorMessage] = preventDefault(textValue);
    if (!textValue) {
      alert("You have to enter a value to submit");
      return;
    }
    if (shouldPrevent) {
      alert(errorMessage);
      return;
    }

    onInputSubmit(textValue);
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        {actionTitle}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            value={textValue}
            onChange={e => setTextValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitClick} color="primary">
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default InputTextDialog;
