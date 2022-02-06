import {
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';

export default function ConfirmationDialog({ open, content, option1, option2, onAccept, handleClose }) {

	const onClickOption1 = () => {
		onAccept();
		handleClose();
	}


  return (
    <>
      <Dialog open={open}>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button type="submit" onClick={onClickOption1} color="primary">
            {option1 || 'Yes'}
          </Button>
          <Button
            onClick={handleClose}
            variant="contained"
            color="primary"
          >
            {option2 || 'No'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
