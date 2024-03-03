import * as React from 'react';
import { CiCirclePlus } from "react-icons/ci";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InvitationForm from './InvitationForm';
import Button from '@mui/material/Button'
import { useParams } from 'react-router-dom';
export default function PopupForm() {
  const [open, setOpen] = React.useState(false);
  const { planId } = useParams();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button sx={{ color: 'white' }} onClick={handleClickOpen}>
        <CiCirclePlus style={{ height: '30px', width: '30px' }}  />
        <p>Invite friend</p>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Invite </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Invite Friends to this plan, please enter his email address here.And select his role.
          </DialogContentText>
          <InvitationForm planId={planId} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: 'red' }}>Cancel</Button>
          {/* <Button type="submit" sx={{color:'green'}}>Invite</Button> */}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
